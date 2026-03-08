/**
 * ============================================================
 * NORGES VERSTE VÆR — DATABLOKK
 * ============================================================
 * FREMTIDSSIKRING: For å oppdatere dashboardet med nye data,
 * erstatt kun denne filen. Designet endres ikke.
 *
 * Sist oppdatert: 08.03.2026 kl. 18:00
 * Periode sammenlagt: 02.03 – 08.03.2026 (mandag–søndag, hel uke)
 * Kilde: Frost API (frost.met.no), P1D + timesdata
 * ============================================================
 */

// ---- METADATA ----

export const META = {
  serieNavn: "Norges Verste Vær",
  dagLabel: "Søndag 08.03.2026",
  sammenlagtLabel: "02.03 – 08.03.2026 (7 dager, hel uke)",
  datoOppdatert: "08.03.2026 kl. 18:00",
  rapportVersjon: "v7 (Frost API P1D + timesdata)",
  dagLabels: ["Man 02", "Tir 03", "Ons 04", "Tor 05", "Fre 06", "Lør 07", "Søn 08"],
};

// ---- DAG-FOR-DAG EI PER FYLKE ----
// Man–Tor: eksisterende korrigerte data
// Fre–Søn: Frost API P1D + timesdata (merged)

export const FYLKER_DAG_FOR_DAG = [
  { navn: "Finnmark",         dager: [33.0, 41.0, 36.0, 27.1, 37.2, 38.0, 32.6], trend: "Jevnt høy hele uken — kulde og vind gir vedvarende elendighet" },
  { navn: "Troms",            dager: [30.0, 35.0, 37.0, 25.3, 30.0, 29.0, 26.0], trend: "Stabil uke, noe roligere i helgen" },
  { navn: "Nordland",         dager: [28.5, 42.0, 45.0, 23.2, 34.8, 32.8, 28.8], trend: "Eksplosjon tir–ons, sterk vind tilbake fredag, gradvis bedring" },
  { navn: "Trøndelag",        dager: [27.0, 36.0, 37.0, 18.9, 23.0, 26.4, 25.8], trend: "Topp midt i uken, stabilt i helgen" },
  { navn: "Møre og Romsdal",  dager: [29.0, 40.0, 39.0, 16.7, 21.9, 23.8, 23.7], trend: "Kraftig fall torsdag, stabil helg" },
  { navn: "Vestland",         dager: [32.0, 45.0, 42.0, 18.2, 20.1, 21.4, 22.1], trend: "Verst tirsdag, deretter markant bedring" },
  { navn: "Rogaland",         dager: [28.0, 38.0, 41.0, 17.3, 18.8, 18.1, 17.0], trend: "Verst onsdag, mildest i landet i helgen" },
  { navn: "Agder",            dager: [22.0, 28.0, 28.0, 17.4, 22.4, 21.3, 21.5], trend: "Jevn uke uten store svingninger" },
  { navn: "Telemark",         dager: [21.0, 27.0, 29.0, 16.7, 21.4, 25.8, 19.5], trend: "Kald lørdag ga topp, bedring søndag" },
  { navn: "Vestfold",         dager: [17.0, 21.0, 22.0, 16.2, 18.0, 20.0, 17.0], trend: "Lavest i landet hele uken" },
  { navn: "Buskerud",         dager: [20.0, 26.0, 28.0, 17.1, 22.4, 25.2, 22.5], trend: "Kulde fra innlandet ga økning lørdag" },
  { navn: "Innlandet",        dager: [26.0, 34.0, 36.0, 19.1, 25.2, 27.8, 24.6], trend: "Fjellvind og kulde holder scoren oppe" },
  { navn: "Akershus",         dager: [19.0, 24.0, 27.0, 16.3, 21.2, 22.0, 18.9], trend: "Kaldere luft midt i uken, bedring søndag" },
  { navn: "Østfold",          dager: [18.0, 23.0, 25.0, 15.9, 21.8, 22.0, 19.4], trend: "Jevnt lav, noe kaldere fre–lør" },
  { navn: "Oslo",             dager: [16.0, 20.0, 23.0, 13.1, 21.6, 29.5, 19.8], trend: "Overraskende kald lørdag (29.5), kraftig bedring søndag" },
];

// ---- SAMMENLAGT (sum man–søn, 7 dager) ----
// Sortert etter total (høyest først)
// plasseringEndring: endring fra lør→søn ranking

