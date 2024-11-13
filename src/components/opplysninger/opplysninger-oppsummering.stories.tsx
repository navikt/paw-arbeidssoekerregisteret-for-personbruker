import { Meta, StoryObj } from '@storybook/react';
import { behovsvurderingMockData, samletInformasjonMockData } from '@/app/mockdata';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';

const opplysningerOmArbeidssoker = samletInformasjonMockData.opplysningerOmArbeidssoeker;
const arbeidssokerperioderMock = samletInformasjonMockData.arbeidssoekerperioder;

const meta = {
    title: 'Komponenter/OpplysningerOppsummering',
    component: OpplysningerOppsummering,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof OpplysningerOppsummering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpplysningerOmArbeidssoker: Story = {
    args: {
        opplysninger: opplysningerOmArbeidssoker[0] as any,
        sprak: 'nb',
        behovsvurdering: behovsvurderingMockData,
        harAktivPeriode: arbeidssokerperioderMock[0].avsluttet === null,
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!
    },
};
