/**
 * ============================================================
 * NORGES VERSTE VÆR — DATABLOKK
 * ============================================================
 * FREMTIDSSIKRING: For å oppdatere dashboardet med nye data,
 * erstatt kun denne filen. Designet endres ikke.
 *
 * Sist oppdatert: 19.03.2026 kl. 07:05
 * Periode sammenlagt: 106 dager
 * Kilde: Frost API (frost.met.no), P1D + timesdata
 * ============================================================
 */

// ---- METADATA ----

export const META = {
  serieNavn: "Norges Verste Vær",
  dagLabel: "Onsdag 18.03.2026",
  sammenlagtLabel: "106 dager",
  datoOppdatert: "19.03.2026 kl. 07:05",
  rapportVersjon: "v112 (Frost API P1D + timesdata)",
  dagLabels: ["Man 02", "Tir 03", "Ons 04", "Tor 05", "Fre 06", "Lør 07", "Søn 08", "Lør 07", "Lør 07", "Lør 07", "Lør 07", "Man 09", "Man 09", "Man 09", "Man 09", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Tir 10", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Ons 11", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Tor 12", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Fre 13", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Lør 14", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Søn 15", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Man 16", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Tir 17", "Ons 18", "Ons 18", "Ons 18"],
};

// ---- DAG-FOR-DAG EI PER FYLKE ----

