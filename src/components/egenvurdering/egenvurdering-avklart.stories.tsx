import type { Meta, StoryObj } from '@storybook/nextjs';
import EgenvurderingAvklart from '@/components/egenvurdering/egenvurdering-avklart';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

const meta = {
    title: 'Komponenter/Egenvurdering/Avklart',
    component: EgenvurderingAvklart,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof EgenvurderingAvklart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AntattGodeMuligheterEnig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER,
    },
};

export const AntattGodeMuligheterUenig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
    },
};

export const AntattBehovForVeiledningEnig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
    },
};

export const AntattBehovForVeiledningUenig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER,
    },
};