export const FYLKER_SAMMENLAGT = [
  { navn: "Finnmark",         total: 244.9, iDag: 32.6, endringFraIGar: -5.4,  plasseringEndring: 0 },
  { navn: "Nordland",         total: 235.1, iDag: 28.8, endringFraIGar: -4.0,  plasseringEndring: 0 },
  { navn: "Troms",            total: 212.3, iDag: 26.0, endringFraIGar: -3.0,  plasseringEndring: 0 },
  { navn: "Vestland",         total: 200.8, iDag: 22.1, endringFraIGar: 0.7,   plasseringEndring: 0 },
  { navn: "Trøndelag",        total: 194.1, iDag: 25.8, endringFraIGar: -0.6,  plasseringEndring: 1 },
  { navn: "Møre og Romsdal",  total: 194.1, iDag: 23.7, endringFraIGar: -0.1,  plasseringEndring: -1 },
  { navn: "Innlandet",        total: 192.7, iDag: 24.6, endringFraIGar: -3.2,  plasseringEndring: 0 },
  { navn: "Rogaland",         total: 178.2, iDag: 17.0, endringFraIGar: -1.1,  plasseringEndring: 0 },
  { navn: "Buskerud",         total: 161.2, iDag: 22.5, endringFraIGar: -2.7,  plasseringEndring: 0 },
  { navn: "Agder",            total: 160.6, iDag: 21.5, endringFraIGar: 0.2,   plasseringEndring: 0 },
  { navn: "Telemark",         total: 160.4, iDag: 19.5, endringFraIGar: -6.3,  plasseringEndring: 0 },
  { navn: "Akershus",         total: 148.4, iDag: 18.9, endringFraIGar: -3.1,  plasseringEndring: 0 },
  { navn: "Østfold",          total: 145.1, iDag: 19.4, endringFraIGar: -2.6,  plasseringEndring: 0 },
  { navn: "Oslo",             total: 143.0, iDag: 19.8, endringFraIGar: -9.7,  plasseringEndring: 1 },
  { navn: "Vestfold",         total: 131.2, iDag: 17.0, endringFraIGar: -3.0,  plasseringEndring: -1 },
];

// ---- TOPP 5 STASJONER SØNDAG 08.03 ----

export const STASJONER_PERIODE = [
  { navn: "Båtsfjord–Straumsnesaksla", kommune: "Båtsfjord",  fylke: "Finnmark",  ei: 65.7, vindkast: 19.8, nedbor: 0, temp: -9.0, farevarsel: "oransje" },
  { navn: "Hasvik–Sluskfjellet",       kommune: "Hasvik",     fylke: "Finnmark",  ei: 64.5, vindkast: 25.9, nedbor: 0, temp: 0.3,  farevarsel: "oransje" },
  { navn: "Narvik–Fagernesfjellet",    kommune: "Narvik",     fylke: "Nordland",  ei: 62.3, vindkast: 27.8, nedbor: 0, temp: -1.8, farevarsel: "oransje" },
  { navn: "Vardø Lufthavn",            kommune: "Vardø",      fylke: "Finnmark",  ei: 61.1, vindkast: 19.1, nedbor: 0, temp: -7.5, farevarsel: "gul" },
  { navn: "Trolledalsegga",            kommune: "Stad",       fylke: "Vestland",  ei: 60.6, vindkast: 25.1, nedbor: 0, temp: 0.9,  farevarsel: "gul" },
];

// ---- UKENS TOPP 5 STASJONER (sammenlagt man–søn 02.03–08.03) ----
// Kilde: Frost API P1D + timesdata, 1472 stasjoner, min 4 dager med data
// Sortert etter total EI (høyest først)

