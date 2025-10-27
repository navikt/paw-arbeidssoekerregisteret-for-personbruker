import { describe, expect, it } from 'vitest';
import { gyldigTjenestestatus } from './gyldig-tjenestestatus';

describe('validere typesjekken til gyldigTjenestestatus', () => {
    it('Skal returnere true for gyldig TjenestestatusRequest', () => {
        const validRequest = { tjenestestatus: 'aktiv' };
        expect(gyldigTjenestestatus(validRequest)).toBe(true);
    });

    it('Skal returnere false for null', () => {
        expect(gyldigTjenestestatus(null as any)).toBe(false);
    });

    it('Skal returnere false for undefined', () => {
        expect(gyldigTjenestestatus(undefined as any)).toBe(false);
    });

    it('Skal returnere false for non-object typer', () => {
        expect(gyldigTjenestestatus('string' as any)).toBe(false);
        expect(gyldigTjenestestatus(123 as any)).toBe(false);
        expect(gyldigTjenestestatus(true as any)).toBe(false);
        expect(gyldigTjenestestatus([] as any)).toBe(false);
    });

    it('Skal returnere false for objekter uten tjenestestatus', () => {
        expect(gyldigTjenestestatus({} as any)).toBe(false);
        expect(gyldigTjenestestatus({ other: 'value' } as any)).toBe(false);
    });

    it('Skal returnere false for objekter med tjenestestatus med feil type', () => {
        expect(gyldigTjenestestatus({ tjenestestatus: 123 } as any)).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: null } as any)).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: undefined } as any)).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: {} } as any)).toBe(false);
    });

    it('Skal returnere false for objekter med tjenestestatus med whitespace-only og tomme strenger ', () => {
        expect(gyldigTjenestestatus({ tjenestestatus: '' })).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: '   ' })).toBe(false);
        expect(gyldigTjenestestatus({ tjenestestatus: '\t\n' })).toBe(false);
    });

    it('Skal returnere true når man sender gyldig type med ekstra whitespace', () => {
        expect(gyldigTjenestestatus({ tjenestestatus: ' aktiv ' })).toBe(true);
        expect(gyldigTjenestestatus({ tjenestestatus: '\taktiv\n' })).toBe(true);
    });
});
