# UU-testing

Denne veiledningen beskriver automatiske tester og manuelle kontroller av arbeidssøkerregisteret for personbrukere. Beståtte tester er ikke en samsvarserklæring. De viser at de konkrete kontrollene består for testtilstandene som finnes i repoet.

## Avgrensning

Vi tester appens sideinnhold uten Nav-dekoratøren. Storybook bruker de samme visningskomponentene som appen, med syntetiske data og kontrollerte callbacks. Den henter ikke dekoratøren. En separat smoke-test kontrollerer integrasjonen med ekte dekoratør.

Sidehistoriene tester ikke Next.js-ruting, serverrendering, streaming, autentisering eller backend-kall. Sidehistoriene har ingen erstatning for dekoratørens breadcrumbs og språkvelger. Smoke-testen og de manuelle kontrollene dekker samspillet med dekoratøren der det er relevant.

Vi bruker WCAG 2.1 A/AA som prosjektets testgrunnlag. WCAG 2.2 AA-tillegg er merket separat nedenfor. En test dekker ofte bare deler av et kriterium. Se begrensningene i tabellen.

## Kjør automatiske tester

Bruk Node-versjonen i `.nvmrc` og pnpm-versjonen i `package.json`.

```bash
nvm use
pnpm test:ci
pnpm typecheck
pnpm test-storybook
```

`pnpm test:ci` kjører Biome og jsdom-enhetstester, ikke nettlesertestene. `pnpm test-storybook` kjører alle inkluderte stories i Chromium ved 1280 × 900 og 320 × 900 CSS-piksler. Dette er to skjermbredder i samme nettlesermotor, ikke tester på en fysisk mobil.

Installer Chromium dersom det mangler:

```bash
pnpm exec playwright install chromium
```

Kjør en avgrenset gruppe ved å legge til filnavnet:

```bash
pnpm test-storybook src/components/sider/bekreftelsesside.stories.tsx
```

### Slik virker UU-sjekkene

- `.storybook/preview.ts` setter `a11y.test: 'error'`. Axe-funn får Storybook-testen til å feile.
- Axe undersøker storyens slutt-tilstand etter `play`. Hvis en test åpner og lukker en meny, har axe ikke undersøkt menyen mens den var åpen. Derfor slutter egne stories i åpne, feilende og ventende tilstander.
- Komponenthistorier bruker Storybooks standardregler. Tillegget deaktiverer `region` som standard fordi enkeltkomponenter ikke utgjør en hel side. Helsidehistoriene aktiverer regelen igjen.
- Stories med `parameters.uu.helSide: true` får ekstra kontroller i `src/test/uu.ts`: ett hovedlandemerke, én h1, overskriftshierarki, SVG-plassholdertitler og navn på flere navigasjonslandemerker.
- Helsidekontrollen måler horisontalt overløp før og etter at WCAGs tekstavstandsverdier settes. Test-CSS fjernes etter målingen. Dette beviser ikke at all tekst er uten klipping, eller at layouten fortsatt er forståelig.

Ved et axe-funn: åpne den aktuelle storyen med `pnpm storybook`, finn fanen for tilgjengelighet, og undersøk regel, berørte elementer og anbefalt retting. Resultater merket `incomplete` krever vurdering. At `violations` er tom, betyr ikke at de er godkjent. Ikke slå av en regel for å få grønn test uten å dokumentere årsak og ansvarlig.

## Automatisk dekning

