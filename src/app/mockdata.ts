import { ForeslattInnsatsgruppe } from "../../types/behovsvurdering";

export const samletInformasjonMockData = {
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
        "nus": "string",
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
          "beskrivelse": "UKJENT_VERDI",
          "detaljer": {
            "prosent": "25"
          }
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
  "bekreftelser": []
}

export const behovsvurderingMockData = {
  dato: '2024-03-22',
  oppfolging: 'STANDARD_INNSATS' as ForeslattInnsatsgruppe,
  dialogId: 'eb39f0ee-ddba-42a1-8ed3-590285b2e279',
  profileringId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
};
