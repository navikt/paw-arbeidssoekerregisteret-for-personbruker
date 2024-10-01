import { sorterEtterEldsteFoerst } from './sorter-etter-eldste-foerst';

describe('Sorter tilgjengelige bekreftelser etter eldste først', () => {
    test('gir tom array tilbake for tom input', () => {
        expect(sorterEtterEldsteFoerst(undefined)).toEqual([]);
    });

    test('sorterer etter eldste først', () => {
        expect(
            sorterEtterEldsteFoerst([
                { gjelderFra: '2024-09-01', gjelderTil: '2024-09-09', bekreftelseId: '1', periodeId: '' },
                { gjelderFra: '2023-09-01', gjelderTil: '2023-09-09', bekreftelseId: '0', periodeId: '' },
            ]),
        ).toEqual([
            { gjelderFra: '2023-09-01', gjelderTil: '2023-09-09', bekreftelseId: '0', periodeId: '' },
            { gjelderFra: '2024-09-01', gjelderTil: '2024-09-09', bekreftelseId: '1', periodeId: '' },
        ]);
    });
});
