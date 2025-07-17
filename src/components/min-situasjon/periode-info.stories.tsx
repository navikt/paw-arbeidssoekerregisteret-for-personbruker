import { Meta, StoryObj } from '@storybook/nextjs';

import PeriodeInfo from './periode-info';
import { aggregertePerioderMockData } from '@/app/mockdata';
import { AggregertePerioder } from '@navikt/arbeidssokerregisteret-utils';

const aggregertePerioder = aggregertePerioderMockData.slice(0, 1) as AggregertePerioder;

const avsluttetPeriode = JSON.parse(JSON.stringify(aggregertePerioder));

// Avslutter arbeidssøkerperioden
avsluttetPeriode[0].avsluttet = {
    tidspunkt: '2021-10-31T11:22:33.444Z',
    utfoertAv: {
        type: 'UKJENT_VERDI',
        id: '12345678910',
    },
    kilde: 'string',
    aarsak: '[Bekreftelse] Ønsket ikke lenger å være arbeidssøker',
    tidspunktFraKilde: {
        tidspunkt: '2021-10-31T11:20:33.444Z',
        avviksType: 'UKJENT_VERDI',
    },
};

const meta = {
    title: 'Komponenter/PeriodeInfo',
    component: PeriodeInfo,
    decorators: [],
    args: {},
    tags: ['autodocs'],
} satisfies Meta<typeof PeriodeInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Registrert: Story = {
    args: {
        sprak: 'nb',
        aggregertePerioder,
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
