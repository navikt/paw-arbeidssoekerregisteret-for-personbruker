import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button, VStack } from '@navikt/ds-react';
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

export const MedPending: Story = {
    render: (args) => <InteractiveWrapper {...args} />,
    args: {
        sprak: 'nb',
        onClose: () => console.log('lukk'),
        onConfirm: () => console.log('opt-out'),
        pending: true,
    },
};

export const MedFeilmelding: Story = {
    render: (args) => <InteractiveWrapper {...args} />,
    args: {
        sprak: 'nb',
        onClose: () => console.log('lukk'),
        onConfirm: () => console.log('opt-out'),
        error: true,
    },
};
