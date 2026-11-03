import { type Profilering, ProfilertTil, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useReducer } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { snapshotMock } from '@/app/mockdata';
import { TilgjengeligBekreftelseLink } from '@/components/bekreftelse/tilgjengelig-bekreftelse-link';
import EgenvurderingStateless from '@/components/egenvurdering/egenvurdering-stateless';
import Feil from '@/components/feil';
import { initialStyrkState, reducer } from '@/components/styrkloft/reducer';
import StyrkLoft from '@/components/styrkloft/styrk-loft';
import type { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import { HovedsideInnhold, HovedsideRamme } from './hovedside';

interface HovedsideStoryProps {
    sprak: Sprak;
    snapshot?: Snapshot;
    innloggingsNivaa: string;
    error?: string;
    loading?: boolean;
    onEgenvurderingSubmit(
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING | null,
    ): void;
}

const tilgjengeligeBekreftelser = [
    {
        gjelderFra: '2026-10-01',
        gjelderTil: '2026-10-15',
        bekreftelseId: 'demo-bekreftelse',
        periodeId: 'demo-periode',
    },
];

const profilering: Profilering = {
    profileringId: 'demo-profilering',
    periodeId: 'demo-periode',
    opplysningerOmArbeidssoekerId: 'demo-opplysninger',
    sendtInnAv: {
        tidspunkt: '2026-10-01T10:00:00.000Z',
        utfoertAv: { type: 'UKJENT_VERDI' },
        kilde: 'storybook',
        aarsak: 'syntetiske data',
    },
    profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
    jobbetSammenhengendeSeksAvTolvSisteManeder: true,
    alder: 42,
};

function StyrkLoftMedStatiskData({ sprak }: { sprak: Sprak }) {
    const brukerprofil: Brukerprofil = {
        identitetsnummer: 'syntetisk-testbruker',
        tjenestestatus: 'INAKTIV',
    };
    const [state, dispatch] = useReducer(reducer, brukerprofil, initialStyrkState);

    return (
        <StyrkLoft
            sprak={sprak}
            state={state}
            dispatch={dispatch}
            onSubmitTjenestestatus={async (_status: Tjenestestatus) => {}}
            onSubmitStillingsSoek={async () => {}}
            useOnFetchStillinger={() => ({
                data: {
                    soek: { fylker: [], styrk08: [] },
                    resultat: [],
                },
            })}
        />
    );
}

function HovedsideStory({
    sprak,
    snapshot,
    innloggingsNivaa,
    error,
    loading,
    onEgenvurderingSubmit,
}: HovedsideStoryProps) {
    return (
        <main id="maincontent" tabIndex={-1}>
            <HovedsideRamme>
                <HovedsideInnhold
                    sprak={sprak}
                    snapshot={snapshot}
                    innloggingsNivaa={innloggingsNivaa}
                    registrerArbeidssokerUrl="https://www.nav.no/arbeidssoker/registrer"
                    oppdaterOpplysningerUrl="https://www.nav.no/arbeidssoker/oppdater-opplysninger"
                    bekreftelse={
                        <TilgjengeligBekreftelseLink
                            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
                            sprak={sprak}
                        />
                    }
                    egenvurdering={
                        <div className="my-4">
                            <EgenvurderingStateless
                                sprak={sprak}
                                profilering={profilering}
                                pendingRequest={null}
                                visFeilmelding={false}
                                onSubmit={async (svar) => onEgenvurderingSubmit(svar)}
                            />
                        </div>
                    }
                    styrk={<StyrkLoftMedStatiskData sprak={sprak} />}
                    error={
                        error ? (
                            <div className="mb-6">
                                <Feil sprak={sprak} error={error} />
                            </div>
                        ) : undefined
                    }
                    loading={loading}
                />
            </HovedsideRamme>
        </main>
    );
}

const meta = {
    title: 'Sider/Hovedside',
    component: HovedsideStory,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
        snapshot: snapshotMock,
        innloggingsNivaa: 'idporten-loa-high',
        onEgenvurderingSubmit: fn(),
    },
    parameters: {
        uu: { helSide: true },
        a11y: {
            config: {
                rules: [{ id: 'region', enabled: true }],
            },
        },
        docs: {
            description: {
                component:
                    'Fullsidevisning med syntetiske data og ekte sidekomponenter. Storybook tester rendret innhold og interaksjoner, ikke Next.js SSR, ruting, serverdata eller dekoratørintegrasjon.',
            },
        },
    },
} satisfies Meta<typeof HovedsideStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AktivBokmal: Story = {
    play: async ({ canvas, args }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Jeg klarer meg uten hjelp' }));
        await expect(args.onEgenvurderingSubmit).toHaveBeenCalledWith(ProfilertTil.ANTATT_GODE_MULIGHETER);
    },
};

export const AktivNynorsk: Story = {
    args: { sprak: 'nn' },
};

export const AktivEngelsk: Story = {
    args: { sprak: 'en' },
};

export const AvsluttetPeriode: Story = {
    args: {
        snapshot: {
            ...snapshotMock,
            avsluttet: {
                tidspunkt: '2026-10-15T10:00:00.000Z',
                sendtInnAv: { aarsak: 'stopp av periode' },
            },
        } as Snapshot,
    },
};

export const IngenPeriode: Story = {
    args: { snapshot: undefined },
};

export const ManglerOpplysninger: Story = {
    args: { snapshot: { ...snapshotMock, opplysning: undefined } },
};

export const LavtInnloggingsNivaa: Story = {
    args: { innloggingsNivaa: 'idporten-loa-substantial' },
};

export const Sidefeil: Story = {
    args: { error: 'Snapshotdata er ikke tilgjengelig.' },
};

export const Laster: Story = {
    args: { loading: true },
};
