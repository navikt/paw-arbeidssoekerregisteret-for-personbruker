import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import EgenvurderingAvklart from '@/components/egenvurdering/egenvurdering-avklart';

const meta = {
    title: 'Komponenter/Egenvurdering/Avklart',
    component: EgenvurderingAvklart,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof EgenvurderingAvklart>;

export default meta;
type Story = StoryObj<typeof meta>;

const verifiserOverskriftOgIkon: NonNullable<Story['play']> = async ({ canvas, canvasElement }) => {
    await expect(await canvas.findByRole('heading', { level: 2 })).toBeVisible();
    await expect(canvasElement.querySelector('svg title')).toBeNull();
};

export const AntattGodeMuligheterEnig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER,
    },
    play: verifiserOverskriftOgIkon,
};

export const AntattGodeMuligheterUenig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
    },
    play: verifiserOverskriftOgIkon,
};

export const AntattBehovForVeiledningEnig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
    },
    play: verifiserOverskriftOgIkon,
};

export const AntattBehovForVeiledningUenig: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profilertTil: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
        } as any,
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER,
    },
    play: verifiserOverskriftOgIkon,
};

export const Nynorsk: Story = {
    args: {
        ...AntattGodeMuligheterEnig.args,
        sprak: 'nn',
    },
    play: verifiserOverskriftOgIkon,
};

export const English: Story = {
    args: {
        ...AntattGodeMuligheterEnig.args,
        sprak: 'en',
    },
    play: verifiserOverskriftOgIkon,
};
