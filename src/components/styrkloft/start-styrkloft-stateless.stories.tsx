import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent } from 'storybook/test';
import { StartStyrkloftStateless } from '@/components/styrkloft/start-styrkloft-stateless';
import type { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/Komponenter/StartStyrkløftStateless',
    component: StartStyrkloftStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StartStyrkloftStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Start: Story = {
    args: {
        onSubmitTjenestestatus: fn<(status: Tjenestestatus) => Promise<void>>().mockResolvedValue(undefined),
        pendingTjenestestatus: null,
        errorTjenestestatus: null,
        sprak: 'nb',
    },
    play: async ({ args, canvas }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Vis meg ledige stillinger' }));
        await expect(args.onSubmitTjenestestatus).toHaveBeenNthCalledWith(1, 'AKTIV');

        await userEvent.click(canvas.getByRole('button', { name: 'Nei takk, jeg ønsker ikke å se ledige stillinger' }));
        await expect(args.onSubmitTjenestestatus).toHaveBeenNthCalledWith(2, 'OPT_OUT');
    },
};

export const MedPendingRequest: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        pendingTjenestestatus: 'AKTIV',
        errorTjenestestatus: null,
        sprak: 'nb',
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('button', { name: 'Venter…' })).toBeDisabled();
        await expect(
            canvas.getByRole('button', { name: 'Nei takk, jeg ønsker ikke å se ledige stillinger' }),
        ).toBeDisabled();
    },
};

export const MedFeil: Story = {
    args: {
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        pendingTjenestestatus: null,
        errorTjenestestatus: 'Noe gikk galt',
        sprak: 'nb',
    },
    play: async ({ canvas }) => {
        const alert = canvas.getByRole('alert');
        await expect(alert).toHaveTextContent('Noe gikk dessverre galt. Prøv igjen senere');
    },
};