| Område                      | Testfiler                                                                                           | Hva kontrolleres                                                                                                                                                               | Begrensning og manuell oppfølging                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Hovedside                   | `src/components/sider/hovedside.stories.tsx`, `hovedside.test.tsx`                                  | Sidevisninger på bokmål, nynorsk og engelsk; varianter av arbeidssøkerperiode og opplysninger; struktur og geometrisk overløp                                                  | Serverens datavalg, eksterne widgets og alle mulige kombinasjoner av data og toggles er ikke dekket |
| Historikk                   | `src/components/sider/historikkside.stories.tsx`                                                    | Historikk, tomt innhold, feil og lasting; flere språk; tastaturbetjening av detaljvalg og accordion                                                                            | Skjermleserens opplesning av tidslinje og lange historikker må vurderes                             |
| Bekreftelse                 | `src/components/sider/bekreftelsesside.stories.tsx`                                                 | Flere språk; ikke aktiv bruker; ingen tilgjengelige bekreftelser med/uten siste svar; tastaturinnsending, feil, venting, avslutningssteg, avbrudd, kvittering og neste periode | Callbackene er syntetiske. Testene endrer ikke en virkelig arbeidssøkerperiode                      |
| Skjemaets felter            | `src/components/bekreftelse/bekreftelse-skjema.stories.ts`                                          | Radiogrupper, piltaster, Tab, valgt verdi, feiltekst som tilgjengelig beskrivelse og fokus på første ubesvarte svar                                                            | Betydningen av spørsmål, feil og opplesningsrekkefølge krever menneskelig vurdering                 |
| Kategorier og menyer        | `src/components/styrkloft/{flervalgsmeny,underkategori-velger,filter-velger}.stories.tsx`           | Åpne tilstander, tastaturaktivering, valg, underkategorier, fjerning av chip og Escape/fokus tilbake                                                                           | Kontroller at menystrukturen er forståelig med skjermleser og berøring                              |
| Les mer og perioder         | `src/components/egenvurdering/readmore.stories.tsx`, `src/components/perioder/perioder.stories.tsx` | Tastaturåpning og utvidede tilstander; detaljvalg og periodeinnhold                                                                                                            | Leserekkefølge og forståelighet av det utvidede innholdet må vurderes                               |
| Paginering                  | `src/components/styrkloft/paginering.stories.tsx`                                                   | Tastaturaktivering, `aria-current`, lokaliserte navn og callback ved første/siste side                                                                                         | Hvordan nye stillingsresultater oppdages og leses etter sidebytte må kontrolleres manuelt           |
| Øvrige eksisterende stories | `src/**/*.stories.*`                                                                                | Axe undersøker rendret slutt-tilstand, også eksisterende egenvurderings-, stillings- og opplysningsvarianter                                                                   | En story uten `play` beviser ikke at interaksjon eller tilstandsoverganger fungerer                 |
| Dekoratørintegrasjon        | `scripts/uu-smoke.mjs`                                                                              | Kjørende app med ekte header/footer, sidetittel, hovedinnhold, hopp-lenke, fokus, overløp og språkbytte                                                                        | Ekstern avhengighet. Kjøres separat; ingen full axe-revisjon av dekoratøren                         |

Storyfilene er den nøyaktige oversikten over testtilstander og forventninger. Når en ny tilstand eller komponent legges til, skal denne tabellen oppdateres dersom dekningen endres.

### Hva kontrollene sier om WCAG

