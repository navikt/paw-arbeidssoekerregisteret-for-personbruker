import type { Meta, StoryObj } from '@storybook/nextjs';
import VelgStillingssoekStateless from '@/components/styrkløft/velg-stillingssoek-stateless';

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
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: [],
        yrkeskategorier: [],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};

export const MedValgteKategorier: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: [],
        yrkeskategorier: ['IT'],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};

export const MedValgteFylker: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: [],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};

export const MedGyldigeVerdier: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};

export const MedHengendeRequest: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
        pending: true,
    },
};

export const MedFeil: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
        error: 'feil',
    },
};

export const MedAvbrytKnapp: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        onCancel: () => alert('Cancel!'),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        visStillingerUtenKrav: false,
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        onChangeVisStillingerUtenKrav: (val: boolean) => {},
    },
};
