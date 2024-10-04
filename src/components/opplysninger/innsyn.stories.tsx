import { Meta, StoryObj } from '@storybook/react';
import opplysningerOmArbeidssoker from '../../mocks/opplysninger-om-arbeidssoker-mock';
import { InnsynLesMer } from './innsyn';
import behovsvurderingMock from '../../mocks/behovsvurdering-mock';
import arbeidssokerperioderMock from '../../mocks/arbeidssokerperioder-mock';

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
        behovsvurdering: behovsvurderingMock,
        harAktivPeriode: arbeidssokerperioderMock[0].avsluttet === null,
    },
};
