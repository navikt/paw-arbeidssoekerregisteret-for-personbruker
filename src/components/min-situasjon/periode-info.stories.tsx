import { Meta, StoryObj } from '@storybook/nextjs';

import PeriodeInfo from './periode-info';
import { snapshotMock } from '@/app/mockdata';

const snapshot = snapshotMock;
const avsluttetPeriode = {
    ...snapshot,
    avsluttet: {
        tidspunkt: '2021-10-31T11:22:33.444Z',
        sendtInnAv: {
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
        },
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
        snapshot,
    },
};

export const IkkeLengerRegistrert: Story = {
    args: {
        sprak: 'nb',
        snapshot: avsluttetPeriode as any,
    },
};

export const IkkeRegistrert: Story = {
    args: {
        sprak: 'nb',
        snapshot: undefined,
    },
};
