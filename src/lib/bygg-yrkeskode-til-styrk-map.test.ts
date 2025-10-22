import { byggYrkeskodeTilStyrkMap } from '@/lib/bygg-yrkeskode-til-styrk-map';

describe('bygg-yrkeskode-til-styrk-map', () => {
    it('returnerer et map som gir en liste av styrk-koder for gitt yrkeskategori', () => {
        const it = byggYrkeskodeTilStyrkMap().get('IT');
        expect(it).toEqual(['1330', '2166', '2514', '3514']);
    });
});
