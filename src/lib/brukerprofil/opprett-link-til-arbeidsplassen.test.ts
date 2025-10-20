import { describe, it, expect } from 'vitest';
import { opprettLinkTilArbeidsplassen } from './opprett-link-til-arbeidsplassen';
import { mockBrukerprofil } from '@/lib/brukerprofil/mock-data';

describe('opprettLinkTilArbeidsplassen', () => {
    it('Oppretter riktig url med alle yrkeskategorier og fylker', () => {
        const url = opprettLinkTilArbeidsplassen(mockBrukerprofil);

        expect(url).toBe(
            'https://arbeidsplassen.nav.no/stillinger?occupationLevel1=Industri%20og%20produksjon&occupationLevel1=IT&occupationLevel1=Utdanning&v=5&county=BUSKERUD&county=OSLO',
        );
    });

    it('har korrekt base-url og query-parametre', () => {
        const url = opprettLinkTilArbeidsplassen(mockBrukerprofil);
        expect(url.startsWith('https://arbeidsplassen.nav.no/stillinger?')).toBe(true);

        const parsed = new URL(url);
        // occupationLevel1 skal finnes 3 ganger i riktig rekkefølge (vel...)
        expect(parsed.searchParams.getAll('occupationLevel1')).toEqual(['Industri og produksjon', 'IT', 'Utdanning']);
        // versjon
        expect(parsed.searchParams.get('v')).toBe('5');
    });

    it('enkoder mellomrom i yrkeskategorier', () => {
        const url = opprettLinkTilArbeidsplassen(mockBrukerprofil);
        // Rå substring for første kategori skal bruke %20 for mellomrom
        expect(url).toContain('occupationLevel1=Industri%20og%20produksjon');
    });
});
