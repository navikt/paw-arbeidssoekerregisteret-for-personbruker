import { Meta, StoryObj } from '@storybook/nextjs';
import { FlerValgsMeny } from './flervalgsmeny';

const meta = {
    title: 'Styrkløft/Flervalgsmeny',
    component: FlerValgsMeny,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof FlerValgsMeny>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLinkTilArbeidsplassen: Story = {
    args: {
        onEditSearch: () => console.log('onEditSearch'),
        onEnd: () => console.log('onEndSearch'),
        sprak: 'nb',
    },
};