| WCAG                                                      | Automatisk kontroll i repoet                                                                    | Hva som gjenstår                                                                         |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1.1.1 Ikke-tekstlig innhold                               | Axe kan finne manglende navn/alternativer; helsidekontrollen finner SVG-tittelen `a11y-title`   | Om alternativet beskriver meningen, og om et ikon skal være dekorativt                   |
| 1.3.1 Informasjon og relasjoner, 4.1.2 Navn, rolle, verdi | Axe samt assertions på grupper, beskrivelser, valgt/utvidet tilstand og landemerker             | Relasjonenes betydning og faktisk opplesning                                             |
| 1.3.2 Meningsfylt rekkefølge, 2.4.3 Fokusrekkefølge       | Utvalgte tastatursekvenser og fokusassertions                                                   | Hele sidens lese- og fokusrekkefølge i alle relevante tilstander                         |
| 1.4.3 Kontrast                                            | Axe i rendret Chromium-innhold når regelen kan avgjøre kontrasten                               | `incomplete`, gradienter, bilder, hover/fokus og ikke-tekstlig kontrast etter 1.4.11     |
| 1.4.10 Dynamisk tilpasning, 1.4.12 Tekstavstand           | Målbart horisontalt overløp ved to bredder, med og uten tekstavstandsendring                    | Klipping, overlapp, lesbarhet og faktisk nettleserzoom                                   |
| 2.1.1 Tastatur, 2.1.2 Ingen tastaturfelle                 | Utvalgte flyter med Tab, piltaster, Space, Enter og Escape                                      | Full gjennomgang med/uten skjermleser, også tredjepartsinnhold                           |
| 2.4.1 Hoppe over blokker                                  | Smoke-test av dekoratørens hopp-lenke og fokusmål                                               | Om målet og etterfølgende Tab-rekkefølge er riktig på hver side                          |
| 2.4.2 Sidetitler, 3.1.1 Språk på siden                    | Smoke-test av sidetittel og dokumentets språk ved språkbytte                                    | Om tittel og språk er riktige ved direkte innlasting av alle ruter; 3.1.2 språk i deler  |
| 2.4.4 Formål med lenke, 2.4.6 Overskrifter og ledetekster | Axe fanger enkelte mangler; helsidekontrollen sjekker overskriftshierarki                       | Om teksten gir mening og skiller handlinger fra hverandre                                |
| 3.3.1 Identifikasjon av feil, 3.3.3 Forslag ved feil      | Syntetiske validerings-/innsendingsfeil og koblingen fra svar til feiltekst                     | Om feilen forklarer hvordan brukeren kommer videre                                       |
| 4.1.3 Statusbeskjeder                                     | Axe undersøker semantikken den kan kontrollere; noen overgangstester kontrollerer innhold/fokus | Faktisk annonsering, tidspunkt og mengde informasjon ved lasting, feil og nye resultater |

Enhets- eller Chromium-tester kan ikke sertifisere skjermleseropplevelsen. CSS-zoom og `deviceScaleFactor` er heller ikke en erstatning for nettleserzoom eller testing med hjelpemidler.

## Smoke-test med ekte dekoratør

Smoke-testen besøker en allerede kjørende app. Den starter ikke serveren, lager ikke tokens og sender ikke inn skjemaer. Den bruker ekte dekoratør og kontrollerer desktopbredde og mobilbredde. På desktop bytter den språk via dekoratøren til engelsk og tilbake til bokmål, og kontrollerer at app-ruten beholdes.

Lokalt brukes eksisterende mock-modus, med ekte dekoratør:

```bash
nvm use
ENABLE_MOCK=enabled NEXT_PUBLIC_ENABLE_MOCK=enabled pnpm dev
```

Kjør i en annen terminal:

```bash
nvm use
UU_SMOKE_URL=http://localhost:3000 pnpm test:uu-smoke
```

Bruk appens faktiske URL. Hvis `NEXT_PUBLIC_BASE_PATH` er satt, må URL-en inkludere denne. Feil rute skal gi feil i testen og ikke regnes som en bestått smoke-test.

For autentisert dev kan `UU_SMOKE_STORAGE_STATE` peke på en lokal Playwright storage state som du selv har laget med en testbruker:

```bash
UU_SMOKE_URL=https://www.ansatt.dev.nav.no/arbeidssoekerregisteret \
UU_SMOKE_STORAGE_STATE=.auth/uu-dev.json \
pnpm test:uu-smoke
```

Storage state inneholder innloggingsinformasjon og kan gi tilgang som testbrukeren. Oppbevar filen lokalt under `.auth/`, som er ignorert av Git. Ikke legg den i commit, logger eller CI-artefakter. Ikke bruk produksjonsøkter eller virkelige personopplysninger. Smoke-testen lagrer ikke skjermbilder eller traces som standard.

