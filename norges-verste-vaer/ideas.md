# Norges Verste Vær — Dashboard Design Ideas

## Kontekst
Et TikTok-serie dashboard som viser "Elendighets-Indeks" for norske fylker og stasjoner. Mørkt, profesjonelt tema med fargekoding (rød >50, oransje 30-50, gul resten). Dataene skal ligge i en JSON-variabel øverst for enkel oppdatering.

---

<response>
## Idé 1: "Arctic Command Center"

<text>
**Design Movement:** Military/tactical command center estetikk — inspirert av kontrollrom og overvåkningssystemer fra nordiske forsvarsinstallasjoner.

**Core Principles:**
1. Monospaced data-display med skarpe kanter — ingen avrundede hjørner
2. Gridbasert informasjonsarkitektur med tydelige "paneler"
3. Subtile scan-line effekter og CRT-glow for autentisitet
4. Høy informasjonstetthet uten visuelt kaos

**Color Philosophy:** Primært mørk bakgrunn (#0a0e17) med cyan/teal (#00d4ff) som primær aksentfarge for "normal" data. Rød (#ff2d2d) for kritiske verdier, amber (#ffaa00) for mellomverdier, og en dempet gul (#d4c957) for lavere scores. Fargene skal føles som instrumentpaneler — funksjonelle, ikke dekorative.

**Layout Paradigm:** Full-bredde dashboard med asymmetrisk panel-layout. Topp-banner som en "alert bar" med pulserende effekt. Under dette: venstre kolonne for hovedranking (60%), høyre kolonne for "tronskifte" og stasjonsdata (40%). Bunnseksjon for detaljert fylkestabell.

**Signature Elements:**
1. Pulserende "LIVE"-indikator ved topp-banneret
2. Glødende border-effekter rundt paneler som intensiveres med høyere score
3. Animerte progress-bars som fyller seg basert på EI-score

**Interaction Philosophy:** Statisk dashboard optimalisert for skjermopptak til TikTok. Minimale interaksjoner, men subtile hover-effekter på tabellrader for desktop-bruk.

**Animation:** Entrance-animasjoner der paneler "fader inn" sekvensielt. Tall-counters som teller opp til endelig verdi. Pulserende glow på høyeste score.

**Typography System:** JetBrains Mono for alle tall og data-verdier. Space Grotesk for overskrifter og labels. Streng hierarki: H1 for hovedtittel, monospace for all numerisk data.
</text>
<probability>0.07</probability>
</response>

---

<response>
## Idé 2: "Nordic Storm Tracker"

<text>
**Design Movement:** Skandinavisk brutalisme møter meteorologisk datavisualisering — rå, ærlig, og kraftfull som selve stormen.

**Core Principles:**
1. Stor, modig typografi som dominerer — tallene ER designet
2. Kontrastrike fargeblokker som "varselflagg"
3. Vertikal informasjonsflyt som en nyhetsfeed/ticker
4. Rå, upolert estetikk som matcher temaet "verste vær"

**Color Philosophy:** Nesten svart bakgrunn (#0d0d0f) med hvit tekst som standard. Fargekodingen brukes som bakgrunnsblokker, ikke bare tekstfarge — et element med score >50 får en rød bakgrunnsstripe som en fysisk advarsel. Oransje og gul brukes som aksenter. En iskald blå (#1a3a5c) for sekundære paneler.

**Layout Paradigm:** Vertikal, full-bredde layout med store seksjonsskiller. Topp-banneret tar 30vh med gigantisk typografi. Deretter alternerende seksjoner med vekslende bredder — noen tar full bredde, andre er offset til venstre eller høyre for visuell dynamikk.

**Signature Elements:**
1. Oversized EI-tall (200px+) for "vinneren" med en subtil tekstur-overlay
2. Diagonale "fare-striper" (hazard stripes) som seksjonsskillere
3. Små "badge"-elementer med farevarsel-nivåer

**Interaction Philosophy:** Scroll-basert opplevelse designet for å leses lineært, som en rapport. Perfekt for skjermopptak der man scroller gjennom dataene.

**Animation:** Minimale animasjoner — kun en subtil fade-in ved scroll. Hovedfokus på statisk visuell kraft. Tronskifte-seksjonen har en kort "flash"-effekt.

**Typography System:** Archivo Black for overskrifter og store tall — tungt, komprimert, og kraftfullt. DM Sans for brødtekst og labels. Tallene er alltid tabular-nums for perfekt justering.
</text>
<probability>0.05</probability>
</response>

---

<response>
## Idé 3: "Weather War Room"

<text>
**Design Movement:** Datajournalistikk-estetikk inspirert av NYT/Reuters interaktive grafikk, men med en mørkere, mer dramatisk tone tilpasset TikTok-formatet.

**Core Principles:**
1. Klar visuell hierarki med "breaking news"-energi
2. Kompakte, informasjonsrike kort med tydelig gruppering
3. Fargegradientbruk for å kommunisere intensitet
4. Profesjonelt men tilgjengelig — data for alle

**Color Philosophy:** Dyp marine bakgrunn (#0b1426) som gir en "nattlig kontrollrom"-følelse. Fargeskalaen går fra kald blå (lav score) gjennom varm gul og oransje til intens rød (høy score) — en naturlig "varmekart"-logikk. Hvit tekst (#e8edf5) med varierende opasitet for hierarki.

**Layout Paradigm:** Card-basert dashboard med et prominent "hero"-kort øverst for dagens verste. Under dette: to-kolonne layout med fylkesranking til venstre og stasjonsranking til høyre. Tronskifte-seksjonen som et fremhevet "breaking"-kort mellom seksjonene.

**Signature Elements:**
1. Gradient-borders på kort som reflekterer score-nivå (rød glow for høye scores)
2. Små sparkline-lignende indikatorer for endring fra i går
3. "Breaking"-banner med animert bakgrunn for tronskiftet

**Interaction Philosophy:** Dashboard-optimalisert for rask scanning. Alle viktige tall er synlige uten scrolling på desktop. Responsivt for mobil med stacked layout.

**Animation:** Subtile entrance-animasjoner med stagger-effekt. Tall som "teller opp" ved første visning. Tronskifte-kortet har en pulserende border-animasjon.

**Typography System:** Instrument Sans for overskrifter — moderne, geometrisk, og autoritativt. Source Sans 3 for data og brødtekst. Monospace (Fira Code) kun for rå tallverdier i tabeller.
</text>
<probability>0.08</probability>
</response>