export const STASJONER_UKE = [
  {
    navn: "Hasvik–Sluskfjellet",
    kommune: "Hasvik",
    fylke: "Finnmark",
    totalEi: 461.3,
    gustMax: 43.2,
    precipTotal: 0.0,
    tempMin: -5.3,
    dager: [57.4, 75.1, 57.8, 48.5, 78.9, 79.4, 64.3],
    beskrivelse: "Ukens absolutte vinner. Jevnt over 57–79 poeng hver dag — vedvarende kulde og sterk vind fra Barentshavet. Toppdag lørdag med 79.4 EI og 43.2 m/s vindkast."
  },
  {
    navn: "Narvik–Fagernesfjellet",
    kommune: "Narvik",
    fylke: "Nordland",
    totalEi: 435.2,
    gustMax: 32.3,
    precipTotal: 0.0,
    tempMin: -4.8,
    dager: [49.7, 58.5, 56.8, 56.4, 76.8, 75.8, 61.1],
    beskrivelse: "Fjellet over Narvik fikk full storm fredag og lørdag (76–77 EI). Jevn høy score hele uken — ingen hviledag."
  },
  {
    navn: "Trolledalsegga",
    kommune: "Stad",
    fylke: "Vestland",
    totalEi: 417.6,
    gustMax: 31.3,
    precipTotal: 0.0,
    tempMin: -3.7,
    dager: [64.8, 67.0, 67.0, 63.6, 42.1, 54.3, 59.0],
    beskrivelse: "Vestlandets verste punkt. Hardest rammet mandag–torsdag (63–67 EI). Noe roligere fredag, men fortsatt godt over 50 i helgen."
  },
  {
    navn: "Glomfjord–Skihytta",
    kommune: "Meløy",
    fylke: "Nordland",
    totalEi: 405.5,
    gustMax: 27.3,
    precipTotal: 77.6,
    tempMin: 0.0,
    dager: [57.4, 55.0, 78.0, 65.9, 50.1, 59.0, 40.1],
    beskrivelse: "Nordlands nedbørsmester med 77.6 mm total. Onsdag var brutalt med 78.0 EI. Kombinasjonen av sludd og vind ga sluddbonus flere dager."
  },
  {
    navn: "Honningsvåg Lufthavn",
    kommune: "Nordkapp",
    fylke: "Finnmark",
    totalEi: 393.1,
    gustMax: 29.6,
    precipTotal: 24.5,
    tempMin: -3.0,
    dager: [56.6, 63.4, 47.8, 43.3, 57.2, 77.8, 47.0],
    beskrivelse: "Nordkapp-kysten fikk sin verste dag lørdag med 77.8 EI. Jevnt over 43–63 poeng ellers i uken — typisk arktisk kystklima."
  },
];

// ---- TRONSKIFTE ----

export const TRONSKIFTE = {
  aktiv: true,
  tittel: "FINNMARK LEDER KLART!",
  beskrivelse: "Finnmark tar ukesseieren med 244.9 poeng — nesten 10 poeng foran Nordland (235.1). Vedvarende kulde og sterk vind gjennom hele uken gjør Finnmark til Norges elendigste fylke uke 10. Nordland hadde sin verste dag onsdag (45.0) men klarte ikke å holde følge i helgen. Troms sikrer bronseplassen med 212.3.",
  gammelLeder: "Delt ledelse (Finnmark & Nordland)",
  nyLeder: "Finnmark",
};

// ---- DAGENS LEDER ----

export const DAGENS_LEDER = {
  fylke: "Finnmark",
  ei: 32.6,
  temp: -9.0,
  nedbor: 0,
};

// ---- HJELPEFUNKSJONER ----

export function scoreColor(score: number): string {
  if (score > 50) return "#ff2d2d";
  if (score >= 30) return "#ffaa00";
  return "#d4c957";
}

export function scoreClass(score: number): string {
  if (score > 50) return "score-critical";
  if (score >= 30) return "score-warning";
  return "score-caution";
}

export function fmt(n: number): string {
  return n.toFixed(1);
}

export function fmtChange(n: number): string {
  return (n > 0 ? "+" : "") + n.toFixed(1);
}

export function posLabel(n: number): string {
  if (n > 0) return "\u25B2 " + n;
  if (n < 0) return "\u25BC " + Math.abs(n);
  return "\u2014";
}

export function posColor(n: number): string {
  if (n > 0) return "#00d4ff";
  if (n < 0) return "#ff2d2d";
  return "#4a6a8a";
}

export function sortedSammenlagt() {
  return [...FYLKER_SAMMENLAGT].sort((a, b) => b.total - a.total);
}

export function sortedIDag() {
  return [...FYLKER_SAMMENLAGT].sort((a, b) => b.iDag - a.iDag);
}

export function sortedDagForDag() {
  return [...FYLKER_DAG_FOR_DAG].sort((a, b) => {
    const sumA = a.dager.reduce((s, v) => s + v, 0);
    const sumB = b.dager.reduce((s, v) => s + v, 0);
    return sumB - sumA;
  });
}
