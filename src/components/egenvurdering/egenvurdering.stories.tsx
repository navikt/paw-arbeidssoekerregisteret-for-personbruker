import type { Meta, StoryObj } from '@storybook/react';
import Egenvurdering from '@/components/egenvurdering/egenvurdering';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils/dist/models/profilering';
import { http, HttpResponse } from 'msw';

const meta = {
    title: 'Komponenter/Egenvurdering',
    component: Egenvurdering,
    tags: ['autodocs'],
    args: {},
    parameters: {
        msw: {
            handlers: [
                http.post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/egenvurdering`, () => {
                    return new HttpResponse(null, { status: 202 });
                }),
            ],
        },
    },
} satisfies Meta<typeof Egenvurdering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EgenvurderingStory: Story = {
    args: {
        sprak: 'nb',
        profilering: {
            profileringId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            periodeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            opplysningerOmArbeidssoekerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            sendtInnAv: {
                tidspunkt: '2021-09-29T11:22:33.444Z',
                utfoertAv: {
                    type: 'UKJENT_VERDI',
                },
                kilde: 'string',
                aarsak: 'string',
            },
            profilertTil: ProfilertTil.ANTATT_GODE_MULIGHETER,
            jobbetSammenhengendeSeksAvTolvSisteManeder: true,
            alder: 42,
        },
    },
};
