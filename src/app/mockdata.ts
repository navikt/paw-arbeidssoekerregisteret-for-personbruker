import { ForeslattInnsatsgruppe } from "../../types/behovsvurdering";

export const behovsvurderingMockData = {
  dato: '2024-03-22',
  oppfolging: 'STANDARD_INNSATS' as ForeslattInnsatsgruppe,
  dialogId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
  profileringId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
};

export const sisteSamletInformasjonMockData = {
  "arbeidssoekerperioder": [
    {
      "periodeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "startet": {
        "tidspunkt": "2021-09-29T11:22:33.444Z",
        "utfoertAv": {
          "type": "UKJENT_VERDI",
          "id": "12345678910"
        },
        "kilde": "string",
        "aarsak": "string",
        "tidspunktFraKilde": {
          "tidspunkt": "2021-09-29T11:20:33.444Z",
          "avviksType": "UKJENT_VERDI"
        }
      },
      "avsluttet": null
    }
  ],
  "opplysningerOmArbeidssoeker": [
    {
      "opplysningerOmArbeidssoekerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "periodeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sendtInnAv": {
        "tidspunkt": "2021-09-29T11:22:33.444Z",
        "utfoertAv": {
          "type": "UKJENT_VERDI",
          "id": "12345678910"
        },
        "kilde": "string",
        "aarsak": "string",
        "tidspunktFraKilde": {
          "tidspunkt": "2021-09-29T11:20:33.444Z",
          "avviksType": "UKJENT_VERDI"
        }
      },
      "utdanning": {
        "nus": "4",
        "bestaatt": "JA",
        "godkjent": "JA"
      },
      "helse": {
        "helsetilstandHindrerArbeid": "JA"
      },
      "annet": {
        "andreForholdHindrerArbeid": "JA"
      },
      "jobbsituasjon": [
        {
          "beskrivelse": "MISTET_JOBBEN",
        }
      ]
    }
  ],
  "profilering": [
    {
      "profileringId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "periodeId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "opplysningerOmArbeidssoekerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "sendtInnAv": {
        "tidspunkt": "2021-09-29T11:22:33.444Z",
        "utfoertAv": {
          "type": "UKJENT_VERDI",
          "id": "12345678910"
        },
        "kilde": "string",
        "aarsak": "string",
        "tidspunktFraKilde": {
          "tidspunkt": "2021-09-29T11:20:33.444Z",
          "avviksType": "UKJENT_VERDI"
        }
      },
      "profilertTil": "UKJENT_VERDI",
      "jobbetSammenhengendeSeksAvTolvSisteManeder": true,
      "alder": 0
    }
  ],
  "bekreftelser": [
    { "periodeId":"b91f811a-43f0-4730-a110-c256071c1297",
      "bekreftelsesloesning":"ARBEIDSSOEKERREGISTERET",
      "svar":
        {
          "sendtInnAv": {
              "tidspunkt":"2024-11-07T08:40:14.845Z",
              "utfoertAv":
                {
                  "type":"VEILEDER",
                  "id":"Z994498"
                },
              "kilde":"europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-api-bekreftelse:24.11.06.135-1",
              "aarsak":"Bekreftelse levert",
              "tidspunktFraKilde":null
          },
        "gjelderFra":"2024-11-07T08:32:43.662Z",
        "gjelderTil":"2024-11-07T08:37:43.662Z",
        "harJobbetIDennePerioden":true,
        "vilFortsetteSomArbeidssoeker":false
      }
    }
  ]
}

