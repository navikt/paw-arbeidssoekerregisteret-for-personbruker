import { Button, VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type React from 'react';
import { useState } from 'react';
import { expect, fn, waitFor, within } from 'storybook/test';
import { BekreftAvmelding } from './bekreft-avmelding';

const meta: Meta<typeof BekreftAvmelding> = {
    title: 'Styrkløft/Komponenter/Bekreft avmelding',
    component: BekreftAvmelding,
    tags: ['autodocs'],
    args: {
        sprak: 'nb',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveWrapper: React.FC<Omit<React.ComponentProps<typeof BekreftAvmelding>, 'open'>> = (args) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        args.onClose?.();
    };

    const handleConfirm = () => {
        args.onConfirm?.();
        setOpen(false);
    };

    return (
        <VStack gap="space-16" align="start">
            <Button type="button" variant="tertiary" onClick={() => setOpen(true)} size="small">
                Jeg vil melde meg av
            </Button>
            <BekreftAvmelding {...args} open={open} onClose={handleClose} onConfirm={handleConfirm} />
        </VStack>
    );
};

export const DefaultBekreftAvmelding: Story = {
    render: (args) => <InteractiveWrapper {...args} />,
    args: {
        sprak: 'nb',
        onClose: () => console.log('lukk'),
        onConfirm: () => console.log('opt-out'),
    },
};

export const NormalBokmal: Story = {
    ...DefaultBekreftAvmelding,
    args: {
        ...DefaultBekreftAvmelding.args,
        sprak: 'nb',
    },
};

export const NormalNynorsk: Story = {
    ...DefaultBekreftAvmelding,
    args: {
        ...DefaultBekreftAvmelding.args,
        sprak: 'nn',
    },
};

export const NormalEngelsk: Story = {
    ...DefaultBekreftAvmelding,
    args: {
        ...DefaultBekreftAvmelding.args,
        sprak: 'en',
    },
};

export const MedPending: Story = {
    render: (args) => <InteractiveWrapper {...args} />,
    args: {
        sprak: 'nb',
        onClose: fn(),
        onConfirm: fn(),
        pending: true,
    },
    play: async ({ canvasElement, userEvent }) => {
        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);

        await userEvent.click(canvas.getByRole('button', { name: 'Jeg vil melde meg av' }));

        await expect(body.getByRole('button', { name: 'Venter…' })).toBeDisabled();
        await expect(body.getByRole('button', { name: 'Avbryt' })).toBeDisabled();
    },
};

export const MedFeilmelding: Story = {
    render: (args) => <InteractiveWrapper {...args} />,
    args: {
        sprak: 'nb',
        onClose: fn(),
        onConfirm: fn(),
        error: true,
    },
    play: async ({ args, canvasElement, userEvent }) => {
        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);

        await userEvent.click(canvas.getByRole('button', { name: 'Jeg vil melde meg av' }));

        await expect(await body.findByRole('alert')).toHaveTextContent('Noe gikk desverre galt. Prøv igjen');
        await userEvent.click(body.getByRole('button', { name: 'Avbryt' }));
        await waitFor(async () => await expect(body.queryByRole('dialog')).not.toBeInTheDocument());
        await expect(args.onClose).toHaveBeenCalledOnce();
    },
};
