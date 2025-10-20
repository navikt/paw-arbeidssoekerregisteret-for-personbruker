import { hentYrkeskategorier } from '@/lib/hent-yrkeskategorier';

describe('hent yrkeskategorier', () => {
    it('returnerer kategorie liste', () => {
        expect(hentYrkeskategorier()).toEqual([
            'Bygg og anlegg',
            'Helse og sosial',
            'Håndverkere',
            'IT',
            'Industri og produksjon',
            'Kontor og økonomi',
            'Kultur og kreative yrker',
            'Natur og miljø',
            'Reiseliv og mat',
            'Salg og service',
            'Sikkerhet og beredskap',
            'Transport og lager',
            'Utdanning',
        ])
    })
})
