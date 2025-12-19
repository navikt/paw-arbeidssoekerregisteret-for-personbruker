import type { Meta, StoryObj } from '@storybook/nextjs';
import Egenvurdering from '@/components/egenvurdering/egenvurdering-stateless';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

const meta = {
    title: 'Komponenter/Egenvurdering/Stateless',
    component: Egenvurdering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Egenvurdering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MedAntattGodeMuligheter: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        pendingRequest: null,
        visFeilmelding: false,
        onSubmit: () => Promise.resolve(),
    },
};

export const MedAntattAntattBehovForVeiledning: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
        } as any,
        pendingRequest: null,
        visFeilmelding: false,
        onSubmit: () => Promise.resolve(),
    },
};

export const MedPendingRequest: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        pendingRequest: ProfilertTil.ANTATT_GODE_MULIGHETER,
        visFeilmelding: false,
        onSubmit: () => Promise.resolve(),
    },
};

export const MedVisFeilmelding: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        pendingRequest: null,
        visFeilmelding: true,
        onSubmit: () => Promise.resolve(),
    },
};
