#!/usr/bin/env python3
"""
=============================================================
NORGES VERSTE VÆR — Daglig Frost API-henting
=============================================================
Henter observasjonsdata fra frost.met.no for gårsdagen,
beregner Elendighets-Indeks per fylke og topp 5 stasjoner,
og oppdaterer client/src/lib/weatherData.ts.

Bruk:
  python scripts/fetch_frost_data.py

Miljøvariabler:
  FROST_CLIENT_ID  — Frost API Client ID (påkrevd)

Kilde: frost.met.no (MET Norway)
=============================================================
"""

import os
import sys
import json
import logging
import re
from datetime import datetime, timedelta, timezone
from collections import defaultdict

try:
    import requests
except ImportError:
    print("ERROR: 'requests' library not found. Install with: pip install requests")
    sys.exit(1)

# ---- KONFIGURASJON ----

FROST_CLIENT_ID = os.environ.get("FROST_CLIENT_ID", "")
FROST_BASE_URL = "https://frost.met.no/observations/v0.jsonld"
FROST_SOURCES_URL = "https://frost.met.no/sources/v0.jsonld"

WEATHER_DATA_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "client", "src", "lib", "weatherData.ts"
)

# Fylke-mapping: kommunenummer-prefix → fylkesnavn
KOMMUNE_TO_FYLKE = {
    "03": "Oslo",
    "11": "Rogaland",
    "15": "Møre og Romsdal",
    "18": "Nordland",
    "31": "Østfold",
    "32": "Akershus",
    "33": "Buskerud",
    "34": "Innlandet",
    "38": "Vestfold",  # Vestfold og Telemark split
    "39": "Telemark",
    "40": "Telemark",  # fallback
    "42": "Agder",
    "46": "Vestland",
    "50": "Trøndelag",
    "54": "Troms",
    "55": "Troms",  # Romsa
    "56": "Finnmark",
}

# Extended mapping for 4-digit municipality codes
KOMMUNE_4DIGIT = {}
for prefix, fylke in KOMMUNE_TO_FYLKE.items():
    for i in range(100):
        code = f"{prefix}{i:02d}"
        KOMMUNE_4DIGIT[code] = fylke

# Manual overrides for known municipalities
KOMMUNE_4DIGIT.update({
    "1101": "Rogaland", "1103": "Rogaland", "1106": "Rogaland",
    "1108": "Rogaland", "1111": "Rogaland", "1112": "Rogaland",
    "1114": "Rogaland", "1119": "Rogaland", "1120": "Rogaland",
    "1121": "Rogaland", "1122": "Rogaland", "1124": "Rogaland",
    "1127": "Rogaland", "1130": "Rogaland", "1133": "Rogaland",
    "1134": "Rogaland", "1135": "Rogaland", "1144": "Rogaland",
    "1145": "Rogaland", "1146": "Rogaland", "1149": "Rogaland",
    "1151": "Rogaland", "1160": "Rogaland",
    "1505": "Møre og Romsdal", "1506": "Møre og Romsdal",
    "1507": "Møre og Romsdal", "1511": "Møre og Romsdal",
    "1514": "Møre og Romsdal", "1515": "Møre og Romsdal",
    "1516": "Møre og Romsdal", "1517": "Møre og Romsdal",
    "1520": "Møre og Romsdal", "1525": "Møre og Romsdal",
    "1528": "Møre og Romsdal", "1531": "Møre og Romsdal",
    "1532": "Møre og Romsdal", "1535": "Møre og Romsdal",
    "1539": "Møre og Romsdal", "1547": "Møre og Romsdal",
    "1554": "Møre og Romsdal", "1557": "Møre og Romsdal",
    "1560": "Møre og Romsdal", "1563": "Møre og Romsdal",
    "1566": "Møre og Romsdal", "1573": "Møre og Romsdal",
    "1576": "Møre og Romsdal", "1577": "Møre og Romsdal",
    "1578": "Møre og Romsdal", "1579": "Møre og Romsdal",
    "1580": "Møre og Romsdal",
    "1804": "Nordland", "1806": "Nordland", "1811": "Nordland",
    "1812": "Nordland", "1813": "Nordland", "1815": "Nordland",
    "1816": "Nordland", "1818": "Nordland", "1820": "Nordland",
    "1822": "Nordland", "1824": "Nordland", "1825": "Nordland",
    "1826": "Nordland", "1827": "Nordland", "1828": "Nordland",
    "1832": "Nordland", "1833": "Nordland", "1834": "Nordland",
    "1835": "Nordland", "1836": "Nordland", "1837": "Nordland",
    "1838": "Nordland", "1839": "Nordland", "1840": "Nordland",
    "1841": "Nordland", "1845": "Nordland", "1848": "Nordland",
    "1851": "Nordland", "1853": "Nordland", "1856": "Nordland",
    "1857": "Nordland", "1859": "Nordland", "1860": "Nordland",
    "1865": "Nordland", "1866": "Nordland", "1867": "Nordland",
    "1868": "Nordland", "1870": "Nordland", "1871": "Nordland",
    "1874": "Nordland", "1875": "Nordland",
})

