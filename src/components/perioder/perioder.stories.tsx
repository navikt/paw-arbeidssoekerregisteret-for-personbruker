import { Meta } from '@storybook/nextjs';
import { Periode } from './periode';
import { ShowDetailsProvider } from '@/contexts/show-details-context';
import { Accordion } from '@navikt/ds-react';
import {
    createBekreftelseHendelse,
    createEgenvurderingHendelse,
    createOpplysningerHendelse,
    createPeriodeAvsluttetHendelse,
    createPeriodeStartetHendelse,
    createProfileringHendelse,
} from './__tests__/utils/hendelser';
import { OpplysningerHendelse, PeriodeAvsluttetHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';

const meta: Meta = {
    title: 'Komponenter/Perioder/Periode',
    component: Periode,
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
type Story = typeof meta;

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
    parameters: {
        docs: {
            description: {
                story: 'Viser en periode hvor bruker har bekreftet at de fortsatt er arbeidssøker.',
            },
        },
    },
};
