import { TJENESTESTATUSER, TjenestestatusRequest } from '@/model/brukerprofil';

const ALLOWED_TJENESTESTATUSER = new Set(TJENESTESTATUSER);

/**
 * Manuell sjekk av type for TjenestestatusRequest.
 * Siden vi ikke kan stole på at request body er av riktig type.
 * Bruke i route, da har vi ikke TS-sjekk automatisk.
 *
 * @param body - Request body å validere
 * @returns True dersom body inneholder gyldig tjenestestatus
 */
export function gyldigTjenestestatus(body: any): body is TjenestestatusRequest {
    return ALLOWED_TJENESTESTATUSER.has(body?.tjenestestatus);
}
