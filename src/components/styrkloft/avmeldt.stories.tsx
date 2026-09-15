import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AvmeldtStateless from '@/components/styrkloft/avmeldt-stateless';

const meta = {
    title: 'Styrkløft/Komponenter/Avmeldt',
    component: AvmeldtStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof AvmeldtStateless>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSubmit() {
            return Promise.resolve();
        },
        sprak: 'nb',
        errorTjenestestatus: null,
        pendingTjenestestatus: null,
        submittedTjenestestatus: null,
    },
};