ALL_FYLKER = [
    "Finnmark", "Troms", "Nordland", "Trøndelag", "Møre og Romsdal",
    "Vestland", "Rogaland", "Agder", "Telemark", "Vestfold",
    "Buskerud", "Innlandet", "Akershus", "Østfold", "Oslo"
]

DAY_LABELS_NO = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
log = logging.getLogger("frost")


# ---- FROST API HELPERS ----

def frost_get(url, params, max_retries=3):
    """Make authenticated GET request to Frost API with retries."""
    for attempt in range(max_retries):
        try:
            resp = requests.get(
                url,
                params=params,
                auth=(FROST_CLIENT_ID, ""),
                timeout=120
            )
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 404:
                log.warning(f"No data found (404): {params}")
                return None
            elif resp.status_code == 412:
                log.warning(f"No data matching criteria (412): {params}")
                return None
            else:
                log.warning(f"Attempt {attempt+1}: HTTP {resp.status_code} — {resp.text[:200]}")
        except requests.exceptions.RequestException as e:
            log.warning(f"Attempt {attempt+1}: Request failed — {e}")
        if attempt < max_retries - 1:
            import time
            time.sleep(5 * (attempt + 1))
    log.error(f"Failed after {max_retries} attempts")
    return None


def get_station_metadata():
    """Fetch all Norwegian weather stations with municipality info."""
    log.info("Fetching station metadata...")
    data = frost_get(FROST_SOURCES_URL, {
        "types": "SensorSystem",
        "country": "NO",
        "fields": "id,name,municipality,municipalityId"
    })
    if not data or "data" not in data:
        log.error("Failed to fetch station metadata")
        return {}

    stations = {}
    for src in data["data"]:
        sid = src.get("id", "")
        name = src.get("name", sid)
        mun_id = str(src.get("municipalityId", ""))
        mun_name = src.get("municipality", "")

        fylke = None
        if len(mun_id) >= 4:
            fylke = KOMMUNE_4DIGIT.get(mun_id[:4])
        if not fylke and len(mun_id) >= 2:
            fylke = KOMMUNE_TO_FYLKE.get(mun_id[:2])

        if fylke:
            stations[sid] = {
                "name": name,
                "municipality": mun_name,
                "fylke": fylke
            }

    log.info(f"Loaded {len(stations)} stations with fylke mapping")
    return stations


