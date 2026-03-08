# Norges Verste Vær — Oppsett og Konfigurasjon

## Oversikt

Dashboardet oppdateres automatisk via to GitHub Actions workflows:

1. **Daily Weather Update** — Henter gårsdagens observasjonsdata fra Frost API daglig kl. 13:46 UTC
2. **Deploy to Vercel** — Bygger og deployer til Vercel ved hver push til `main`

Flyten er: Frost API → `weatherData.ts` oppdateres → auto-commit → push trigger → Vercel deploy.

---

## Påkrevde GitHub Secrets

Gå til **Settings → Secrets and variables → Actions** i GitHub-repoet og legg til følgende:

| Secret | Beskrivelse | Hvor finner du den? |
|--------|-------------|---------------------|
| `FROST_CLIENT_ID` | Frost API Client ID | Registrer deg på [frost.met.no](https://frost.met.no/) og opprett en app |
| `VERCEL_TOKEN` | Vercel API token | [vercel.com/account/tokens](https://vercel.com/account/tokens) — lag en ny token |
| `VERCEL_ORG_ID` | Vercel Organization/Team ID | Se instruksjoner nedenfor |
| `VERCEL_PROJECT_ID` | Vercel Project ID | Se instruksjoner nedenfor |

### Finne Vercel IDs

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Logg inn
vercel login

# 3. Link prosjektet (kjør i prosjektmappen)
vercel link

# 4. IDs lagres i .vercel/project.json
cat .vercel/project.json
# Output: { "orgId": "...", "projectId": "..." }
```

Kopier `orgId` → `VERCEL_ORG_ID` og `projectId` → `VERCEL_PROJECT_ID` som GitHub Secrets.

---

## Manuell kjøring

Begge workflows kan kjøres manuelt fra GitHub Actions-fanen:

1. Gå til **Actions** i repoet
2. Velg workflowen du vil kjøre
3. Klikk **Run workflow** → **Run workflow**

---

## Frost API-detaljer

### Elementer som hentes
- `sum(precipitation_amount P1D)` — Total nedbør (mm)
- `mean(wind_speed P1D)` — Gjennomsnittlig vindstyrke (m/s)
- `max(wind_speed_of_gust P1D)` — Maks vindkast (m/s)
- `mean(air_temperature P1D)` — Gjennomsnittstemperatur (°C)

### Elendighets-Indeks (EI) formel
```
EI = (vind_mean × 2.0) + (vindkast × 0.5) + (nedbør × 0.5) + (20 − temp)
```
**Sludd-bonus:** +15 poeng hvis temperatur mellom -1°C og +2°C OG nedbør > 0

### Fallback-logikk
Hvis daglige aggregater (P1D) ikke er tilgjengelige ennå, henter scriptet timesdata (PT1H) og aggregerer manuelt.

### Deduplisering
Nedbørsverdier dedupliseres — kun én verdi per stasjon per dato beholdes.

---

## Filstruktur

```
.github/workflows/
  daily-update.yml    ← Daglig Frost API-henting (cron: 13:46 UTC)
  deploy.yml          ← CI/CD deploy til Vercel ved push til main

scripts/
  fetch_frost_data.py ← Python-script for datahenting og EI-beregning

client/src/lib/
  weatherData.ts      ← All værdata (oppdateres automatisk av scriptet)
```

---

## Feilsøking

### "No data found" fra Frost API
P1D-data publiseres typisk etter kl. 08:00 UTC. Hvis workflowen kjører for tidlig, vil den prøve timesdata som fallback.

### Manglende fylker (Troms, Vestfold)
Noen stasjoner mangler kommunenummer-mapping i Frost API. Scriptet logger advarsler og bruker 0.0 som fallback. Sjekk loggene i GitHub Actions for detaljer.

### Vercel deploy feiler
Sjekk at alle fire Vercel-secrets er korrekt satt. Kjør `vercel link` lokalt for å verifisere IDs.
