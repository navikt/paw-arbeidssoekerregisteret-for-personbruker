import { Meta, StoryObj } from '@storybook/react';
import { InnsynLesMer } from './innsyn';
import { samletInformasjonMockData, behovsvurderingMockData } from '@/app/mockdata';

const opplysningerOmArbeidssoker = samletInformasjonMockData.opplysningerOmArbeidssoeker
const arbeidssokerperioderMock = samletInformasjonMockData.arbeidssoekerperioder

const meta = {
    title: 'Komponenter/OpplysningerInnsyn',
    component: InnsynLesMer,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof InnsynLesMer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InnsynKomponent: Story = {
    args: {
        opplysninger: opplysningerOmArbeidssoker[0] as any,
        sprak: 'nb',
        behovsvurdering: behovsvurderingMockData,
        harAktivPeriode: arbeidssokerperioderMock[0].avsluttet === null,
    },
};
