import { ArbeidssokerPeriode, OpplysningerOmArbeidssoker, Bekreftelse, Profilering } from "@navikt/arbeidssokerregisteret-utils";

interface OpplysningerMedProfilering extends OpplysningerOmArbeidssoker {
  profilering: Profilering
}

interface AggregertPeriode extends ArbeidssokerPeriode {
  opplysningerOmArbeidssoeker: OpplysningerMedProfilering[];
  bekreftelser: Bekreftelse[]
}

export type AggregertePerioder = AggregertPeriode[]