export const FYLKER_DAG_FOR_DAG = [
  { navn: "Finnmark", dager: [33.0, 41.0, 36.0, 27.1, 37.2, 38.0, 32.6, 33.9, 33.9, 33.9, 33.9, 31.0, 31.0, 31.0, 31.0, 30.2, 30.2, 30.2, 30.1, 30.1, 30.1, 30.1, 30.1, 30.1, 30.1, 30.1, 30.6, 30.6, 30.6, 30.6, 30.7, 30.7, 30.7, 30.7, 30.7, 30.7, 30.7, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.0, 30.5, 30.5, 30.5, 30.5, 30.5, 30.5, 30.5, 30.5, 30.5, 30.5, 30.5, 33.5, 33.5, 33.5, 33.5, 33.5, 33.5, 33.5, 33.5, 33.5, 33.5, 33.5, 29.2, 29.2, 29.2, 29.2, 29.2, 29.2, 29.2, 29.2, 29.2, 29.2, 29.2, 28.9, 28.9, 29.0, 29.0, 29.0, 29.0, 29.0, 29.0, 29.0, 29.0, 29.0, 29.7, 29.7, 29.7, 29.7, 29.7, 29.7, 29.7, 29.7, 29.7, 29.7, 29.7, 31.4, 31.4, 31.4], trend: "Stabilt — lite endring fra i går" },
  { navn: "Troms", dager: [30.0, 35.0, 37.0, 25.3, 30.0, 29.0, 26.0, 25.0, 25.0, 25.0, 25.0, 25.6, 25.6, 25.6, 25.6, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 25.6, 25.6, 25.5, 25.8, 25.9, 25.9, 25.9, 25.9, 25.9, 25.9, 25.9, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 26.7, 26.7, 26.7], trend: "Stabilt — lite endring fra i går" },
  { navn: "Nordland", dager: [28.5, 42.0, 45.0, 23.2, 34.8, 32.8, 28.8, 23.5, 23.5, 23.5, 23.5, 24.3, 24.3, 24.3, 24.3, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 22.6, 22.6, 22.6, 22.6, 22.7, 22.7, 22.7, 22.7, 22.7, 22.7, 22.7, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0, 25.0, 24.2, 24.2, 24.2, 24.2, 24.2, 24.2, 24.2, 24.2, 24.2, 24.2, 24.2, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 24.1, 27.6, 27.6, 27.6], trend: "Stabilt — lite endring fra i går" },
  { navn: "Innlandet", dager: [26.0, 34.0, 36.0, 19.1, 25.2, 27.8, 24.6, 20.8, 20.8, 20.8, 20.8, 22.1, 22.1, 22.1, 22.1, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8, 22.8, 23.4, 23.4, 23.4, 23.4, 23.4, 23.4, 23.4, 23.4, 23.4, 23.4, 23.4, 25.3, 25.3, 25.3, 25.2, 25.2, 25.2, 25.2, 25.2, 25.2, 25.2, 25.2, 25.8, 25.8, 25.8, 25.8, 25.8, 25.8, 25.8, 25.8, 25.8, 25.8, 25.8, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 23.9, 24.4, 24.4, 24.4, 24.4, 24.4, 24.5, 24.5, 24.5, 24.5, 24.5, 24.5, 24.5, 24.5, 24.5, 24.4, 24.4, 24.4, 24.4, 24.4, 24.4, 24.4, 24.4, 23.4, 23.4, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 21.5, 21.5, 21.5], trend: "Stabilt — lite endring fra i går" },
  { navn: "Agder", dager: [22.0, 28.0, 28.0, 17.4, 22.4, 21.3, 21.5, 18.3, 18.3, 18.3, 18.3, 20.6, 20.6, 20.6, 20.6, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 24.6, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 26.2, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6, 21.6, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 19.3, 19.3, 19.3], trend: "Stabilt — lite endring fra i går" },
  { navn: "Vestland", dager: [32.0, 45.0, 42.0, 18.2, 20.1, 21.4, 22.1, 18.4, 18.4, 18.4, 18.4, 20.8, 20.8, 20.8, 20.8, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 23.3, 23.3, 23.3, 23.3, 23.3, 23.3, 23.3, 23.3, 23.3, 23.3, 23.3, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8, 23.8, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.7, 22.7, 22.7, 22.7, 22.7, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 19.9, 19.9, 19.9, 19.9, 19.9, 19.9, 19.9, 19.9, 19.9, 19.9, 19.9, 19.8, 19.8, 19.8], trend: "Stabilt — lite endring fra i går" },
  { navn: "Østfold", dager: [18.0, 23.0, 25.0, 15.9, 21.8, 22.0, 19.4, 17.9, 17.9, 17.9, 17.9, 20.8, 20.8, 20.8, 20.8, 21.4, 21.4, 21.4, 21.4, 21.4, 21.4, 21.4, 21.4, 21.4, 21.4, 21.4, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 21.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 25.7, 25.7, 25.7, 25.7, 25.7, 25.7, 25.7, 25.7, 25.7, 25.7, 25.7, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 19.8, 19.8, 19.8], trend: "Stabilt — lite endring fra i går" },
  { navn: "Trøndelag", dager: [27.0, 36.0, 37.0, 18.9, 23.0, 26.4, 25.8, 21.1, 21.1, 21.1, 21.1, 21.5, 21.5, 21.5, 21.5, 19.7, 19.7, 19.7, 19.7, 19.7, 19.7, 19.7, 19.7, 19.7, 19.7, 19.7, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.0, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.2, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 19.3, 19.3, 19.3], trend: "Stabilt — lite endring fra i går" },
  { navn: "Buskerud", dager: [20.0, 26.0, 28.0, 17.1, 22.4, 25.2, 22.5, 19.2, 19.2, 19.2, 19.2, 21.0, 21.0, 21.0, 20.9, 21.1, 21.0, 21.1, 21.1, 21.1, 21.1, 21.1, 21.1, 21.1, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.8, 20.8, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.6, 21.6, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 22.1, 21.9, 21.9, 21.9, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.2, 21.2, 21.8, 21.8, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.7, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 17.6, 17.6, 17.6], trend: "Stabilt — lite endring fra i går" },
  { navn: "Telemark", dager: [21.0, 27.0, 29.0, 16.7, 21.4, 25.8, 19.5, 18.3, 18.3, 18.3, 18.3, 20.9, 20.9, 20.9, 20.9, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.5, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 21.8, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 20.8, 18.1, 18.1, 18.1], trend: "Stabilt — lite endring fra i går" },
  { navn: "Rogaland", dager: [28.0, 38.0, 41.0, 17.3, 18.8, 18.1, 17.0, 16.0, 16.0, 15.9, 15.9, 19.8, 19.8, 19.8, 19.8, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.2, 21.1, 21.1, 21.1, 21.1, 21.1, 21.1, 21.1, 21.1, 21.1, 20.9, 20.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 21.9, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4, 22.4, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 18.2, 18.2, 18.2], trend: "Stabilt — lite endring fra i går" },
  { navn: "Møre og Romsdal", dager: [29.0, 40.0, 39.0, 16.7, 21.9, 23.8, 23.7, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 17.8, 17.8, 17.8, 17.8, 17.8, 17.8, 17.8, 17.8, 17.8, 17.8, 17.8, 18.5, 18.5, 18.6, 18.6, 18.6, 18.6, 18.6, 18.6, 18.6, 18.6, 18.6, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 20.4, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 21.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 20.3, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 16.7, 16.7, 16.7, 16.7, 16.7, 16.7, 16.7, 16.7, 16.7, 16.7, 16.7, 19.0, 19.0, 19.0], trend: "Stabilt — lite endring fra i går" },
  { navn: "Akershus", dager: [19.0, 24.0, 27.0, 16.3, 21.2, 22.0, 18.9, 18.2, 18.2, 18.2, 18.2, 20.2, 20.2, 20.2, 20.2, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 20.6, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 19.8, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 20.5, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.1, 19.4, 19.4, 19.4, 19.4, 19.4, 19.4, 19.4, 19.4, 19.4, 19.4, 19.4, 19.6, 19.6, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 19.5, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 18.9, 17.3, 17.3, 17.3], trend: "Stabilt — lite endring fra i går" },
  { navn: "Oslo", dager: [16.0, 20.0, 23.0, 13.1, 21.6, 29.5, 19.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], trend: "Stabilt — lite endring fra i går" },
  { navn: "Vestfold", dager: [17.0, 21.0, 22.0, 16.2, 18.0, 20.0, 17.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], trend: "Stabilt — lite endring fra i går" },
];

