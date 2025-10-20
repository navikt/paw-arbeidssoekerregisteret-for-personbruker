import { hentAlleYrkeskategorier, hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';

describe('hentAlleYrkeskategorier', () => {
    it('returnerer kategorie liste', () => {
        expect(hentAlleYrkeskategorier()).toEqual([
            'Bygg og anlegg',
            'Helse og sosial',
            'Håndverkere',
            'Industri og produksjon',
            'IT',
            'Kontor og økonomi',
            'Kultur og kreative yrker',
            'Natur og miljø',
            'Reiseliv og mat',
            'Salg og service',
            'Sikkerhet og beredskap',
            'Transport og lager',
            'Utdanning',
        ]);
    });
});

describe('hentYrkeskategorier', () => {
    it('returnerer kategorie liste for gitte styrk-koder', () => {
        expect(hentYrkeskategorier(['1330', '2166', '2514', '3514'])).toEqual(['IT']);
    });
});
