import { describe, expect, it } from 'vitest';

import { leggSprakTilEksternUrl } from '@/lib/sprak-avhengig-url';

describe('leggSprakTilEksternUrl', () => {
    it('returnerer baseUrl når språk er nb og postFix ikke er oppgitt', () => {
        expect(leggSprakTilEksternUrl('https://nav.no', 'nb')).toBe('https://nav.no');
    });

    it('returnerer baseUrl med postFix når språk er nb', () => {
        expect(leggSprakTilEksternUrl('https://nav.no', 'nb', 'jobb')).toBe('https://nav.no/jobb');
    });

    it('returnerer baseUrl med /en når språk er en og postFix ikke er oppgitt', () => {
        expect(leggSprakTilEksternUrl('https://nav.no', 'en')).toBe('https://nav.no/en');
    });

    it('returnerer baseUrl med /en og postFix når språk er en', () => {
        expect(leggSprakTilEksternUrl('https://nav.no', 'en', 'jobb')).toBe('https://nav.no/en/jobb');
    });

    it('returnerer baseUrl med /nn når språk er nn og postFix ikke er oppgitt', () => {
        expect(leggSprakTilEksternUrl('https://nav.no', 'nn')).toBe('https://nav.no/nn');
    });

    it('returnerer baseUrl med /nn og postFix når språk er nn', () => {
        expect(leggSprakTilEksternUrl('https://nav.no', 'nn', 'jobb')).toBe('https://nav.no/nn/jobb');
    });
});