def fetch_daily_observations(date_str, stations):
    """
    Fetch P1D observations for a given date.
    Falls back to hourly (PT1H) data if P1D is not available.
    Returns dict: station_id -> {wind_mean, gust_max, precip, temp_mean}
    """
    log.info(f"Fetching P1D observations for {date_str}...")

    station_ids = list(stations.keys())
    all_obs = {}

    # Batch stations (max 50 per request to avoid URI too long)
    batch_size = 50
    for i in range(0, len(station_ids), batch_size):
        batch = station_ids[i:i + batch_size]
        sources_str = ",".join(batch)

      data = frost_get(FROST_BASE_URL, {
    "sources": sources_str,
    "referencetime": f"{date_str}/{date_str}",
    "elements": "sum(precipitation_amount P1D),mean(wind_speed P1D),max(wind_speed_of_gust PT1H),mean(air_temperature P1D)",
    "timeoffsets": "PT0H",
    "fields": "sourceId,elementId,value,referenceTime"
})

        if data and "data" in data:
            for obs in data["data"]:
                sid = obs.get("sourceId", "").split(":")[0]
                ref_time = obs.get("referenceTime", "")[:10]
                if ref_time != date_str:
                    continue
                for o in obs.get("observations", []):
                    eid = o.get("elementId", "")
                    val = o.get("value")
                    if val is None:
                        continue
                    if sid not in all_obs:
                        all_obs[sid] = {}
                    # Deduplicate: keep first value per element per station
                    if eid not in all_obs[sid]:
                        all_obs[sid][eid] = float(val)

        if (i // batch_size + 1) % 10 == 0:
            log.info(f"  Processed {i + len(batch)}/{len(station_ids)} stations...")

    log.info(f"P1D: Got data for {len(all_obs)} stations")

    # Check if we have enough data; if not, try hourly fallback
    stations_with_wind = sum(1 for s in all_obs.values() if "mean(wind_speed P1D)" in s)
    stations_with_precip = sum(1 for s in all_obs.values() if "sum(precipitation_amount P1D)" in s)

    if stations_with_wind < 100:
        log.info(f"Only {stations_with_wind} stations with wind P1D — trying hourly fallback...")
        all_obs = fetch_hourly_fallback(date_str, station_ids, all_obs)

    # Normalize to standard keys
    result = {}
    for sid, obs in all_obs.items():
        wind_mean = obs.get("mean(wind_speed P1D)", obs.get("wind_mean", 0))
gust_max = obs.get("max(wind_speed_of_gust PT1H)", obs.get("gust_max", 0))
        precip = obs.get("sum(precipitation_amount P1D)", obs.get("precip", 0))
        temp_mean = obs.get("mean(air_temperature P1D)", obs.get("temp_mean", None))

        if temp_mean is None:
            continue  # Need at least temperature

        result[sid] = {
            "wind_mean": max(0, wind_mean),
            "gust_max": max(0, gust_max),
            "precip": max(0, precip),
            "temp_mean": temp_mean
        }

    log.info(f"Final: {len(result)} stations with usable data")
    return result


def fetch_hourly_fallback(date_str, station_ids, existing_obs):
    """Fetch hourly data and aggregate to daily values."""
    log.info(f"Fetching hourly (PT1H) data for {date_str}...")

    next_day = (datetime.strptime(date_str, "%Y-%m-%d") + timedelta(days=1)).strftime("%Y-%m-%d")
    batch_size = 50

    for i in range(0, len(station_ids), batch_size):
        batch = station_ids[i:i + batch_size]
        sources_str = ",".join(batch)

        data = frost_get(FROST_BASE_URL, {
            "sources": sources_str,
            "referencetime": f"{date_str}T00:00:00/{next_day}T00:00:00",
            "elements": "wind_speed,max(wind_speed_of_gust PT1H),air_temperature,sum(precipitation_amount PT1H)",
            "fields": "sourceId,elementId,value,referenceTime"
        })

        if data and "data" in data:
            hourly = defaultdict(lambda: {"winds": [], "gusts": [], "temps": [], "precips": set()})

            for obs in data["data"]:
                sid = obs.get("sourceId", "").split(":")[0]
                ref_time = obs.get("referenceTime", "")
                for o in obs.get("observations", []):
                    eid = o.get("elementId", "")
                    val = o.get("value")
                    if val is None:
                        continue
                    val = float(val)
                    if "wind_speed" == eid:
                        hourly[sid]["winds"].append(val)
                    elif "gust" in eid:
                        hourly[sid]["gusts"].append(val)
                    elif "temperature" in eid:
                        hourly[sid]["temps"].append(val)
                    elif "precipitation" in eid:
                        # Deduplicate by reference time
                        key = f"{ref_time}_{val}"
                        if key not in hourly[sid]["precips"]:
                            hourly[sid]["precips"].add(key)

            for sid, h in hourly.items():
                if sid not in existing_obs:
                    existing_obs[sid] = {}
                if h["winds"] and "mean(wind_speed P1D)" not in existing_obs[sid]:
                    existing_obs[sid]["wind_mean"] = sum(h["winds"]) / len(h["winds"])
                if h["gusts"] and "max(wind_speed_of_gust P1D)" not in existing_obs[sid]:
                    existing_obs[sid]["gust_max"] = max(h["gusts"])
                if h["temps"] and "mean(air_temperature P1D)" not in existing_obs[sid]:
                    existing_obs[sid]["temp_mean"] = sum(h["temps"]) / len(h["temps"])
                # For hourly precip, sum unique values
                if h["precips"] and "sum(precipitation_amount P1D)" not in existing_obs[sid]:
                    precip_vals = [float(p.split("_")[1]) for p in h["precips"]]
                    existing_obs[sid]["precip"] = sum(max(0, v) for v in precip_vals)

    return existing_obs


# ---- EI BEREGNING ----

def calculate_ei(wind_mean, gust_max, precip, temp_mean):
    """
    Elendighets-Indeks:
    (vind_mean × 2.0) + (vindkast × 0.5) + (nedbør × 0.5) + (20 − temp)
    Sludd-bonus: +15 hvis temp mellom -1 og +2°C og nedbør > 0
    """
    ei = (wind_mean * 2.0) + (gust_max * 0.5) + (precip * 0.5) + (20.0 - temp_mean)
    if -1.0 <= temp_mean <= 2.0 and precip > 0:
        ei += 15.0
    return round(max(0, ei), 1)


def compute_county_ei(obs_data, stations):
    """Aggregate station EI to county level."""
    county_scores = defaultdict(list)

    for sid, data in obs_data.items():
        if sid not in stations:
            continue
        fylke = stations[sid]["fylke"]
        ei = calculate_ei(
            data["wind_mean"],
            data["gust_max"],
            data["precip"],
            data["temp_mean"]
        )
        county_scores[fylke].append(ei)

    result = {}
    for fylke in ALL_FYLKER:
        scores = county_scores.get(fylke, [])
        if scores:
            result[fylke] = round(sum(scores) / len(scores), 1)
        else:
            result[fylke] = 0.0
            log.warning(f"No data for {fylke} — using 0.0")

    return result


def find_top_stations(obs_data, stations, n=5):
    """Find top N stations by EI score."""
    station_scores = []
    for sid, data in obs_data.items():
        if sid not in stations:
            continue
        ei = calculate_ei(
            data["wind_mean"],
            data["gust_max"],
            data["precip"],
            data["temp_mean"]
        )
        station_scores.append({
            "navn": stations[sid]["name"],
            "kommune": stations[sid]["municipality"],
            "fylke": stations[sid]["fylke"],
            "ei": ei,
            "vindkast": round(data["gust_max"], 1),
            "nedbor": round(data["precip"], 1),
            "temp": round(data["temp_mean"], 1),
            "farevarsel": "oransje" if ei > 60 else ("gul" if ei > 40 else "ingen")
        })

    station_scores.sort(key=lambda x: x["ei"], reverse=True)
    return station_scores[:n]


# ---- WEATHERDATA.TS OPPDATERING ----

def read_current_data():
    """Parse the current weatherData.ts to extract existing data."""
    with open(WEATHER_DATA_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    return content


def generate_trend(fylke, prev_score, new_score):
    """Generate a short trend explanation based on score change."""
    diff = new_score - prev_score
    if diff > 5:
        return f"Kraftig forverring (+{diff:.1f}) — økt vind og/eller nedbør"
    elif diff > 2:
        return f"Noe forverring (+{diff:.1f}) — ustabilt vær fortsetter"
    elif diff > -2:
        return f"Stabilt — lite endring fra i går"
    elif diff > -5:
        return f"Noe bedring ({diff:.1f}) — roligere forhold"
    else:
        return f"Markant bedring ({diff:.1f}) — lavtrykket har passert"


def update_weather_data(target_date, county_ei, top_stations, existing_content):
    """
    Update weatherData.ts with new day's data.
    Reads existing arrays, appends new day, recalculates totals.
    """
    log.info("Updating weatherData.ts...")

    # Parse existing FYLKER_DAG_FOR_DAG to get current daily arrays
    existing_daily = {}
    pattern = r'\{\s*navn:\s*"([^"]+)",\s*dager:\s*\[([^\]]+)\],\s*trend:\s*"([^"]*)"'
    for match in re.finditer(pattern, existing_content):
        name = match.group(1)
        dager = [float(x.strip()) for x in match.group(2).split(",")]
        existing_daily[name] = dager

    # Parse existing META dagLabels
    dag_labels_match = re.search(r'dagLabels:\s*\[([^\]]+)\]', existing_content)
    existing_labels = []
    if dag_labels_match:
        existing_labels = [x.strip().strip('"') for x in dag_labels_match.group(1).split(",")]

    # Determine new day label
    day_of_week = target_date.weekday()  # 0=Mon
    day_num = target_date.strftime("%d")
    new_label = f"{DAY_LABELS_NO[day_of_week]} {day_num}"

    # Build new daily arrays
    new_daily = {}
    for fylke in ALL_FYLKER:
        prev_dager = existing_daily.get(fylke, [])
        new_score = county_ei.get(fylke, 0.0)
        new_daily[fylke] = prev_dager + [new_score]

    # Calculate totals
    totals = {f: round(sum(d), 1) for f, d in new_daily.items()}
    sorted_total = sorted(totals.items(), key=lambda x: x[1], reverse=True)

    # Calculate previous ranking (before today)
    prev_totals = {f: round(sum(d[:-1]), 1) for f, d in new_daily.items()}
    prev_sorted = sorted(prev_totals.items(), key=lambda x: x[1], reverse=True)
    prev_rank = {f: i for i, (f, _) in enumerate(prev_sorted)}
    new_rank = {f: i for i, (f, _) in enumerate(sorted_total)}
    rank_change = {f: prev_rank.get(f, 0) - new_rank.get(f, 0) for f in ALL_FYLKER}

    # Determine today's leader
    today_sorted = sorted(county_ei.items(), key=lambda x: x[1], reverse=True)
    today_leader = today_sorted[0] if today_sorted else ("Ukjent", 0)

    # Previous day scores for trend
    prev_day_scores = {}
    for fylke in ALL_FYLKER:
        d = new_daily[fylke]
        if len(d) >= 2:
            prev_day_scores[fylke] = d[-2]
        else:
            prev_day_scores[fylke] = 0

    # Generate trends
    trends = {}
    for fylke in ALL_FYLKER:
        trends[fylke] = generate_trend(fylke, prev_day_scores.get(fylke, 0), county_ei.get(fylke, 0))

    # Build new labels
    new_labels = existing_labels + [new_label]

    # Determine tronskifte
    overall_leader = sorted_total[0][0]
    prev_leader = prev_sorted[0][0] if prev_sorted else overall_leader
    tronskifte_aktiv = overall_leader != prev_leader

    # Build date strings
    date_str_no = target_date.strftime("%d.%m.%Y")
    day_name_no = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"][day_of_week]
    now_str = datetime.now(timezone.utc).strftime("%d.%m.%Y kl. %H:%M")

    # Parse first date from existing labels for period
    first_date_label = new_labels[0] if new_labels else "Man 02"
    num_days = len(new_labels)

    # Generate the new weatherData.ts
    lines = []
    lines.append('/**')
    lines.append(' * ============================================================')
    lines.append(' * NORGES VERSTE VÆR — DATABLOKK')
    lines.append(' * ============================================================')
    lines.append(' * FREMTIDSSIKRING: For å oppdatere dashboardet med nye data,')
    lines.append(' * erstatt kun denne filen. Designet endres ikke.')
    lines.append(f' *')
    lines.append(f' * Sist oppdatert: {now_str}')
    lines.append(f' * Periode sammenlagt: {num_days} dager')
    lines.append(' * Kilde: Frost API (frost.met.no), P1D + timesdata')
    lines.append(' * ============================================================')
    lines.append(' */')
    lines.append('')
    lines.append('// ---- METADATA ----')
    lines.append('')
    lines.append('export const META = {')
    lines.append('  serieNavn: "Norges Verste Vær",')
    lines.append(f'  dagLabel: "{day_name_no} {date_str_no}",')
    lines.append(f'  sammenlagtLabel: "{num_days} dager",')
    lines.append(f'  datoOppdatert: "{now_str}",')
    lines.append(f'  rapportVersjon: "v{num_days + 6} (Frost API P1D + timesdata)",')
    labels_str = ", ".join(f'"{l}"' for l in new_labels)
    lines.append(f'  dagLabels: [{labels_str}],')
    lines.append('};')
    lines.append('')
    lines.append('// ---- DAG-FOR-DAG EI PER FYLKE ----')
    lines.append('')
    lines.append('export const FYLKER_DAG_FOR_DAG = [')

    # Sort by total for display
    for fylke, total in sorted_total:
        dager = new_daily[fylke]
        dager_str = ", ".join(f"{d}" for d in dager)
        trend = trends[fylke]
        lines.append(f'  {{ navn: "{fylke}", dager: [{dager_str}], trend: "{trend}" }},')

    lines.append('];')
    lines.append('')
    lines.append('// ---- SAMMENLAGT ----')
    lines.append('')
    lines.append('export const FYLKER_SAMMENLAGT = [')

    for fylke, total in sorted_total:
        i_dag = county_ei.get(fylke, 0)
        endring = round(i_dag - prev_day_scores.get(fylke, 0), 1)
        plassering = rank_change.get(fylke, 0)
        lines.append(f'  {{ navn: "{fylke}", total: {total}, iDag: {i_dag}, endringFraIGar: {endring}, plasseringEndring: {plassering} }},')

    lines.append('];')
    lines.append('')
    lines.append(f'// ---- TOPP 5 STASJONER {day_name_no.upper()} {date_str_no} ----')
    lines.append('')
    lines.append('export const STASJONER_PERIODE = [')

    for s in top_stations:
        lines.append(f'  {{ navn: "{s["navn"]}", kommune: "{s["kommune"]}", fylke: "{s["fylke"]}", ei: {s["ei"]}, vindkast: {s["vindkast"]}, nedbor: {s["nedbor"]}, temp: {s["temp"]}, farevarsel: "{s["farevarsel"]}" }},')

    lines.append('];')
    lines.append('')

    # Keep existing STASJONER_UKE (weekly stations) — extract from existing content
    uke_match = re.search(r'(// ---- UKENS TOPP 5.*?^];)', existing_content, re.MULTILINE | re.DOTALL)
    if uke_match:
        lines.append(uke_match.group(1))
    else:
        lines.append('export const STASJONER_UKE: any[] = [];')

    lines.append('')
    lines.append('// ---- TRONSKIFTE ----')
    lines.append('')
    lines.append('export const TRONSKIFTE = {')
    lines.append(f'  aktiv: {str(tronskifte_aktiv).lower()},')

    if tronskifte_aktiv:
        lines.append(f'  tittel: "TRONSKIFTE! {overall_leader.upper()} TAR LEDELSEN!",')
        lines.append(f'  beskrivelse: "{overall_leader} har overtatt førsteplassen i sammenlagt-ligaen med {sorted_total[0][1]} poeng, foran {sorted_total[1][0]} ({sorted_total[1][1]}).",')
        lines.append(f'  gammelLeder: "{prev_leader}",')
    else:
        lines.append(f'  tittel: "{overall_leader.upper()} LEDER KLART!",')
        margin = round(sorted_total[0][1] - sorted_total[1][1], 1) if len(sorted_total) > 1 else 0
        lines.append(f'  beskrivelse: "{overall_leader} leder sammenlagt med {sorted_total[0][1]} poeng — {margin} poeng foran {sorted_total[1][0] if len(sorted_total) > 1 else "ukjent"} ({sorted_total[1][1] if len(sorted_total) > 1 else 0}).",')
        lines.append(f'  gammelLeder: "{overall_leader}",')

    lines.append(f'  nyLeder: "{overall_leader}",')
    lines.append('};')
    lines.append('')
    lines.append('// ---- DAGENS LEDER ----')
    lines.append('')
    lines.append('export const DAGENS_LEDER = {')
    lines.append(f'  fylke: "{today_leader[0]}",')
    lines.append(f'  ei: {today_leader[1]},')
    lines.append(f'  temp: 0,')
    lines.append(f'  nedbor: 0,')
    lines.append('};')
    lines.append('')
    lines.append('// ---- HJELPEFUNKSJONER ----')
    lines.append('')
    lines.append('export function scoreColor(score: number): string {')
    lines.append('  if (score > 50) return "#ff2d2d";')
    lines.append('  if (score >= 30) return "#ffaa00";')
    lines.append('  return "#d4c957";')
    lines.append('}')
    lines.append('')
    lines.append('export function scoreClass(score: number): string {')
    lines.append('  if (score > 50) return "score-critical";')
    lines.append('  if (score >= 30) return "score-warning";')
    lines.append('  return "score-caution";')
    lines.append('}')
    lines.append('')
    lines.append('export function fmt(n: number): string {')
    lines.append('  return n.toFixed(1);')
    lines.append('}')
    lines.append('')
    lines.append('export function fmtChange(n: number): string {')
    lines.append('  return (n > 0 ? "+" : "") + n.toFixed(1);')
    lines.append('}')
    lines.append('')
    lines.append('export function posLabel(n: number): string {')
    lines.append('  if (n > 0) return "\\u25B2 " + n;')
    lines.append('  if (n < 0) return "\\u25BC " + Math.abs(n);')
    lines.append('  return "\\u2014";')
    lines.append('}')
    lines.append('')
    lines.append('export function posColor(n: number): string {')
    lines.append('  if (n > 0) return "#00d4ff";')
    lines.append('  if (n < 0) return "#ff2d2d";')
    lines.append('  return "#4a6a8a";')
    lines.append('}')
    lines.append('')
    lines.append('export function sortedSammenlagt() {')
    lines.append('  return [...FYLKER_SAMMENLAGT].sort((a, b) => b.total - a.total);')
    lines.append('}')
    lines.append('')
    lines.append('export function sortedIDag() {')
    lines.append('  return [...FYLKER_SAMMENLAGT].sort((a, b) => b.iDag - a.iDag);')
    lines.append('}')
    lines.append('')
    lines.append('export function sortedDagForDag() {')
    lines.append('  return [...FYLKER_DAG_FOR_DAG].sort((a, b) => {')
    lines.append('    const sumA = a.dager.reduce((s, v) => s + v, 0);')
    lines.append('    const sumB = b.dager.reduce((s, v) => s + v, 0);')
    lines.append('    return sumB - sumA;')
    lines.append('  });')
    lines.append('}')
    lines.append('')

    new_content = "\n".join(lines)

    with open(WEATHER_DATA_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)

    log.info(f"Updated weatherData.ts with {num_days} days of data")
    log.info(f"Sammenlagt leder: {overall_leader} ({sorted_total[0][1]})")
    log.info(f"Dagens leder: {today_leader[0]} ({today_leader[1]})")

    return True


# ---- MAIN ----

def main():
    if not FROST_CLIENT_ID:
        log.error("FROST_CLIENT_ID environment variable not set!")
        log.error("Set it with: export FROST_CLIENT_ID=your_client_id")
        sys.exit(1)

    # Target date: yesterday (P1D data is typically available after midnight)
    target_date = datetime.now(timezone.utc).date() - timedelta(days=1)
    date_str = target_date.strftime("%Y-%m-%d")

    log.info(f"=== Norges Verste Vær — Daglig oppdatering ===")
    log.info(f"Henter data for: {date_str}")

    # Step 1: Get station metadata
    stations = get_station_metadata()
    if not stations:
        log.error("No station metadata — aborting")
        sys.exit(1)

    # Step 2: Fetch observations
    obs_data = fetch_daily_observations(date_str, stations)
    if not obs_data:
        log.error("No observation data — aborting")
        sys.exit(1)

    # Step 3: Calculate county EI
    county_ei = compute_county_ei(obs_data, stations)
    log.info(f"County EI: {json.dumps(county_ei, indent=2, ensure_ascii=False)}")

    # Step 4: Find top stations
    top_stations = find_top_stations(obs_data, stations, n=5)
    log.info(f"Top 5 stations:")
    for i, s in enumerate(top_stations):
        log.info(f"  {i+1}. {s['navn']} ({s['fylke']}): EI {s['ei']}")

    # Step 5: Read existing data and update
    existing_content = read_current_data()
    success = update_weather_data(target_date, county_ei, top_stations, existing_content)

    if success:
        log.info("=== Oppdatering fullført! ===")
    else:
        log.error("=== Oppdatering feilet ===")
        sys.exit(1)


if __name__ == "__main__":
    main()
