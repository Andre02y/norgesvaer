/**
 * ============================================================
 * NORGES VERSTE VÆR — DATABLOKK
 * ============================================================
 * FREMTIDSSIKRING: For å oppdatere dashboardet med nye data,
 * erstatt kun denne filen. Designet endres ikke.
 *
 * Sist oppdatert: 11.03.2026 kl. 02:32
 * Periode sammenlagt: 16 dager
 * Kilde: Frost API (frost.met.no), P1D + timesdata
 * ============================================================
 */

// ---- METADATA ----

export const META = {
  serieNavn: "Norges Verste Vær",
  dagLabel: "Tirsdag 10.03.2026",
  sammenlagtLabel: "16 dager",
  datoOppdatert: "11.03.2026 kl. 02:32",
  rapportVersjon: "v22 (Frost API P1D + timesdata)",
  dagLabels: ["Man 02", "Tir 03", "Ons 04", "Tor 05", "Fre 06", "Lør 07", "Søn 08", "Lør 07", "Lør 07", "Lør 07", "Lør 07", "Man 09", "Man 09", "Man 09", "Man 09", "Tir 10"],
};

// ---- DAG-FOR-DAG EI PER FYLKE ----

export const FYLKER_DAG_FOR_DAG = [
  { navn: "Finnmark", dager: [33.0, 41.0, 36.0, 27.1, 37.2, 38.0, 32.6, 33.9, 33.9, 33.9, 33.9, 31.0, 31.0, 31.0, 31.0, 30.2], trend: "Stabilt — lite endring fra i går" },
  { navn: "Nordland", dager: [28.5, 42.0, 45.0, 23.2, 34.8, 32.8, 28.8, 23.5, 23.5, 23.5, 23.5, 24.3, 24.3, 24.3, 24.3, 24.6], trend: "Stabilt — lite endring fra i går" },
  { navn: "Troms", dager: [30.0, 35.0, 37.0, 25.3, 30.0, 29.0, 26.0, 25.0, 25.0, 25.0, 25.0, 25.6, 25.6, 25.6, 25.6, 26.4], trend: "Stabilt — lite endring fra i går" },
  { navn: "Innlandet", dager: [26.0, 34.0, 36.0, 19.1, 25.2, 27.8, 24.6, 20.8, 20.8, 20.8, 20.8, 22.1, 22.1, 22.1, 22.1, 22.8], trend: "Stabilt — lite endring fra i går" },
  { navn: "Trøndelag", dager: [27.0, 36.0, 37.0, 18.9, 23.0, 26.4, 25.8, 21.1, 21.1, 21.1, 21.1, 21.5, 21.5, 21.5, 21.5, 19.7], trend: "Stabilt — lite endring fra i går" },
  { navn: "Vestland", dager: [32.0, 45.0, 42.0, 18.2, 20.1, 21.4, 22.1, 18.4, 18.4, 18.4, 18.4, 20.8, 20.8, 20.8, 20.8, 20.9], trend: "Stabilt — lite endring fra i går" },
  { navn: "Møre og Romsdal", dager: [29.0, 40.0, 39.0, 16.7, 21.9, 23.8, 23.7, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 17.8], trend: "Stabilt — lite endring fra i går" },
  { navn: "Buskerud", dager: [20.0, 26.0, 28.0, 17.1, 22.4, 25.2, 22.5, 19.2, 19.2, 19.2, 19.2, 21.0, 21.0, 21.0, 20.9, 21.1], trend: "Stabilt — lite endring fra i går" },
  { navn: "Rogaland", dager: [28.0, 38.0, 41.0, 17.3, 18.8, 18.1, 17.0, 16.0, 16.0, 15.9, 15.9, 19.8, 19.8, 19.8, 19.8, 21.2], trend: "Stabilt — lite endring fra i går" },
  { navn: "Telemark", dager: [21.0, 27.0, 29.0, 16.7, 21.4, 25.8, 19.5, 18.3, 18.3, 18.3, 18.3, 20.9, 20.9, 20.9, 20.9, 20.8], trend: "Stabilt — lite endring fra i går" },
  { navn: "Agder", dager: [22.0, 28.0, 28.0, 17.4, 22.4, 21.3, 21.5, 18.3, 18.3, 18.3, 18.3, 20.6, 20.6, 20.6, 20.6, 21.3], trend: "Stabilt — lite endring fra i går" },
  { navn: "Akershus", dager: [19.0, 24.0, 27.0, 16.3, 21.2, 22.0, 18.9, 18.2, 18.2, 18.2, 18.2, 20.2, 20.2, 20.2, 20.2, 20.6], trend: "Stabilt — lite endring fra i går" },
  { navn: "Østfold", dager: [18.0, 23.0, 25.0, 15.9, 21.8, 22.0, 19.4, 17.9, 17.9, 17.9, 17.9, 20.8, 20.8, 20.8, 20.8, 21.4], trend: "Stabilt — lite endring fra i går" },
  { navn: "Oslo", dager: [16.0, 20.0, 23.0, 13.1, 21.6, 29.5, 19.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], trend: "Stabilt — lite endring fra i går" },
  { navn: "Vestfold", dager: [17.0, 21.0, 22.0, 16.2, 18.0, 20.0, 17.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], trend: "Stabilt — lite endring fra i går" },
];

