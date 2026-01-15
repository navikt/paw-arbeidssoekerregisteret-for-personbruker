import { Meta, StoryObj } from '@storybook/nextjs';
import { aggregertePerioderMockData, snapshotMock } from '@/app/mockdata';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

const opplysningerOmArbeidssoker = snapshotMock.opplysning;

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
        visEndreLink: true,
        snapshot: { ...snapshotMock, egenvurdering: undefined },
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
};

export const UtenEndreLenke: Story = {
    args: {
        visEndreLink: false,
        snapshot: snapshotMock,
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
};

export const MedEgenvurderingGodeMuligheter: Story = {
    args: {
        visEndreLink: true,
        snapshot: {
            ...snapshotMock,
            egenvurdering: {
                ...snapshotMock.egenvurdering,
                egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER,
            } as any,
        },
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
};

export const MedEgenvurderingBehov: Story = {
    args: {
        visEndreLink: true,
        snapshot: {
            ...snapshotMock,
            egenvurdering: {
                ...snapshotMock.egenvurdering,
                egenvurdering: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
            } as any,
        },
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
};
