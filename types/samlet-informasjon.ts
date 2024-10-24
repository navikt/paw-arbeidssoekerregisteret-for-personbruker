import {
    ArbeidssokerperioderResponse,
    OpplysningerOmArbeidssokerResponse,
    ProfileringResponse,
} from '@navikt/arbeidssokerregisteret-utils';
import { InnsendtBekreftelse } from './innsendt-bekreftelse';

export type SamletInformasjon = {
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssokerResponse;
    profilering: ProfileringResponse;
    bekreftelser: InnsendtBekreftelse[];
};