Den eksisterende CI-jobben kjører Storybook og blokkerer bygg ved feil. Smoke-testen er ikke lagt inn i CI. Automatisk kjøring mot dev krever separat avklaring av testidentitet, tilgang og håndtering av den eksterne avhengigheten.

## Manuelle testoppskrifter

Kjør med syntetiske data lokalt og en dedikert Dolly-testbruker i dev. Handlinger som bekrefter, avslutter eller lagrer, endrer testbrukerens data. Avtal tilstanden på forhånd. Ikke utfør disse testene mot produksjon.

Test hovedside, historikk og bekreftelse på bokmål, nynorsk og engelsk. Ta med lasting, feil, tomt innhold, utvidet innhold og kvittering. Test egenvurdering og stillingssøk når funksjonene er tilgjengelige. Rene sidehistorier erstatter ikke kontroll av komplette sider i appen.

### M1 Tastatur og synlig fokus

1. Last siden på nytt uten å klikke i innholdet. Bruk Tab og Shift+Tab gjennom hele siden, inkludert dekoratøren.
2. Aktiver knapper/lenker med Enter. Betjen radiogrupper og menyer med piltaster og Space. Lukk menyer med Escape.
3. Gjennomfør bekreftelse, avbryt avslutning og gå videre til neste periode. Prøv feil, ventende innsending og kvittering.
4. Velg/fjern søkefiltre, bytt stillingsvisning og side. Utvid historikk og slå detaljer av/på.

Forventet: alle handlinger kan nås, fokusrekkefølgen følger oppgaven, og fokus er tydelig. Fokus skal ikke forsvinne når en kontroll fjernes eller et steg erstattes. Brukeren skal kunne oppdage nye resultater uten å lete. Det skal ikke finnes tastaturfeller. Etter Escape skal fokus gå tilbake til en relevant kontroll.

WCAG 2.1: 2.1.1, 2.1.2, 2.4.3, 2.4.7. Kontroller særlig neste periode, avbrudd og nye stillingsresultater; automatiske overgangstester dekker ikke alle fokusdestinasjoner.

### M2 Skjermleser

Bruk VoiceOver med Safari på macOS og NVDA med Firefox eller Chrome på Windows. På mobil brukes VoiceOver med Safari og TalkBack med Chrome dersom utstyret er tilgjengelig. Noter kombinasjon og versjon, ikke bare «testet med skjermleser».

1. Finn hovedinnhold via landemerker og les overskriftslisten. Les status, periode og opplysninger i vanlig leserekkefølge.
2. Naviger til skjemaet. Lytt til gruppenavnet, hvert svar og den valgte verdien.
3. Send inn uten svar, og deretter med ett manglende svar. Lytt etter feilen og kontroller at den leses ved det aktuelle svaret.
4. Fullfør en bekreftelse og kontroller hvordan kvittering og neste periode oppdages. Test innsendingsfeil og prøv igjen.
5. Åpne filtre og utvid historikk. Kontroller at valgte kategorier, underkategorier og datoer gir mening.

Forventet: navn, rolle, verdi og kontekst annonseres forståelig. Feil og resultatendringer kommer frem uten leting eller dobbel opplesning. Dekorative ikoner skal ikke tilføre støy. Varsler må ikke avbryte lesingen unødvendig.

WCAG 2.1: 1.1.1, 1.3.1, 1.3.2, 2.4.6, 3.3.1, 3.3.3, 4.1.2, 4.1.3.

### M3 Zoom, reflow og tekstavstand

1. Bruk nettleserens zoom til 200 % og 400 %. Kontroller komplette sider med dekoratør, åpne menyer og feilmeldinger.
2. Kontroller 320 CSS-pikslers bredde. Prøv liggende og stående fysisk mobil.
3. Bruk et verktøy eller teststil som setter linjehøyde til 1,5, avsnittsavstand til 2, bokstavavstand til 0,12 og ordavstand til 0,16 ganger skriftstørrelsen.
4. Kontroller lange tekster og navn, knapper, chips, stillingskort og historikk. Bruk også OS-forstørrelse ved behov.