// ---- SAMMENLAGT ----

export const FYLKER_SAMMENLAGT = [
  { navn: "Finnmark", total: 534.7, iDag: 30.2, endringFraIGar: -0.8, plasseringEndring: 0 },
  { navn: "Nordland", total: 450.9, iDag: 24.6, endringFraIGar: 0.3, plasseringEndring: 0 },
  { navn: "Troms", total: 441.1, iDag: 26.4, endringFraIGar: 0.8, plasseringEndring: 0 },
  { navn: "Innlandet", total: 387.1, iDag: 22.8, endringFraIGar: 0.7, plasseringEndring: 1 },
  { navn: "Trøndelag", total: 384.2, iDag: 19.7, endringFraIGar: -1.8, plasseringEndring: -1 },
  { navn: "Vestland", total: 378.5, iDag: 20.9, endringFraIGar: 0.1, plasseringEndring: 0 },
  { navn: "Møre og Romsdal", total: 355.9, iDag: 17.8, endringFraIGar: -0.2, plasseringEndring: 0 },
  { navn: "Buskerud", total: 343.0, iDag: 21.1, endringFraIGar: 0.2, plasseringEndring: 0 },
  { navn: "Rogaland", total: 342.4, iDag: 21.2, endringFraIGar: 1.4, plasseringEndring: 0 },
  { navn: "Telemark", total: 338.0, iDag: 20.8, endringFraIGar: -0.1, plasseringEndring: 0 },
  { navn: "Agder", total: 337.5, iDag: 21.3, endringFraIGar: 0.7, plasseringEndring: 0 },
  { navn: "Akershus", total: 322.6, iDag: 20.6, endringFraIGar: 0.4, plasseringEndring: 0 },
  { navn: "Østfold", total: 321.3, iDag: 21.4, endringFraIGar: 0.6, plasseringEndring: 0 },
  { navn: "Oslo", total: 143.0, iDag: 0.0, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Vestfold", total: 131.2, iDag: 0.0, endringFraIGar: 0.0, plasseringEndring: 0 },
];

// ---- TOPP 5 STASJONER TIRSDAG 10.03.2026 ----

export const STASJONER_PERIODE = [
  { navn: "JUVVASSHØE", kommune: "LOM", fylke: "Innlandet", ei: 61.1, vindkast: 28.9, nedbor: 0, temp: -2.9, farevarsel: "oransje" },
  { navn: "HASVIK - SLUSKFJELLET", kommune: "HASVIK", fylke: "Finnmark", ei: 59.8, vindkast: 29.5, nedbor: 0, temp: -1.0, farevarsel: "gul" },
  { navn: "KRÅKENES", kommune: "KINN", fylke: "Vestland", ei: 59.8, vindkast: 22.9, nedbor: 0, temp: 6.3, farevarsel: "gul" },
  { navn: "FOLGEFONNA SKISENTER TOPP", kommune: "ULLENSVANG", fylke: "Vestland", ei: 58.5, vindkast: 19.3, nedbor: 0, temp: -1.2, farevarsel: "gul" },
  { navn: "NARVIK - FAGERNESFJELLET", kommune: "NARVIK", fylke: "Nordland", ei: 57.8, vindkast: 21.1, nedbor: 0, temp: -4.0, farevarsel: "gul" },
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
  beskrivelse: "Finnmark leder sammenlagt med 534.7 poeng — 83.8 poeng foran Nordland (450.9).",
  gammelLeder: "Finnmark",
  nyLeder: "Finnmark",
};

// ---- DAGENS LEDER ----

export const DAGENS_LEDER = {
  fylke: "Finnmark",
  ei: 30.2,
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
