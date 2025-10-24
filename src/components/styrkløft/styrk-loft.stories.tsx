import type { Meta, StoryObj } from '@storybook/nextjs';
import StyrkLoft from '@/components/styrkløft/styrk-loft';
import { Tjenestestatus } from '@/model/brukerprofil';

const meta = {
    title: 'Styrkløft/Styrkløft',
    component: StyrkLoft,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof StyrkLoft>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ledigStillingerRespons = {
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

export const Demo: Story = {
    args: {
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'INAKTIV',
        },
        isStorybook: true,
        onSubmitTjenestestatus(status: Tjenestestatus) {
            console.log('onSubmitTjenestestatus', status);
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            console.log('onSubmitStillingsSoek', data);
            return Promise.resolve();
        },
        onFetchStillinger() {
            return Promise.resolve(ledigStillingerRespons);
        },
        sprak: 'nb',
    },
};

export const Avmeldt: Story = {
    args: {
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'OPT_OUT',
        },
        isStorybook: true,
        onSubmitTjenestestatus(status: Tjenestestatus) {
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            return Promise.resolve();
        },
        onFetchStillinger() {
            return Promise.resolve(ledigStillingerRespons);
        },
        sprak: 'nb',
    },
};

export const AktivUtenLagretSøk: Story = {
    args: {
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'AKTIV',
            stillingssoek: [],
        },
        isStorybook: true,
        onSubmitTjenestestatus(status: Tjenestestatus) {
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            return Promise.resolve();
        },
        onFetchStillinger() {
            return Promise.resolve(ledigStillingerRespons);
        },
        sprak: 'nb',
    },
};
export const MedLagretSøk: Story = {
    args: {
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'AKTIV',
            stillingssoek: [
                {
                    soekType: 'STED_SOEK_V1',
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
                    soekeord: ['Tryllekunstner'],
                    styrk08: ['124'],
                },
            ],
        },
        isStorybook: true,
        onSubmitTjenestestatus(status: Tjenestestatus) {
            return Promise.resolve();
        },
        onSubmitStillingsSoek(data: any) {
            return Promise.resolve();
        },
        onFetchStillinger() {
            return Promise.resolve(ledigStillingerRespons);
        },
        sprak: 'nb',
    },
};