Forventet: informasjon og handlinger er synlige og brukbare. Ingen tekst er klipt eller overlapper annet innhold. Det skal ikke være nødvendig å scrolle i to retninger for vanlig tekstinnhold. Fravær av horisontalt overløp i testen beviser ikke dette alene.

WCAG 2.1: 1.4.4, 1.4.10, 1.4.12.

### M4 Kontrast og informasjon uten farge

1. Undersøk axe-resultater merket `incomplete`. Mål tekst over sammensatte bakgrunner med en kontrastmåler.
2. Mål fokusindikatorer, kontrollgrenser og meningsbærende ikoner. Test normal, hover, fokus, valgt og feiltilstand.
3. Kontroller siden i Windows høykontrast/forced colors. Sjekk at valgt side, valgt svar og status fortsatt kan identifiseres.

Forventet: vanlig tekst har minst 4,5:1 og stor tekst minst 3:1 etter WCAGs definisjon. Nødvendig ikke-tekstlig informasjon har minst 3:1 mot tilstøtende farge der kravet gjelder. Farge skal ikke være eneste måte å uttrykke status eller feil på.

WCAG 2.1: 1.4.1, 1.4.3, 1.4.11, 2.4.7. Vurder kriterienes unntak, blant annet for inaktive kontroller.

### M5 Språk og forståelige handlinger

1. Åpne hver språkvariant direkte og bytt språk via dekoratøren. Kontroller sidetittel, skjermleseruttale og at du blir på riktig app-side.
2. Les overskrifter, lenker, knapper, feil, tomtilstander og kvitteringer på alle språk.
3. Kontroller at synlig tekst og tilgjengelig navn samsvarer, særlig ikonknapper og fjernbare filtre.
4. Gå gjennom avslutning av arbeidssøkerperiode. Kontroller at konsekvensen forklares før endelig bekreftelse, og at avbrudd ikke sender svaret.

Forventet: teksten forklarer oppgaven, feilrettingen og konsekvensen. Lenker kan forstås i sin kontekst. Språkmarkeringen følger innholdet, også når enkelte deler har annet språk. Den synlige etiketten inngår i det tilgjengelige navnet når kravet gjelder.

WCAG 2.1: 2.4.4, 2.4.6, 2.5.3, 3.1.1, 3.1.2, 3.3.3 og 3.3.4 der handlingen omfattes.

### M6 Dekoratør, widgets og innloggingsøkt

1. Gjenta hopp-til-innhold og språkbytte på hovedside, historikk og bekreftelse. Kontroller neste Tab etter hoppet.
2. Test med samtykkebanner og menyer åpne, og med banneret lukket. Kontroller fokus og om appinnholdet skjules.
3. Test Skyra- og UX Signals-widgetene når de er aktive. Prøv tastatur, skjermleser og smal visning. De er ikke lastet i de isolerte sidehistoriene.
4. La en dev-innloggingsøkt utløpe mens skjemaet er åpnet. Kontroller varsel, mulighet til å forlenge der det gjelder, og hva som skjer med svarene.
5. Slå på redusert bevegelse i operativsystemet og kontroller overganger. Dette er en supplerende kontroll; ikke alle bevegelseskrav har AA-nivå.

Forventet: integrasjonen gir ikke tastaturfeller eller skjult innhold. Brukeren forstår øktutløp og kan komme videre. Tredjepartsfunn registreres separat med ansvarlig team. Appens ansvar for korrekt integrasjon forsvinner ikke fordi innholdet kommer fra en annen tjeneste.

WCAG 2.1: blant annet 2.1.1, 2.1.2, 2.2.1, 2.2.2 når relevant, 2.4.1 og 4.1.2. 2.3.3 Animasjon ved interaksjon er AAA og vurderes her som et tillegg.

