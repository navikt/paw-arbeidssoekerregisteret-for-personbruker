import byggStillingssoekPayload from '@/lib/bygg-stillingssoek-payload';
import { hentFylkeliste } from '@/lib/hent-fylkeliste';

describe('bygg-stillingssoek-payload', () => {
    it('mapper fylker og kategorier til gyldig payload', () => {
        const result = byggStillingssoekPayload({
            fylker: ['Østfold'],
            yrkeskategorier: ['IT'],
        });
        expect(result).toEqual([
            {
                soekType: 'STED_SOEK_V1',
                soekeord: [],
                fylker: [{ navn: 'Østfold', kommuner: [], fylkesnummer: '31' }],
                styrk08: ['1330', '2166', '2514', '3514'],
            },
        ]);
    });
});
