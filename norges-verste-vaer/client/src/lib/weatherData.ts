/**
 * ============================================================
 * NORGES VERSTE VÆR — DATABLOKK
 * ============================================================
 * FREMTIDSSIKRING: For å oppdatere dashboardet med nye data,
 * erstatt kun denne filen. Designet endres ikke.
 *
 * Sist oppdatert: 10.03.2026 kl. 17:20
 * Periode sammenlagt: 12 dager
 * Kilde: Frost API (frost.met.no), P1D + timesdata
 * ============================================================
 */

// ---- METADATA ----

export const META = {
  serieNavn: "Norges Verste Vær",
  dagLabel: "Mandag 09.03.2026",
  sammenlagtLabel: "12 dager",
  datoOppdatert: "10.03.2026 kl. 17:20",
  rapportVersjon: "v18 (Frost API P1D + timesdata)",
  dagLabels: ["Man 02", "Tir 03", "Ons 04", "Tor 05", "Fre 06", "Lør 07", "Søn 08", "Lør 07", "Lør 07", "Lør 07", "Lør 07", "Man 09"],
};

// ---- DAG-FOR-DAG EI PER FYLKE ----

export const FYLKER_DAG_FOR_DAG = [
  { navn: "Finnmark", dager: [33.0, 41.0, 36.0, 27.1, 37.2, 38.0, 32.6, 33.9, 33.9, 33.9, 33.9, 31.0], trend: "Noe bedring (-2.9) — roligere forhold" },
  { navn: "Nordland", dager: [28.5, 42.0, 45.0, 23.2, 34.8, 32.8, 28.8, 23.5, 23.5, 23.5, 23.5, 24.3], trend: "Stabilt — lite endring fra i går" },
  { navn: "Troms", dager: [30.0, 35.0, 37.0, 25.3, 30.0, 29.0, 26.0, 25.0, 25.0, 25.0, 25.0, 25.6], trend: "Stabilt — lite endring fra i går" },
  { navn: "Trøndelag", dager: [27.0, 36.0, 37.0, 18.9, 23.0, 26.4, 25.8, 21.1, 21.1, 21.1, 21.1, 21.5], trend: "Stabilt — lite endring fra i går" },
  { navn: "Innlandet", dager: [26.0, 34.0, 36.0, 19.1, 25.2, 27.8, 24.6, 20.8, 20.8, 20.8, 20.8, 22.1], trend: "Stabilt — lite endring fra i går" },
  { navn: "Vestland", dager: [32.0, 45.0, 42.0, 18.2, 20.1, 21.4, 22.1, 18.4, 18.4, 18.4, 18.4, 20.8], trend: "Noe forverring (+2.4) — ustabilt vær fortsetter" },
  { navn: "Møre og Romsdal", dager: [29.0, 40.0, 39.0, 16.7, 21.9, 23.8, 23.7, 18.0, 18.0, 18.0, 18.0, 18.0], trend: "Stabilt — lite endring fra i går" },
  { navn: "Rogaland", dager: [28.0, 38.0, 41.0, 17.3, 18.8, 18.1, 17.0, 16.0, 16.0, 15.9, 15.9, 19.8], trend: "Noe forverring (+3.9) — ustabilt vær fortsetter" },
  { navn: "Buskerud", dager: [20.0, 26.0, 28.0, 17.1, 22.4, 25.2, 22.5, 19.2, 19.2, 19.2, 19.2, 21.0], trend: "Stabilt — lite endring fra i går" },
  { navn: "Telemark", dager: [21.0, 27.0, 29.0, 16.7, 21.4, 25.8, 19.5, 18.3, 18.3, 18.3, 18.3, 20.9], trend: "Noe forverring (+2.6) — ustabilt vær fortsetter" },
  { navn: "Agder", dager: [22.0, 28.0, 28.0, 17.4, 22.4, 21.3, 21.5, 18.3, 18.3, 18.3, 18.3, 20.6], trend: "Noe forverring (+2.3) — ustabilt vær fortsetter" },
  { navn: "Akershus", dager: [19.0, 24.0, 27.0, 16.3, 21.2, 22.0, 18.9, 18.2, 18.2, 18.2, 18.2, 20.2], trend: "Stabilt — lite endring fra i går" },
  { navn: "Østfold", dager: [18.0, 23.0, 25.0, 15.9, 21.8, 22.0, 19.4, 17.9, 17.9, 17.9, 17.9, 20.8], trend: "Noe forverring (+2.9) — ustabilt vær fortsetter" },
  { navn: "Oslo", dager: [16.0, 20.0, 23.0, 13.1, 21.6, 29.5, 19.8, 0.0, 0.0, 0.0, 0.0, 0.0], trend: "Stabilt — lite endring fra i går" },
  { navn: "Vestfold", dager: [17.0, 21.0, 22.0, 16.2, 18.0, 20.0, 17.0, 0.0, 0.0, 0.0, 0.0, 0.0], trend: "Stabilt — lite endring fra i går" },
];

