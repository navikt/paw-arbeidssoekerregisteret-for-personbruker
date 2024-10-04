import { Meta, StoryObj } from '@storybook/react';

import OpplysningerOmArbeidssokerKomponent from './opplysninger-om-arbeidssoker-komponent';
import { samletInformasjonMockData, behovsvurderingMockData } from '@/app/mockdata';

const opplysningerOmArbeidssoker = samletInformasjonMockData.opplysningerOmArbeidssoeker
const arbeidssokerperioderMock = samletInformasjonMockData.arbeidssoekerperioder

const meta = {
    title: 'Komponenter/OpplysningerOmArbeidssoker',
    component: OpplysningerOmArbeidssokerKomponent,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof OpplysningerOmArbeidssokerKomponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpplysningerOmArbeidssoker: Story = {
    args: {
        opplysninger: opplysningerOmArbeidssoker[0] as any,
        sprak: 'nb',
        behovsvurdering: behovsvurderingMockData,
        harAktivPeriode: arbeidssokerperioderMock[0].avsluttet === null,
    },
};
