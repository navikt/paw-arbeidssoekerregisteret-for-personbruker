import { aiaBackendUrl, innloggingsStatusUrl } from './index';

export const AIA_BACKEND = aiaBackendUrl,
    PROFIL_URL = `${AIA_BACKEND}/profil`,
    FEATURE_URL = `${AIA_BACKEND}/unleash`,
    AUTH_API = innloggingsStatusUrl,
    ARBEIDSOKERPERIODER_URL = `${AIA_BACKEND}/arbeidssokerregisteret/v1/arbeidssoekerperioder`,
    OPPLYSNINGER_OM_ARBEIDSSOKER_URL = `${AIA_BACKEND}/arbeidssokerregisteret/v1/opplysninger-om-arbeidssoeker`,
    BEHOVSVURDERING_URL = `${AIA_BACKEND}/behov-for-veiledning`,
    OPPRETT_DIALOG_URL = `${AIA_BACKEND}/dialog`,
    OPPRETT_OPPGAVE_URL = `${AIA_BACKEND}/oppgave`,
    PROFILERING_URL = `${AIA_BACKEND}/arbeidssokerregisteret/v1/profilering`,
    OPPDATER_OPPLYSNINGER_URL = `${AIA_BACKEND}/arbeidssokerregisteret/inngang/v1/arbeidssoker/opplysninger`;
