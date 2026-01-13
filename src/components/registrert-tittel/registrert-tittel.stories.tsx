import { Meta, StoryObj } from '@storybook/nextjs';
import RegistrertTittel from './registrert-tittel';
import { snapshotMock } from '@/app/mockdata';

const snapshot = snapshotMock;
const avsluttetPeriode = JSON.parse(JSON.stringify(snapshot));

const { opplysning } = snapshot;
const permittertOpplysninger = JSON.parse(JSON.stringify(opplysning));

// Legger til permittert situasjon
permittertOpplysninger.jobbsituasjon.beskrivelser = [{ beskrivelse: 'ER_PERMITTERT' }];
const permmitertPeriode = {
    ...snapshot,
    opplysning: permittertOpplysninger,
};
// Avslutter arbeidssøkerperioden
avsluttetPeriode.avsluttet = {
    tidspunkt: '2021-10-31T11:22:33.444Z',
    sendtInnAv: {
        utfoertAv: {
            type: 'UKJENT_VERDI',
            id: '12345678910',
        },
        kilde: 'string',
        aarsak: 'string',
        tidspunktFraKilde: {
            tidspunkt: '2021-10-31T11:20:33.444Z',
            avviksType: 'UKJENT_VERDI',
        },
    },
};

const meta = {
    title: 'Komponenter/RegistrertTittel',
    component: RegistrertTittel,
    decorators: [],
    args: {},
    tags: ['autodocs'],
} satisfies Meta<typeof RegistrertTittel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Registrert: Story = {
    args: {
        sprak: 'nb',
        snapshot,
    },
};

export const RegistrertPermittert: Story = {
    args: {
        sprak: 'nb',
        snapshot: permmitertPeriode,
    },
};

export const IkkeLengerRegistrert: Story = {
    args: {
        sprak: 'nb',
        snapshot: avsluttetPeriode,
    },
};

export const IkkeRegistrert: Story = {
    args: {
        sprak: 'nb',
        snapshot: undefined,
    },
};
