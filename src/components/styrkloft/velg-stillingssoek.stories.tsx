import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import VelgStillingssoekStateless from '@/components/styrkloft/velg-stillingssoek-stateless';

const meta = {
    title: 'Styrkløft/Komponenter/Velg stillingsøk/stateless',
    component: VelgStillingssoekStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof VelgStillingssoekStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: fn(() => Promise.resolve()),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: [], visFeilmelding: false },
            yrkeskategorier: { verdi: [], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
    play: async ({ canvas, userEvent, args }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Lagre og vis stillinger' }));
        await expect(args.onSubmit).toHaveBeenCalled();
    },
};

export const MedValgteKategorier: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: [], visFeilmelding: false },
            yrkeskategorier: { verdi: ['IT'], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};

export const MedValgteFylker: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: ['Oslo', 'Østfold'], visFeilmelding: false },
            yrkeskategorier: { verdi: [], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};

export const MedGyldigeVerdier: Story = {
    args: {
        onSubmit: fn(() => Promise.resolve()),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: ['Oslo', 'Østfold'], visFeilmelding: false },
            yrkeskategorier: { verdi: ['IT'], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
    play: async ({ canvas, userEvent, args }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Lagre og vis stillinger' }));
        await expect(args.onSubmit).toHaveBeenCalled();
    },
};

export const MedHengendeRequest: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: ['Oslo', 'Østfold'], visFeilmelding: false },
            yrkeskategorier: { verdi: ['IT'], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
        pending: true,
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('button', { name: 'Venter…' })).toBeDisabled();
    },
};

export const MedFeil: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: ['Oslo', 'Østfold'], visFeilmelding: false },
            yrkeskategorier: { verdi: ['IT'], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
        error: 'feil',
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('alert')).toHaveTextContent('Noe gikk dessverre galt');
    },
};

export const MedAvbrytKnapp: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        onCancel: fn(),
        sprak: 'nb',
        skjemaState: {
            fylker: { verdi: ['Oslo', 'Østfold'], visFeilmelding: false },
            yrkeskategorier: { verdi: ['IT'], visFeilmelding: false },
            visStillingerUtenKrav: false,
            harSendtInnSkjema: false,
        },
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
    play: async ({ canvas, userEvent, args }) => {
        await userEvent.click(canvas.getByRole('button', { name: 'Avbryt' }));
        await expect(args.onCancel).toHaveBeenCalled();
    },
};