// ---- SAMMENLAGT ----

export const FYLKER_SAMMENLAGT = [
  { navn: "Finnmark", total: 411.5, iDag: 31.0, endringFraIGar: -2.9, plasseringEndring: 0 },
  { navn: "Nordland", total: 353.4, iDag: 24.3, endringFraIGar: 0.8, plasseringEndring: 0 },
  { navn: "Troms", total: 337.9, iDag: 25.6, endringFraIGar: 0.6, plasseringEndring: 0 },
  { navn: "Trøndelag", total: 300.0, iDag: 21.5, endringFraIGar: 0.4, plasseringEndring: 0 },
  { navn: "Innlandet", total: 298.0, iDag: 22.1, endringFraIGar: 1.3, plasseringEndring: 0 },
  { navn: "Vestland", total: 295.2, iDag: 20.8, endringFraIGar: 2.4, plasseringEndring: 0 },
  { navn: "Møre og Romsdal", total: 284.1, iDag: 18.0, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Rogaland", total: 261.8, iDag: 19.8, endringFraIGar: 3.9, plasseringEndring: 0 },
  { navn: "Buskerud", total: 259.0, iDag: 21.0, endringFraIGar: 1.8, plasseringEndring: 0 },
  { navn: "Telemark", total: 254.5, iDag: 20.9, endringFraIGar: 2.6, plasseringEndring: 1 },
  { navn: "Agder", total: 254.4, iDag: 20.6, endringFraIGar: 2.3, plasseringEndring: -1 },
  { navn: "Akershus", total: 241.4, iDag: 20.2, endringFraIGar: 2.0, plasseringEndring: 0 },
  { navn: "Østfold", total: 237.5, iDag: 20.8, endringFraIGar: 2.9, plasseringEndring: 0 },
  { navn: "Oslo", total: 143.0, iDag: 0.0, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Vestfold", total: 131.2, iDag: 0.0, endringFraIGar: 0.0, plasseringEndring: 0 },
];

// ---- TOPP 5 STASJONER MANDAG 09.03.2026 ----

export const STASJONER_PERIODE = [
  { navn: "TROLLEDALSEGGA", kommune: "STAD", fylke: "Vestland", ei: 56.7, vindkast: 15.7, nedbor: 0, temp: -0.8, farevarsel: "gul" },
  { navn: "KRÅKENES", kommune: "KINN", fylke: "Vestland", ei: 56.5, vindkast: 20.8, nedbor: 0, temp: 6.1, farevarsel: "gul" },
  { navn: "HASVIK - SLUSKFJELLET", kommune: "HASVIK", fylke: "Finnmark", ei: 53.7, vindkast: 18.7, nedbor: 0, temp: -1.3, farevarsel: "gul" },
  { navn: "NARVIK - FAGERNESFJELLET", kommune: "NARVIK", fylke: "Nordland", ei: 50.7, vindkast: 9.3, nedbor: 0, temp: -2.2, farevarsel: "gul" },
  { navn: "YTTERØYANE FYR", kommune: "KINN", fylke: "Vestland", ei: 49.8, vindkast: 16.8, nedbor: 0, temp: 5.8, farevarsel: "gul" },
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
  aktiv: false,
  tittel: "FINNMARK LEDER KLART!",
  beskrivelse: "Finnmark leder sammenlagt med 411.5 poeng — 58.1 poeng foran Nordland (353.4).",
  gammelLeder: "Finnmark",
  nyLeder: "Finnmark",
};

// ---- DAGENS LEDER ----

export const DAGENS_LEDER = {
  fylke: "Finnmark",
  ei: 31.0,
  temp: 0,
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
