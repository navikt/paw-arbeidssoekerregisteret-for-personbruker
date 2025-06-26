import { Meta, StoryObj } from '@storybook/react';
import RegistrertTittel from './registrert-tittel';
import { aggregertePerioderMockData } from '@/app/mockdata';
import { AggregertePerioder } from '../../../types/aggregerte-perioder';

const aggregertePerioder = aggregertePerioderMockData.slice(0, 1) as AggregertePerioder;
const avsluttetPeriode = JSON.parse(JSON.stringify(aggregertePerioder));

const { opplysningerOmArbeidssoeker } = aggregertePerioder[0];
const permittertOpplysninger = JSON.parse(JSON.stringify(opplysningerOmArbeidssoeker));

// Legger til permittert situasjon
permittertOpplysninger[0].jobbsituasjon = [{ beskrivelse: 'ER_PERMITTERT' }];
const permmitertPeriode = [
    {
        ...aggregertePerioder[0],
        opplysningerOmArbeidssoeker: permittertOpplysninger,
    },
];
// Avslutter arbeidssøkerperioden
avsluttetPeriode[0].avsluttet = {
    tidspunkt: '2021-10-31T11:22:33.444Z',
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
        aggregertePerioder,
    },
};

export const RegistrertPermittert: Story = {
    args: {
        sprak: 'nb',
        aggregertePerioder: permmitertPeriode,
    },
};

export const IkkeLengerRegistrert: Story = {
    args: {
        sprak: 'nb',
        aggregertePerioder: avsluttetPeriode,
    },
};

export const IkkeRegistrert: Story = {
    args: {
        sprak: 'nb',
        aggregertePerioder: [],
    },
};
