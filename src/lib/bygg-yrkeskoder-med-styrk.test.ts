import { byggYrkeskoderTilStyrkMap } from './bygg-yrkeskoder-med-styrk-map';

describe('bygg-yrkeskoder-med-styrk-map', () => {
    it('returnerer et map som gir en liste av styrk-koder for gitt yrkeskategori', () => {
        const it = byggYrkeskoderTilStyrkMap()[0];
        expect(it.navn).toEqual('Bygg og anlegg');
        expect(it.underKategorier.length).toEqual(8);
    });
});
