import type { Meta, StoryObj } from '@storybook/nextjs';
import VelgStillingssoekStateless from '@/components/styrkløft/velg-stillingssoek-stateless';

const meta = {
    title: 'Styrkløft/Velg stillingsøk/stateless',
    component: VelgStillingssoekStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof VelgStillingssoekStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb' ,
        fylker: [],
        yrkeskategorier: [],
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
    }
};

export const MedValgteKategorier: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: [],
        yrkeskategorier: ['IT'],
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
    }
};

export const MedValgteFylker: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: [],
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
    }
}

export const MedGyldigeVerdier: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
    }
}

export const MedHengendeRequest: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        pending: true
    }
}

export const MedFeil: Story = {
    args: {
        onSubmit: () => Promise.resolve(),
        sprak: 'nb',
        fylker: ['Oslo', 'Østfold'],
        yrkeskategorier: ['IT'],
        onChangeYrkeskategorier: (val: string[]) => {},
        onChangeFylker: (val: string[]) => {},
        error: 'feil'
    }
}





