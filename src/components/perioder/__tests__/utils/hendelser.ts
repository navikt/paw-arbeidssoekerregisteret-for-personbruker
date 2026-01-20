import {
    Hendelse,
    PaaVegneAvStartHendelse,
    PaaVegneAvStoppHendelse,
} from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';

export const createPeriodeStartetHendelse = (tidspunkt: string): Hendelse => ({
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'VEILEDER',
            id: 'Z123456',
        },
        kilde: 'test',
        aarsak: 'Test årsak',
    },
    tidspunkt,
    type: 'PERIODE_STARTET_V1',
});

export const createOpplysningerHendelse = (tidspunkt: string, id = 'test-id'): Hendelse => ({
    id,
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'VEILEDER',
            id: 'Z123456',
        },
        kilde: 'test',
        aarsak: 'Test årsak',
    },
    utdanning: {
        nus: '3',
        bestaatt: 'JA',
        godkjent: 'JA',
    },
    helse: {
        helsetilstandHindrerArbeid: 'NEI',
    },
    jobbsituasjon: {
        beskrivelser: [
            {
                beskrivelse: 'UKJENT_VERDI',
                detaljer: {},
            },
        ],
    },
    annet: {
        andreForholdHindrerArbeid: 'NEI',
    },
    tidspunkt,
    type: 'OPPLYSNINGER_V4',
});

export const createProfileringHendelse = (
    tidspunkt: string,
    id = 'profilering-id',
    opplysningerOmArbeidssokerId = 'opplysninger-id',
): Hendelse => ({
    id,
    opplysningerOmArbeidssokerId,
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'SYSTEM',
            id: 'system',
        },
        kilde: 'test',
        aarsak: 'Test',
    },
    profilertTil: 'ANTATT_GODE_MULIGHETER',
    jobbetSammenhengendeSeksAvTolvSisteMnd: true,
    alder: 35,
    tidspunkt,
    type: 'PROFILERING_V1',
});

export const createBekreftelseHendelse = (tidspunkt: string): Hendelse => ({
    id: 'bekreftelse-id',
    bekreftelsesloesning: 'ARBEIDSSOEKERREGISTERET',
    status: 'GYLDIG',
    svar: {
        sendtInnAv: {
            tidspunkt,
            utfoertAv: {
                type: 'SLUTTBRUKER',
                id: 'test-user',
            },
            kilde: 'test',
            aarsak: 'Test bekreftelse',
        },
        gjelderFra: '2025-01-13T00:00:00Z',
        gjelderTil: '2025-01-20T00:00:00Z',
        harJobbetIDennePerioden: false,
        vilFortsetteSomArbeidssoeker: true,
    },
    tidspunkt,
    type: 'BEKREFTELSE_V1',
});

export const createEgenvurderingHendelse = (
    tidspunkt: string,
    profileringId: string,
    egenvurdering:
        | 'ANTATT_GODE_MULIGHETER'
        | 'ANTATT_BEHOV_FOR_VEILEDNING'
        | 'OPPGITT_HINDRINGER' = 'ANTATT_GODE_MULIGHETER',
    id = 'egenvurdering-id',
): Hendelse => ({
    id,
    profileringId,
    profilertTil: egenvurdering,
    egenvurdering,
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'SLUTTBRUKER',
            id: 'test-user',
        },
        kilde: 'test',
        aarsak: 'Test egenvurdering',
    },
    tidspunkt,
    type: 'EGENVURDERING_V1',
});

export const createPaaVegneAvStartet = (): PaaVegneAvStartHendelse => ({
    tidspunkt: '2025-03-01T10:00:00Z',
    bekreftelsesloesning: 'DAGPENGER',
    periodeId: 'd4428822-103c-423a-aa7c-4dd016b0cb47',
    graceMS: 86400000,
    intervalMS: 604800000,
    type: 'PAA_VEGNE_AV_START_V1',
});

export const createPaaVegneAvStoppet = (): PaaVegneAvStoppHendelse => ({
    periodeId: 'd4428822-103c-423a-aa7c-4dd016b0cb47',
    bekreftelsesloesning: 'DAGPENGER',
    fristBrutt: false,
    tidspunkt: '2026-01-13T12:35:03.331Z',
    type: 'PAA_VEGNE_AV_STOPP_V1',
});