// ---- SAMMENLAGT ----

export const FYLKER_SAMMENLAGT = [
  { navn: "Finnmark", total: 3268.1, iDag: 31.4, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Troms", total: 2716.8, iDag: 26.7, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Nordland", total: 2641.6, iDag: 27.6, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Innlandet", total: 2557.2, iDag: 21.5, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Agder", total: 2384.9, iDag: 19.3, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Vestland", total: 2348.0, iDag: 19.8, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Østfold", total: 2292.0, iDag: 19.8, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Trøndelag", total: 2283.9, iDag: 19.3, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Buskerud", total: 2259.7, iDag: 17.6, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Telemark", total: 2222.8, iDag: 18.1, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Rogaland", total: 2194.8, iDag: 18.2, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Møre og Romsdal", total: 2087.8, iDag: 19.0, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Akershus", total: 2080.0, iDag: 17.3, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Oslo", total: 143.0, iDag: 0.0, endringFraIGar: 0.0, plasseringEndring: 0 },
  { navn: "Vestfold", total: 131.2, iDag: 0.0, endringFraIGar: 0.0, plasseringEndring: 0 },
];

// ---- TOPP 5 STASJONER ONSDAG 18.03.2026 ----

export const STASJONER_PERIODE = [
  { navn: "JUVVASSHØE", kommune: "LOM", fylke: "Innlandet", ei: 80.2, vindkast: 32.9, nedbor: 0, temp: -3.1, farevarsel: "oransje" },
  { navn: "NARVIK - FAGERNESFJELLET", kommune: "NARVIK", fylke: "Nordland", ei: 78.7, vindkast: 34.1, nedbor: 0, temp: 0.4, farevarsel: "oransje" },
  { navn: "ROALDSHORNET", kommune: "STRANDA", fylke: "Møre og Romsdal", ei: 75.4, vindkast: 35.2, nedbor: 0, temp: 2.2, farevarsel: "oransje" },
  { navn: "KAPPFJELLET", kommune: "GRANE", fylke: "Nordland", ei: 73.0, vindkast: 25.6, nedbor: 0, temp: -0.2, farevarsel: "oransje" },
  { navn: "KRÅKENES", kommune: "KINN", fylke: "Vestland", ei: 72.8, vindkast: 34.0, nedbor: 0, temp: 7.6, farevarsel: "oransje" },
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
  beskrivelse: "Finnmark leder sammenlagt med 3268.1 poeng — 551.3 poeng foran Troms (2716.8).",
  gammelLeder: "Finnmark",
  nyLeder: "Finnmark",
};

// ---- DAGENS LEDER ----

export const DAGENS_LEDER = {
  fylke: "Finnmark",
  ei: 31.4,
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
