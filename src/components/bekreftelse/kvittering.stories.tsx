import type { Meta, StoryObj } from '@storybook/nextjs';
import { http, HttpResponse } from 'msw';
import { Kvittering } from './kvittering';

const meta = {
    title: 'Bekreftelse/Komponenter/Kvittering',
    component: Kvittering,
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof Kvittering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KvitteringStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: false,
        harFlereBekreftelser: false,
        onClick: () => console.log('onClick'),
    },
};

export const KvitteringUtmeldtStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: true,
        harFlereBekreftelser: false,
        onClick: () => console.log('onClick'),
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'INAKTIV',
        },
    },
};

export const KvitteringFlereBekreftelserStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: false,
        harFlereBekreftelser: true,
        onClick: () => console.log('onClick'),
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'INAKTIV',
        },
    },
};

export const KvitteringMedStartStyrkKomponentStory: Story = {
    args: {
        sprak: 'nb',
        erUtmeldt: false,
        harFlereBekreftelser: false,
        onClick: () => console.log('onClick'),
        brukerprofil: {
            identitetsnummer: '42',
            tjenestestatus: 'INAKTIV',
        },
    },
};

export const KvitterinMedStillingerKomponent: Story = {
    parameters: {
        msw: {
            handlers: [
                http.get(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/brukerprofil/ledigestillinger`, () => {
                    return HttpResponse.json({
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
                                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                                tittel: 'Nittedal Tannlegesenter har ledig stilling som tannhelsesekretær/tannlegeassistent, er du den rette?',
                                stillingbeskrivelse: 'Tannlegeassistent, Tannhelsesekretær, Klinikkassistent',
                                selskap: 'Nittedal Tannlegesenter Og Tannlegevakt',
                                kommune: 'Nittedal, Norge, Oslo, Akershus',
                                soeknadsfrist: {
                                    raw: 'Søk senest torsdag 6. november',
                                },
                            },
                            {
                                arbeidsplassenNoId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                                tittel: 'Do you want to be part of developing WorldHotels and taking the brand to new heights in Scandinavia?',
                                stillingbeskrivelse: 'Head of Performance WorldHotels',
                                selskap: 'BWH Hotels Scandinavia',
                                kommune: 'Oslo',
                                soeknadsfrist: {
                                    raw: 'Søk snarest mulig',
                                },
                            },
                        ],
                    });
                }),
            ],
        },
    },
    args: {
        sprak: 'nb',
        erUtmeldt: false,
        harFlereBekreftelser: false,
        onClick: () => console.log('onClick'),
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
    },
};