export const samletInformasjonMockData = {
  "arbeidssoekerperioder": [
    {
      "periodeId": "c9437853-e90c-482d-8ecb-1d2dad4766f2",
      "startet": {
        "tidspunkt": "2024-11-14T06:52:07.103Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssokerregisteret-api-inngang:24.11.13.138-1",
        "aarsak": "Er over 18 år, er bosatt i Norge i henhold Folkeregisterloven",
        "tidspunktFraKilde": null
      },
      "avsluttet": {
        "tidspunkt": "2024-11-14T07:06:32.914Z",
        "utfoertAv": {
          "type": "SYSTEM",
          "id": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-bekreftelse-utgang:24.11.13.49-1"
        },
        "kilde": "paw.arbeidssoekerregisteret.bekreftelse-utgang",
        "aarsak": "Graceperiode utløpt",
        "tidspunktFraKilde": null
      }
    },
    {
      "periodeId": "9875f6e1-342f-429e-b206-029c7832e4cb",
      "startet": {
        "tidspunkt": "2024-11-13T11:01:24.345Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssokerregisteret-api-inngang:24.11.13.138-1",
        "aarsak": "Er over 18 år, er bosatt i Norge i henhold Folkeregisterloven",
        "tidspunktFraKilde": null
      },
      "avsluttet": {
        "tidspunkt": "2024-11-13T11:20:32.863Z",
        "utfoertAv": {
          "type": "SYSTEM",
          "id": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-bekreftelse-utgang:24.11.13.49-1"
        },
        "kilde": "paw.arbeidssoekerregisteret.bekreftelse-utgang",
        "aarsak": "Graceperiode utløpt",
        "tidspunktFraKilde": null
      }
    },
    {
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "startet": {
        "tidspunkt": "2024-11-13T09:19:28.896Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssokerregisteret-api-inngang:24.11.13.138-1",
        "aarsak": "Er over 18 år, er bosatt i Norge i henhold Folkeregisterloven",
        "tidspunktFraKilde": null
      },
      "avsluttet": {
        "tidspunkt": "2024-11-13T09:39:05.384Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "paw.arbeidssoekerregisteret.bekreftelse-utgang",
        "aarsak": "Svarte NEI på spørsmål 'Vil du fortsatt være registrert som arbeidssøker?'",
        "tidspunktFraKilde": null
      }
    }
  ],
  "opplysningerOmArbeidssoeker": [
    {
      "opplysningerOmArbeidssoekerId": "3f345e50-7af4-43e9-b3ad-967b1f304b1e",
      "periodeId": "c9437853-e90c-482d-8ecb-1d2dad4766f2",
      "sendtInnAv": {
        "tidspunkt": "2024-11-14T06:52:07.296Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssokerregisteret-api-inngang:24.11.13.138-1",
        "aarsak": "opplysning om arbeidssøker sendt inn",
        "tidspunktFraKilde": null
      },
      "jobbsituasjon": [
        {
          "beskrivelse": "HAR_BLITT_SAGT_OPP",
          "detaljer": {
            "stilling_styrk08": "8183",
            "stilling": "Emballasjearbeider hermetikk - frukt, grønnsaker og nøtter"
          }
        }
      ],
      "utdanning": {
        "nus": "4",
        "bestaatt": "JA",
        "godkjent": "JA"
      },
      "helse": {
        "helsetilstandHindrerArbeid": "NEI"
      },
      "annet": {
        "andreForholdHindrerArbeid": "NEI"
      }
    },
    {
      "opplysningerOmArbeidssoekerId": "b0a6e597-4bcc-44c7-8679-74c38cd50767",
      "periodeId": "9875f6e1-342f-429e-b206-029c7832e4cb",
      "sendtInnAv": {
        "tidspunkt": "2024-11-13T11:01:26.342Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssokerregisteret-api-inngang:24.11.13.138-1",
        "aarsak": "opplysning om arbeidssøker sendt inn",
        "tidspunktFraKilde": null
      },
      "jobbsituasjon": [
        {
          "beskrivelse": "HAR_SAGT_OPP",
          "detaljer": {
            "stilling_styrk08": "8183",
            "stilling": "Emballasjearbeider hermetikk - frukt, grønnsaker og nøtter"
          }
        }
      ],
      "utdanning": {
        "nus": "4",
        "bestaatt": "JA",
        "godkjent": "JA"
      },
      "helse": {
        "helsetilstandHindrerArbeid": "NEI"
      },
      "annet": {
        "andreForholdHindrerArbeid": "NEI"
      }
    },
    {
      "opplysningerOmArbeidssoekerId": "e06e706d-7686-408d-8f81-301f39467875",
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "sendtInnAv": {
        "tidspunkt": "2024-11-13T09:19:29.094Z",
        "utfoertAv": {
          "type": "SLUTTBRUKER",
          "id": "10908697745"
        },
        "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssokerregisteret-api-inngang:24.11.13.138-1",
        "aarsak": "opplysning om arbeidssøker sendt inn",
        "tidspunktFraKilde": null
      },
      "jobbsituasjon": [
        {
          "beskrivelse": "USIKKER_JOBBSITUASJON",
          "detaljer": {}
        }
      ],
      "utdanning": {
        "nus": "0",
        "bestaatt": null,
        "godkjent": null
      },
      "helse": {
        "helsetilstandHindrerArbeid": "NEI"
      },
      "annet": {
        "andreForholdHindrerArbeid": "NEI"
      }
    }
  ],
  "profilering": [
    {
      "profileringId": "9db53ec1-7578-4648-b3d3-562499b1ff7a",
      "periodeId": "c9437853-e90c-482d-8ecb-1d2dad4766f2",
      "opplysningerOmArbeidssoekerId": "3f345e50-7af4-43e9-b3ad-967b1f304b1e",
      "sendtInnAv": {
        "tidspunkt": "2024-11-14T06:52:07.614Z",
        "utfoertAv": {
          "type": "SYSTEM",
          "id": "paw-arbeidssoekerregisteret-monorepo-ekstern-24.11.11.40-1"
        },
        "kilde": "paw-arbeidssoekerregisteret-monorepo-ekstern-24.11.11.40-1",
        "aarsak": "opplysninger-mottatt",
        "tidspunktFraKilde": {
          "tidspunkt": "2024-11-14T06:52:07.296Z",
          "avviksType": "FORSINKELSE"
        }
      },
      "profilertTil": "ANTATT_GODE_MULIGHETER",
      "jobbetSammenhengendeSeksAvTolvSisteManeder": true,
      "alder": 38
    },
    {
      "profileringId": "0bc06346-6dba-4348-93b4-5e3a6c306751",
      "periodeId": "9875f6e1-342f-429e-b206-029c7832e4cb",
      "opplysningerOmArbeidssoekerId": "b0a6e597-4bcc-44c7-8679-74c38cd50767",
      "sendtInnAv": {
        "tidspunkt": "2024-11-13T11:01:27.925Z",
        "utfoertAv": {
          "type": "SYSTEM",
          "id": "paw-arbeidssoekerregisteret-monorepo-ekstern-24.11.11.40-1"
        },
        "kilde": "paw-arbeidssoekerregisteret-monorepo-ekstern-24.11.11.40-1",
        "aarsak": "opplysninger-mottatt",
        "tidspunktFraKilde": {
          "tidspunkt": "2024-11-13T11:01:26.342Z",
          "avviksType": "FORSINKELSE"
        }
      },
      "profilertTil": "ANTATT_GODE_MULIGHETER",
      "jobbetSammenhengendeSeksAvTolvSisteManeder": true,
      "alder": 38
    },
    {
      "profileringId": "528d18b4-bc77-4862-a6a4-d431c04068ee",
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "opplysningerOmArbeidssoekerId": "e06e706d-7686-408d-8f81-301f39467875",
      "sendtInnAv": {
        "tidspunkt": "2024-11-13T09:19:29.619Z",
        "utfoertAv": {
          "type": "SYSTEM",
          "id": "paw-arbeidssoekerregisteret-monorepo-ekstern-24.11.11.40-1"
        },
        "kilde": "paw-arbeidssoekerregisteret-monorepo-ekstern-24.11.11.40-1",
        "aarsak": "opplysninger-mottatt",
        "tidspunktFraKilde": {
          "tidspunkt": "2024-11-13T09:19:29.094Z",
          "avviksType": "FORSINKELSE"
        }
      },
      "profilertTil": "ANTATT_BEHOV_FOR_VEILEDNING",
      "jobbetSammenhengendeSeksAvTolvSisteManeder": true,
      "alder": 38
    }
  ],
  "bekreftelser": [
    {
      "periodeId": "9875f6e1-342f-429e-b206-029c7832e4cb",
      "bekreftelsesloesning": "ARBEIDSSOEKERREGISTERET",
      "svar": {
        "sendtInnAv": {
          "tidspunkt": "2024-11-13T11:09:08.928Z",
          "utfoertAv": {
            "type": "SLUTTBRUKER",
            "id": "10908697745"
          },
          "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-api-bekreftelse:24.11.13.139-1",
          "aarsak": "Bekreftelse levert",
          "tidspunktFraKilde": null
        },
        "gjelderFra": "2024-11-13T11:01:24.345Z",
        "gjelderTil": "2024-11-13T11:06:24.345Z",
        "harJobbetIDennePerioden": true,
        "vilFortsetteSomArbeidssoeker": true
      }
    },
    {
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "bekreftelsesloesning": "ARBEIDSSOEKERREGISTERET",
      "svar": {
        "sendtInnAv": {
          "tidspunkt": "2024-11-13T09:39:03.066Z",
          "utfoertAv": {
            "type": "SLUTTBRUKER",
            "id": "10908697745"
          },
          "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-api-bekreftelse:24.11.13.139-1",
          "aarsak": "Bekreftelse levert",
          "tidspunktFraKilde": null
        },
        "gjelderFra": "2024-11-13T09:34:28.896Z",
        "gjelderTil": "2024-11-13T09:39:28.896Z",
        "harJobbetIDennePerioden": true,
        "vilFortsetteSomArbeidssoeker": false
      }
    },
    {
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "bekreftelsesloesning": "ARBEIDSSOEKERREGISTERET",
      "svar": {
        "sendtInnAv": {
          "tidspunkt": "2024-11-13T09:36:33.465Z",
          "utfoertAv": {
            "type": "SLUTTBRUKER",
            "id": "10908697745"
          },
          "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-api-bekreftelse:24.11.13.139-1",
          "aarsak": "Bekreftelse levert",
          "tidspunktFraKilde": null
        },
        "gjelderFra": "2024-11-13T09:29:28.896Z",
        "gjelderTil": "2024-11-13T09:34:28.896Z",
        "harJobbetIDennePerioden": true,
        "vilFortsetteSomArbeidssoeker": false
      }
    },
    {
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "bekreftelsesloesning": "ARBEIDSSOEKERREGISTERET",
      "svar": {
        "sendtInnAv": {
          "tidspunkt": "2024-11-13T09:36:07.810Z",
          "utfoertAv": {
            "type": "SLUTTBRUKER",
            "id": "10908697745"
          },
          "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-api-bekreftelse:24.11.13.139-1",
          "aarsak": "Bekreftelse levert",
          "tidspunktFraKilde": null
        },
        "gjelderFra": "2024-11-13T09:24:28.896Z",
        "gjelderTil": "2024-11-13T09:29:28.896Z",
        "harJobbetIDennePerioden": true,
        "vilFortsetteSomArbeidssoeker": false
      }
    },
    {
      "periodeId": "af7201e8-9c14-4597-ab43-b848acb00d6b",
      "bekreftelsesloesning": "ARBEIDSSOEKERREGISTERET",
      "svar": {
        "sendtInnAv": {
          "tidspunkt": "2024-11-13T09:23:43.001Z",
          "utfoertAv": {
            "type": "SLUTTBRUKER",
            "id": "10908697745"
          },
          "kilde": "europe-north1-docker.pkg.dev/nais-management-233d/paw/paw-arbeidssoekerregisteret-api-bekreftelse:24.11.13.139-1",
          "aarsak": "Bekreftelse levert",
          "tidspunktFraKilde": null
        },
        "gjelderFra": "2024-11-13T09:19:28.896Z",
        "gjelderTil": "2024-11-13T09:24:28.896Z",
        "harJobbetIDennePerioden": true,
        "vilFortsetteSomArbeidssoeker": true
      }
    }
  ]
}