### Tillegg fra WCAG 2.2 AA

- **2.4.11 Fokus ikke skjult (minimum).** Kontroller at fokuserte kontroller ikke er helt skjult av dekoratør, banner eller menyer. Smoke-testens måling ved hoppet dekker bare én situasjon.
- **2.5.8 Målstørrelse (minimum).** Mål berøringsmål og avstand mellom mål på mobil. 24 × 24 CSS-piksler er utgangspunktet, men kriteriet har unntak og alternative avstandsregler. Repoet har ikke en full automatisk målstørrelsekontroll.
- **3.2.6 Konsistent hjelp.** Sammenlign plassering av kontakt og hjelp på tvers av appens sider.
- **3.3.7 Overflødig inntasting.** Vurder om brukeren må gi samme informasjon på nytt i samme prosess uten grunn. Gjentatt spørsmål for en annen bekreftelsesperiode kan være en annen opplysning.
- **3.3.8 Tilgjengelig autentisering (minimum).** Kontroller den komplette dev-innloggingen. Appen endrer ikke ID-portens mekanisme i dette testoppsettet.
- **2.5.7 Dra-bevegelser.** Søk i denne gjennomgangen fant ingen egen dra-funksjon i appens TSX-filer. Vurder på nytt hvis en slik funksjon eller widget legges til.

## Dekningshull og vedlikehold

- Alle data-/togglekombinasjoner er ikke automatisert. Lokal `ENABLE_MOCK` slår alle toggles på; det er ikke en test av av-variantene. Sidehistoriene bruker kontrollerte innholdsvarianter, ikke serverens toggle-evaluering.
- Axe kan ikke avgjøre forståelighet, alle kontrastkombinasjoner, logisk leserekkefølge eller faktisk skjermleserannonsering.
- Chromium ved to bredder dekker ikke Safari, Firefox eller fysiske hjelpemidler. De inngår i den manuelle kontrollen.
- Helsidehistoriene undersøker sidevisning, ikke faktiske loading-ruter, error boundaries, 404-ruter eller alle streamingmellomtilstander.
- Nye stillingsresultater, neste periode og tilbakeføring av fokus etter alle avbrudd må inngå i manuell testing selv om enkelte overganger har automatiske assertions.
- Det er ikke funnet egne `<audio>`, `<video>`, `<canvas>` eller dra-handlere i appens TSX-filer i denne gjennomgangen. Medie- og drakriterier skal vurderes på nytt ved nye funksjoner og tredjepartsinnhold, ikke merkes permanent «ikke relevant».

Kjør de automatiske testene ved hver relevant endring. Gjenta berørte manuelle oppskrifter ved endringer i flyt, tekst, fokus, layout og dekoratørintegrasjon. Ved nye tilstander: legg til en story som stopper i tilstanden, og en interaksjonstest der det er relevant.

## Registrer manuelle resultater

Bruk én rad per oppskrift og tilstand. Ikke ta med fødselsnummer, tokens, testbrukerens identitet eller innloggingsinformasjon.

| Dato og commit | Miljø          | Side, språk og tilstand | Nettleser/hjelpemiddel med versjon | Oppskrift           | Resultat                      | Avvik, reproduksjon og ansvarlig |
| -------------- | -------------- | ----------------------- | ---------------------------------- | ------------------- | ----------------------------- | -------------------------------- |
| Fyll inn       | Lokal mock/dev | Fyll inn                | Fyll inn                           | M1–M6 / 2.2-tillegg | Bestått / avvik / ikke testet | Fyll inn                         |

Hvis et hjelpemiddel eller en tilstand ikke er testet, skriv «ikke testet». Et automatisert resultat skal ikke fylles inn som en bestått manuell skjermleserkontroll.

## Referanser

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C: Evaluating Web Accessibility](https://www.w3.org/WAI/test-evaluate/)
- [Nav-dekoratøren](https://github.com/navikt/nav-dekoratoren)
