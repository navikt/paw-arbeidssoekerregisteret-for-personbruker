import { ProfileringResponse, ArbeidssokerperioderResponse, OpplysningerOmArbeidssokerResponse } from '@navikt/arbeidssokerregisteret-utils';

export type SamletInformasjon = {
  arbeidssoekerperioder: ArbeidssokerperioderResponse;
  opplysningerOmArbeidssoeker: OpplysningerOmArbeidssokerResponse;
  profilering: ProfileringResponse
}