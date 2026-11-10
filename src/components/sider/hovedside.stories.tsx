import { type Profilering, ProfilertTil, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useReducer } from 'react';
import { expect, fn, screen, userEvent } from 'storybook/test';
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
    styrkLoftAktivt?: boolean;
    onEgenvurderingSubmit(
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING | null,
    ): void;
    onSubmitStillingsSoek(data: {
        fylker: string[];
        yrkeskategorier: string[];
        visStillingerUtenKrav: boolean;
    }): Promise<void>;
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

function StyrkLoftMedStatiskData({
    sprak,
    aktivt,
    onSubmitStillingsSoek,
}: {
    sprak: Sprak;
    aktivt: boolean;
    onSubmitStillingsSoek(data: {
        fylker: string[];
        yrkeskategorier: string[];
        visStillingerUtenKrav: boolean;
    }): Promise<void>;
}) {
    const brukerprofil: Brukerprofil = {
        identitetsnummer: 'syntetisk-testbruker',
        tjenestestatus: aktivt ? 'AKTIV' : 'INAKTIV',
        ...(aktivt ? { stillingssoek: [] } : {}),
    };
    const [state, dispatch] = useReducer(reducer, brukerprofil, initialStyrkState);

    return (
        <StyrkLoft
            sprak={sprak}
            state={state}
            dispatch={dispatch}
            onSubmitTjenestestatus={async (_status: Tjenestestatus) => {}}
            onSubmitStillingsSoek={onSubmitStillingsSoek}
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
    styrkLoftAktivt = false,
    onEgenvurderingSubmit,
    onSubmitStillingsSoek,
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
                    styrk={
                        <StyrkLoftMedStatiskData
                            sprak={sprak}
                            aktivt={styrkLoftAktivt}
                            onSubmitStillingsSoek={onSubmitStillingsSoek}
                        />
                    }
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
        onSubmitStillingsSoek: fn(),
    },
    parameters: {
        uu: { helSide: true },
        a11y: {
            config: {
                // Storybook replaces rules arrays instead of merging them with preview parameters.
                rules: [
                    { id: 'region', enabled: true },
                    { id: 'target-size', enabled: true },
                ],
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

export const FilterAapent: Story = {
    args: { styrkLoftAktivt: true },
};

async function tabUntilFocused(element: HTMLElement) {
    for (let i = 0; i < 80 && document.activeElement !== element; i++) {
        await userEvent.tab();
    }

    await expect(document.activeElement).toBe(element);
}

async function keyboardUntilMenuItemFocused(element: HTMLElement, direction: 'ArrowDown' | 'ArrowUp') {
    for (let i = 0; i < 80 && document.activeElement !== element; i++) {
        const menu = screen.queryByRole('menu');
        if (menu?.contains(document.activeElement)) {
            await userEvent.keyboard(`{${direction}}`);
        } else {
            await userEvent.tab();
        }
    }

    await expect(document.activeElement).toBe(element);
}

export const TastaturStyrkLoft: Story = {
    play: async ({ canvas, args }) => {
        const aktiverKnapp = canvas.getByRole('button', { name: 'Vis meg ledige stillinger' });
        await tabUntilFocused(aktiverKnapp);
        await userEvent.keyboard('{Enter}');

        const yrkeTrigger = await canvas.findByRole('button', { name: 'Velg yrkeskategori' });
        await tabUntilFocused(yrkeTrigger);
        await userEvent.keyboard('{Enter}');
        const itKategori = screen.getByRole('menuitemcheckbox', { name: 'IT' });
        await keyboardUntilMenuItemFocused(itKategori, 'ArrowDown');
        await userEvent.keyboard('{Enter}');
        const velgAlleYrker = screen.getByRole('menuitemcheckbox', { name: 'Velg alle' });
        await keyboardUntilMenuItemFocused(velgAlleYrker, 'ArrowUp');
        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard('{Escape}');

        const omraadeTrigger = canvas.getByRole('button', { name: 'Velg område' });
        await tabUntilFocused(omraadeTrigger);
        await userEvent.keyboard('{Enter}');
        const osloOmraade = screen.getByRole('menuitemcheckbox', { name: 'Oslo' });
        await keyboardUntilMenuItemFocused(osloOmraade, 'ArrowDown');
        await userEvent.keyboard('{Enter}');
        const velgAlleOmraader = screen.getByRole('menuitemcheckbox', { name: 'Velg alle' });
        await keyboardUntilMenuItemFocused(velgAlleOmraader, 'ArrowUp');
        await userEvent.keyboard('{Enter}');
        await userEvent.keyboard('{Escape}');

        const lagreKnapp = canvas.getByRole('button', { name: 'Lagre og vis stillinger' });
        await tabUntilFocused(lagreKnapp);
        await userEvent.keyboard('{Enter}');

        await expect(args.onSubmitStillingsSoek).toHaveBeenCalledWith(
            expect.objectContaining({
                fylker: expect.arrayContaining(['Oslo']),
                yrkeskategorier: expect.arrayContaining(['Ledere av IKT-enheter']),
            }),
        );
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
