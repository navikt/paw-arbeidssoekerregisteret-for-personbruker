# AGENTS.md

Veiledning for AI-agenter som jobber i dette repoet.

## Prosjektbeskrivelse

`paw-arbeidssoekerregisteret-for-personbruker` er en Next.js-applikasjon som lar innbyggere se og administrere egne opplysninger i Navs arbeidssøkerregister.
Appen tilhører Team PAW og kjører på NAIS-plattformen (GCP/Kubernetes).

- **Demo (dev)**: https://www.ansatt.dev.nav.no/arbeidssoekerregisteret
- **Slack**: `#team-paw-dev`

---

## Kom i gang

### Forutsetninger

- **Node.js 24** – bruk `nvm use` dersom du har nvm
- **pnpm** – bruk alltid pnpm, aldri npm eller yarn
- **GitHub PAT** med `read:packages`-scope, konfigurert med SSO mot navikt

```bash
npm login --registry https://npm.pkg.github.com
# bruk GitHub-brukernavn + PAT som passord
```

### Installasjon og kjøring

```bash
pnpm i
pnpm run dev        # starter dev-server på http://localhost:3000
```

For å nå reelle dev-endepunkter (utenom mock-modus) kreves [naisdevice](https://doc.nais.io/device/).

---

## Bygg og test

```bash
pnpm test:ci        # lint + vitest (kjøres i CI)
pnpm lint           # ESLint
pnpm build          # Next.js produksjonsbygg
pnpm run storybook  # start Storybook på http://localhost:6006
pnpm build-storybook
```

**Alltid kjør `pnpm test:ci` etter endringer** – dette inkluderer lint og alle enhetstester.

### Testoppsett

- **Vitest** + **React Testing Library** + **jsdom** for enhetstester
- Testfiler plasseres ved siden av kildefilen med suffikset `.test.ts` / `.test.tsx`
- Setup-fil: `setup-tests.ts` i rotkatalogen
- **MSW** brukes for API-mocking i tester og i lokal utvikling

---

## Kodestruktur

```
src/
  app/            – Next.js App Router: sider, layouts, server actions og API-ruter
    api/          – Next.js Route Handlers (bekreftelse, brukerprofil, egenvurdering, unleash, isalive, isready)
    actions.ts    – Server actions
    layout.tsx    – Root layout (decorator, Faro, feature toggles)
    page.tsx      – Hovedside
    bekreftelse/  – Bekreftelseflyt (side + actions)
    historikk/    – Historikkvisning
    brukerprofil-api.ts
  components/     – React-komponenter, feature-organisert
  lib/            – Utility-funksjoner og hjelpere (rene funksjoner, testbare)
  contexts/       – React context (FeatureTogglesContext)
  mocks/          – MSW mock handlers for lokal utvikling og testing
  model/          – TypeScript-typer og modeller
  unleash-keys.ts – Unleash feature toggle-nøkler

.nais/
  dev-gcp/        – NAIS-konfig for dev-miljø
  prod-gcp/       – NAIS-konfig for produksjonsmiljø

.github/
  workflows/      – GitHub Actions (bygg, test, deploy)

types/            – Globale TypeScript-typer (f.eks. NextPageProps)
```

---

## Konvensjoner

### Språk

- **Norsk bokmål** i kode: variabelnavn, funksjonsnavn, komponentnavn og filnavn følger norske ord (f.eks. `fetchTilgjengeligeBekreftelser`, `hentInnloggingsNivaa`, `perioder`)
- Engelske tekniske termer beholdes der de er etablerte (f.eks. `fetch`, `router`, `layout`)

### Importalias

Bruk `@/`-aliaset for imports fra `src/`:

```ts
import { isEnabled } from '@/lib/unleash-is-enabled';
import Feil from '@/components/feil';
```

### Formattering (Prettier)

```json
{
    "printWidth": 120,
    "singleQuote": true,
    "tabWidth": 4
}
```

Prettier kjøres automatisk via lint-staged på commit. Bruk konfigurasjonsverdiene over ved manuell formattering.

### Pakkemanager

Bruk alltid **pnpm**. Ikke generer `package-lock.json` eller `yarn.lock`.

### Komponenter

- Funksjonelle React-komponenter med TypeScript
- Server Components som standard (Next.js App Router); marker med `'use client'` kun ved behov
- Props-typer defineres som `interface` i samme fil
- **Ingen egne UI-primitiver** — bruk alltid Aksel: `Button`, `RadioGroup`, `LocalAlert`, `Heading`, `BodyLong`, `StepIndicator`, osv.
- **Spacing via Aksel-tokens** — `Box` med `padding="space-*"`, aldri Tailwind `p-*`/`m-*`
- **Eksakte versjoner** — `package.json` bruker alltid eksakt versjon (`"react": "19.2.5"`, aldri `"^19"`)
- **TDD for logikk** — beslutningstreet skal ha Vitest-tester _før_ implementasjon
- **Storybook for komponenter** — alle komponenter får en Story; komponenter er pure (props inn, UI ut)
- **a11y er obligatorisk** — offentlig tjeneste; bruk Aksel, korrekt heading-hierarki, tastaturnavigasjon

### Aksel v8 — kritiske regler

- `space-16` = 16px (token-navn er pikselverdier direkte, ikke Tailwind-skala)
- Bruk **ikke** `Alert` — bruk `LocalAlert`, `GlobalAlert`, `InlineMessage` eller `InfoCard`
- Bruk **ikke** `borderRadius="large"` — bruk `"4"`, `"8"`, `"12"`, `"full"`
- `gap` krever alltid `space-`-prefiks: `gap="space-16"`, aldri `gap="4"` eller `gap={4}`
- `VStack`/`HStack` har **ikke** `padding`-prop — wrap i `Box`
- Ikke overstyr `--ax-*`-tokens eller `.aksel-*`-klasser

---

## Autentisering og sikkerhet

### IDporten

Appen krever innlogging via IDporten (Level3). NAIS-sidecar håndterer autentisering automatisk i kjørende miljø. Følgende stier er unntatt autologin:

- `/arbeidssoekerregisteret/api/isalive`
- `/arbeidssoekerregisteret/api/isready`
- `/arbeidssoekerregisteret/storybook/**`

### TokenX

Alle kall til backend-APIer bruker **TokenX** for token exchange. `@navikt/oasis` håndterer dette.

### Mock-modus (lokal utvikling)

I `.env.development` er mock aktivert som standard:

```
ENABLE_MOCK=enabled
NEXT_PUBLIC_ENABLE_MOCK=enabled
```

MSW-handlere i `src/mocks/` returnerer testdata uten at reelle API-er kalles. Legg til nye mock-handlere her ved behov.

---

## Feature toggles (Unleash)

Feature-nøkler defineres i `src/unleash-keys.ts`. Sjekk status server-side med `isEnabled()` fra `src/lib/unleash-is-enabled.ts`.

Client-side toggles hentes via `FeatureTogglesContext` som initialiseres i `layout.tsx`.

API-ruten `/api/unleash` eksponerer togglestatus til klienten.

---

## Backend-APIer

Alle API-kall proxies gjennom Next.js Route Handlers med TokenX-autentisering.

| Miljøvariabel                             | Tjeneste                       |
| ----------------------------------------- | ------------------------------ |
| `ARBEIDSSOEKERREGISTERET_OPPSLAG_API_URL` | Oppslag (v1)                   |
| `OPPSLAG_API_V2_URL`                      | Oppslag (v2)                   |
| `BEKREFTELSE_API_URL`                     | Bekreftelse                    |
| `EGENVURDERING_API_URL`                   | Egenvurdering                  |
| `BRUKERPROFIL_API_URL`                    | Brukerprofil / mine stillinger |
| `UNLEASH_SERVER_API_URL`                  | Unleash feature toggles        |

---

## Deploy og miljøer

### Branching

- `main` → deployes til **dev** og **prod**
- `dev/*` → deployes **kun til dev**

```bash
git checkout -b dev/<navn>
```

### CI/CD (GitHub Actions)

1. **test** – kjører `pnpm test:ci` og Knip (ubrukt kode)
2. **build** – bygger Docker-image og laster opp statiske assets til CDN
3. **deploy-dev** / **deploy-prod** – deployer til NAIS via `nais/deploy`

### CDN

Statiske Next.js-assets (`_next/static`) lastes opp til:
`https://cdn.nav.no/paw/arbeidssoekerregisteret/_next`

Satt via `NEXT_PUBLIC_ASSET_PREFIX` i bygget.

### Testbrukere

Testbrukere importeres fra Test-Norge via [Dolly](https://dolly.ekstern.dev.nav.no/).

---

## Observabilitet

- **Grafana Faro** for frontend-telemetri (initialisert i `InitFaroKomponent`)
- **OpenTelemetry** via NAIS auto-instrumentering (nodejs runtime)
- Health-endepunkter: `/api/isalive` og `/api/isready`

---

## Viktige NAV-pakker

| Pakke                                    | Bruk                                                       |
| ---------------------------------------- | ---------------------------------------------------------- |
| `@navikt/ds-react`                       | Aksel Design System – bruk disse komponentene fremfor egne |
| `@navikt/ds-css` / `@navikt/ds-tailwind` | Stiler                                                     |
| `@navikt/aksel-icons`                    | Ikoner                                                     |
| `@navikt/arbeidssokerregisteret-utils`   | Domene-utils, `lagHentTekstForSprak`, `Sprak`-type         |
| `@navikt/oasis`                          | TokenX token exchange                                      |
| `@navikt/next-logger`                    | Strukturert logging                                        |
| `@navikt/nav-dekoratoren-moduler`        | NAV-headeren og -footeren                                  |
| `@unleash/nextjs`                        | Unleash feature toggles                                    |

## Spesialistagenter

Bruk disse via `@agent-name` i Copilot Chat for domene-spesifikk hjelp:

| Agent                      | Bruk til                                                   |
| -------------------------- | ---------------------------------------------------------- |
| `@aksel-agent`             | Aksel Design System, komponenter, tokens, layout, Figma    |
| `@accessibility-agent`     | WCAG 2.1/2.2, universell utforming, UU-testing             |
| `@auth-agent`              | Azure AD, TokenX, ID-porten, Maskinporten, JWT             |
| `@nais-agent`              | Nais-deployment, GCP-ressurser, kubectl-feilsøking         |
| `@kafka-agent`             | Rapids & Rivers, eventdrevet arkitektur, schema-design     |
| `@observability-agent`     | Prometheus, OpenTelemetry, Grafana, varsling               |
| `@security-champion-agent` | Trusselmodellering, compliance, sikkerhetsvurderinger      |
| `@code-review-agent`       | Kodegjennomgang, Nav-konvensjoner, sikkerhetsfunn          |
| `@forfatter`               | Norsk klarspråk, mikrotekst, teknisk redigering            |
| `@research-agent`          | Utforsk kodebaser, samle kontekst før implementering       |
| `@nav-pilot`               | Planlegging og arkitektur for nye features eller endringer |

## Skills

Bruk disse i Copilot Chat med `#skill-name` eller via skill-menyen:

| Skill                 | Bruk til                                                         |
| --------------------- | ---------------------------------------------------------------- |
| `aksel-spacing`       | Responsive layouts, spacing-tokens, Box/HStack/VStack/HGrid/Page |
| `conventional-commit` | Generer conventional commit-meldinger med Nav-scopes             |
| `web-design-reviewer` | Visuell inspeksjon — finn og fiks designproblemer i kildekoden   |
