import type { OpplysningerHendelse, PeriodeAvsluttetHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent } from 'storybook/test';
import { ShowDetailsProvider } from '@/contexts/show-details-context';
import {
    createBekreftelseHendelse,
    createEgenvurderingHendelse,
    createOpplysningerHendelse,
    createPeriodeAvsluttetHendelse,
    createPeriodeStartetHendelse,
    createProfileringHendelse,
} from './__tests__/utils/hendelser';
import { Periode } from './periode';
import { Perioder } from './perioder';
import { VisDetaljerToggle } from './vis-detaljer-toggle';

const meta: Meta = {
    title: 'Komponenter/Perioder/Periode',
    component: Periode,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Viser en enkelt arbeidssøkerperiode med alle tilhørende hendelser i en utvidbar accordion.',
            },
        },
    },
    argTypes: {
        sprak: {
            control: 'select',
            options: ['nb', 'nn', 'en'],
            description: 'Hvilket språk komponenten skal vises på',
        },
    },
    decorators: [
        (Story) => (
            <ShowDetailsProvider>
                <Accordion>
                    <Accordion.Item defaultOpen>
                        <Accordion.Header>Demo periode</Accordion.Header>
                        <Story />
                    </Accordion.Item>
                </Accordion>
            </ShowDetailsProvider>
        ),
    ],
} satisfies Meta<typeof Periode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PeriodeStartet: Story = {
    args: {
        sprak: 'nb',
        opplysningerUtfoertAvType: 'SLUTTBRUKER',
        visEgenvurdering: true,
    },
    argTypes: {
        opplysningerUtfoertAvType: {
            control: 'select',
            options: ['VEILEDER', 'SLUTTBRUKER'],
            description: 'Velg hvem som startet perioden',
        },
        visEgenvurdering: {
            control: 'boolean',
            description: 'Vis eller skjul egenvurdering',
        },
    },
    render: (args) => {
        const opplysningerId = 'opplysningerid-123';
        const profileringsId = 'profileringsid-123';

        const hendelser = [
            createPeriodeStartetHendelse(),
            createOpplysningerHendelse(undefined, opplysningerId),
            createProfileringHendelse(undefined, profileringsId, opplysningerId),
        ];

        if (args.visEgenvurdering) {
            hendelser.push(createEgenvurderingHendelse(undefined, profileringsId, 'ANTATT_GODE_MULIGHETER'));
        }

        const opplysningerHendelse = hendelser[0] as OpplysningerHendelse;
        if (args.opplysningerUtfoertAvType && opplysningerHendelse) {
            hendelser[0] = {
                ...opplysningerHendelse,
                sendtInnAv: {
                    ...opplysningerHendelse.sendtInnAv,
                    utfoertAv: {
                        ...opplysningerHendelse.sendtInnAv.utfoertAv,
                        type: args.opplysningerUtfoertAvType,
                    },
                },
            };
        }
        return <Periode hendelser={hendelser} sprak={args.sprak} />;
    },
    parameters: {
        docs: {
            description: {
                story: 'Viser en standard periode hvor bruker har registrert seg og sendt inn opplysninger. PERIODE_STARTET og OPPLYSNINGER vises sammen som én hendelse.',
            },
        },
    },
};

export const Avsluttet: Story = {
    args: {
        sprak: 'nb',
        aarsak: '[bekreftelse] ikke levert innen fristen',
    },
    argTypes: {
        aarsak: {
            control: 'select',
            options: [
                'fortsatt aktiv',
                'graceperiode utløpt',
                'stopp av periode',
                'feilregistrering',
                "svarte nei på spørsmål 'vil du fortsatt være registrert som arbeidssøker?'",
                'personen er ikke bosatt etter folkeregisterloven',
                'avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven',
                'er registrert som død, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven',
                'personen er doed',
                'er registrert som død',
                'iserv',
                'overføring',
                'har ugyldig/annullert identitet, kunne ikke fastslå alder, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven',
                '[bekreftelse] ikke levert innen fristen',
                '[bekreftelse] ønsket ikke lenger å være arbeidssøker',
            ],
            description: 'Velg årsak til avslutning av periode',
        },
    },
    render: (args) => {
        const hendelse = createPeriodeAvsluttetHendelse() as PeriodeAvsluttetHendelse;

        const hendelser = [
            {
                ...hendelse,
                sendtInnAv: {
                    ...hendelse.sendtInnAv,
                    aarsak: args.aarsak,
                },
            },
        ];

        return <Periode hendelser={hendelser} sprak={args.sprak} />;
    },
    parameters: {
        docs: {
            description: {
                story: 'Viser en avsluttet periode med sluttårsak',
            },
        },
    },
};

export const MedBekreftelse: Story = {
    args: {
        hendelser: [createBekreftelseHendelse('2025-01-15T10:00:00Z')],
        sprak: 'nb',
    },
    play: async ({ canvas }) => {
        const periodeTittel = canvas.getByRole('heading', { level: 2, name: /Gjelder fra.*til/ });
        await expect(periodeTittel).toHaveTextContent(/Gjelder fra .+ til .+/);

        const bekreftelsesListe = periodeTittel.parentElement?.querySelector('dl');
        if (!bekreftelsesListe) {
            throw new Error('Fant ikke bekreftelseslisten under periodetittelen');
        }

        await expect(Array.from(bekreftelsesListe.querySelectorAll('dt'), (term) => term.textContent)).toEqual([
            'Har jobbet',
            'Vil fortsette være søker',
        ]);
        await expect(Array.from(bekreftelsesListe.querySelectorAll('dd'), (svar) => svar.textContent)).toEqual([
            'Nei',
            'Ja',
        ]);
    },
    parameters: {
        docs: {
            description: {
                story: 'Viser en periode hvor bruker har bekreftet at de fortsatt er arbeidssøker.',
            },
        },
    },
};

export const MedOpplysninger: Story = {
    args: {
        hendelser: [createOpplysningerHendelse()],
        sprak: 'nb',
    },
    parameters: {
        docs: {
            description: {
                story: 'Viser opplysninger innsendt',
            },
        },
    },
};

export const HistorikkTastatur: Story = {
    args: {
        sprak: 'nb',
        hendelser: [],
    },
    render: () => {
        const perioder = [
            {
                periodeId: 'periode-tastatur',
                identitetsnummer: 'test-ident',
                startet: '2025-01-01T10:00:00Z',
                hendelser: [createPeriodeStartetHendelse(), createOpplysningerHendelse()],
            },
        ];

        return (
            <ShowDetailsProvider>
                <VisDetaljerToggle sprak="nb" />
                <Perioder perioder={perioder} sprak="nb" />
            </ShowDetailsProvider>
        );
    },
    play: async ({ canvas }) => {
        const toggle = canvas.getByRole('checkbox', { name: 'Vis detaljer' });
        await toggle.focus();
        await expect(toggle).toHaveFocus();
        await userEvent.keyboard(' ');
        await expect(toggle).not.toBeChecked();

        const periodHeader = canvas.getByRole('button', { name: /1\. januar 2025/ });
        await periodHeader.focus();
        await userEvent.keyboard('{Enter}');
        await expect(periodHeader).toHaveAttribute('aria-expanded', 'true');

        await toggle.focus();
        await userEvent.keyboard(' ');
        await expect(toggle).toBeChecked();
    },
};
