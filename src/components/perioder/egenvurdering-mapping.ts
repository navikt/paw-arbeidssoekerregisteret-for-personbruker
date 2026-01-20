import {
    EgenvurderingHendelse,
    Hendelse,
    OpplysningerHendelse,
    ProfileringHendelse,
} from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';

export type OpplysningerMedEgenvurdering = {
    opplysninger: OpplysningerHendelse;
    egenvurdering: EgenvurderingHendelse;
};

/**
 * Lag en mapping mellom egenvurdering og opplysninger gjennom profilering
 * egenvurdering.profileringId -> profilering.id ->
 * profilering.opplysningerOmArbeidssokerId -> opplysninger.id
 */
function mapEgenvurderingTilOpplysninger(hendelser: Hendelse[]) {
    const profileringMap = new Map<string, ProfileringHendelse>();
    const egenvurderingToOpplysningerMap = new Map<string, string>();

    hendelser.forEach((hendelse) => {
        if (hendelse.type === 'PROFILERING_V1') {
            profileringMap.set(hendelse.id, hendelse);
        }
    });

    hendelser.forEach((hendelse) => {
        if (hendelse.type === 'EGENVURDERING_V1') {
            const profilering = profileringMap.get(hendelse.profileringId);
            if (profilering?.opplysningerOmArbeidssokerId) {
                egenvurderingToOpplysningerMap.set(hendelse.id, profilering.opplysningerOmArbeidssokerId);
            }
        }
    });

    return { egenvurderingToOpplysningerMap };
}

/**
 * Finn opplysninger-hendelser som har tilknyttet egenvurdering
 */
export function findOpplysningerMedEgenvurdering(
    hendelser: Hendelse[],
    remainingHendelser: Hendelse[],
): OpplysningerMedEgenvurdering[] {
    const { egenvurderingToOpplysningerMap } = mapEgenvurderingTilOpplysninger(hendelser);
    const result: OpplysningerMedEgenvurdering[] = [];

    remainingHendelser.forEach((hendelse) => {
        if (hendelse.type === 'EGENVURDERING_V1') {
            const opplysningerId = egenvurderingToOpplysningerMap.get(hendelse.id);
            const opplysningerHendelse = hendelser.find((h) => h.type === 'OPPLYSNINGER_V4' && h.id === opplysningerId);

            if (opplysningerHendelse) {
                result.push({
                    opplysninger: opplysningerHendelse as OpplysningerHendelse,
                    egenvurdering: hendelse,
                });
            }
        }
    });

    return result;
}

/**
 * Finn egenvurdering tilknyttet et spesifikt opplysninger-hendelse
 */
export function finnEgenvurderingForOpplysninger(
    opplysningerId: string,
    opplysningerMedEgenvurdering: OpplysningerMedEgenvurdering[],
): EgenvurderingHendelse | undefined {
    const match = opplysningerMedEgenvurdering.find((item) => item.opplysninger.id === opplysningerId);
    return match?.egenvurdering;
}
