import byggStillingssoekPayload from '@/lib/bygg-stillingssoek-payload';

describe('bygg-stillingssoek-payload', () => {
    it('mapper fylker og kategorier til gyldig payload', () => {
        const result = byggStillingssoekPayload({
            fylker: ['Østfold'],
            yrkeskategorier: ['IT'],
            visStillingerUtenKrav: false,
        });
        expect(result).toEqual([
            {
                soekType: 'STED_SOEK_V1',
                soekeord: [],
                fylker: [{ navn: 'Østfold', kommuner: [], fylkesnummer: '31' }],
                styrk08: ['1330', '2166', '2514', '3514'],
                soekeTags: [],
            },
        ]);
    });

    it('legger til soekeTags for visStillingerUtenKrav', () => {
        const result = byggStillingssoekPayload({
            fylker: [],
            yrkeskategorier: [],
            visStillingerUtenKrav: true,
        });

        expect(result).toEqual([
            {
                soekType: 'STED_SOEK_V1',
                soekeord: [],
                fylker: [],
                styrk08: [],
                soekeTags: ['INGEN_KRAV_TIL_ARBEIDSERFARING_V1', 'INGEN_KRAV_TIL_UTDANNING_V1'],
            },
        ]);
    });
});
