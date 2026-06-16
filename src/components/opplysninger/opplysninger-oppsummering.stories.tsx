import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { snapshotMock } from '@/app/mockdata';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';

const meta = {
    title: 'Komponenter/OpplysningerOppsummering',
    component: OpplysningerOppsummering,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof OpplysningerOppsummering>;

export default meta;
type Story = StoryObj<typeof OpplysningerOppsummering>;

export const OpplysningerOmArbeidssoker: Story = {
    args: {
        visEndreLink: true,
        snapshot: { ...snapshotMock, egenvurdering: undefined },
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/magler-opplysninger',
    },
};

export const UtenEndreLenke: Story = {
    args: {
        visEndreLink: false,
        snapshot: snapshotMock,
        sprak: 'nb',
        oppdaterOpplysningerUrl: 'http://localhost:3000/magler-opplysninger',
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
        oppdaterOpplysningerUrl: 'http://localhost:3000/magler-opplysninger',
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
        oppdaterOpplysningerUrl: 'http://localhost:3000/magler-opplysninger',
    },
};
