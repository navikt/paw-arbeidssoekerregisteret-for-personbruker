import { FYLKER_OG_FYLKENUMMER } from '@/components/styrkløft/fylker';
import { Fylke, Kommune } from '@/model/brukerprofil';

export function hentFylkeliste(fylker: string[]): Fylke[] {
    // Stoler ikke på TS her
    if (!fylker || !Array.isArray(fylker)) {
        return [];
    }

    // Filter out null, undefined, and empty strings
    const validerteFylker = fylker.filter((fylke) => fylke && typeof fylke === 'string' && fylke.trim().length > 0);

    // Fjern duplikater (case-insensitive)
    const fylkerUtenDuplikater = Array.from(new Set(validerteFylker.map((fylke) => fylke.toLowerCase())));

    // Sjekk at fylket finnes i listen over gyldige fylker
    const fylkerSomFinnes = fylkerUtenDuplikater.filter((fylke) =>
        FYLKER_OG_FYLKENUMMER.some((el) => el.navn?.toLowerCase() === fylke),
    );

    // Map til Fylke-objekter
    const formattedFylker = fylkerSomFinnes
        .map((fylke) => {
            const validertFylke = FYLKER_OG_FYLKENUMMER.find((_fylke) => _fylke.navn?.toLowerCase() === fylke);
            if (!validertFylke) {
                return null;
            }
            return {
                navn: validertFylke.navn,
                kommuner: [] as Kommune[],
                fylkesnummer: validertFylke.fylkesnummer,
            };
        })
        .filter((fylke) => fylke !== null);

    return formattedFylker;
}
