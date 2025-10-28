import type { Meta, StoryObj } from '@storybook/nextjs';
import AktivBrukerStateless from '@/components/styrkløft/aktiv-bruker-stateless';
import { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/Komponenter/Aktiv bruker/Stateless',
    component: AktivBrukerStateless,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof AktivBrukerStateless>;

export default meta;
type Story = StoryObj<typeof meta>;
const ledigStillingerRespons = {
    data: {
        soek: {
            fylker: [
                {
                    navn: 'Buskerud',
                    kommuner: [
                        {
                            navn: 'Bergen',
                            kommunenummer: '4601',
                        },
                    ],
                    fylkesnummer: '46',
                },
            ],
            styrk08: ['2114'],
        },
        resultat: [
            {
                uuid: 'uuid',
                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                kommune: 'Nittedal, Norge, Oslo, Akershus',
                soeknadsfrist: {
                    raw: 'Søk senest torsdag 6. november',
                },
            },
            {
                uuid: 'uuid',
                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                stillingbeskrivelse: 'Head of Performance WorldHotels',
                selskap: 'BWH Hotels Scandinavia',
                kommune: 'Oslo',
                soeknadsfrist: {
                    raw: 'Søk snarest mulig',
                },
            },
        ],
    },
};

export const Default: Story = {
    args: {
        onFetchStillinger() {
            return Promise.resolve(ledigStillingerRespons);
        },
        onSubmitTjenestestatus: (status: Tjenestestatus) => Promise.resolve(),
        onSubmitStillingsSoek: (data: any) => Promise.resolve(),
        sprak: 'nb',
        isEditMode: false,
        visAvmeldModal: false,
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'AKTIV',
        },
        onEditSearch: () => console.log('onEditSearch'),
        lagretSok: {
            fylker: [],
            yrkeskategorier: [],
        },
        onCancelEditSearch: () => console.log('onCancelEditSearch'),
    },
};
