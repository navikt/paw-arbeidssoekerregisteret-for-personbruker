import { describe, expect, it } from 'vitest';
import { gyldigTjenestestatus } from './gyldig-tjenestestatus';

describe('validere typesjekken til gyldigTjenestestatus', () => {
    it('Skal returnere true for alle gyldige tjenestestatuser', () => {
        expect(gyldigTjenestestatus({ tjenestestatus: 'AKTIV' })).toBe(true);
        expect(gyldigTjenestestatus({ tjenestestatus: 'INAKTIV' })).toBe(true);
        expect(gyldigTjenestestatus({ tjenestestatus: 'OPT_OUT' })).toBe(true);
        expect(gyldigTjenestestatus({ tjenestestatus: 'KAN_IKKE_LEVERES' })).toBe(true);
    });

    it('Skal returnere false for ugyldig tjenestestatus', () => {
        expect(gyldigTjenestestatus({ tjenestestatus: 'aktiv' })).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: 'UKJENT' })).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: '' })).toBe(false);
    });

    it('Skal returnere false for manglende eller null body', () => {
        expect(gyldigTjenestestatus(null as any)).toBe(false);
        expect(gyldigTjenestestatus(undefined as any)).toBe(false);
        expect(gyldigTjenestestatus({} as any)).toBe(false);
    });
});
