import { ArbeidssokerPeriode, OpplysningerOmArbeidssoker, Bekreftelse, Profilering } from "@navikt/arbeidssokerregisteret-utils";

interface OpplysningerMedProrilering extends OpplysningerOmArbeidssoker {
  profilering: Profilering
}

interface AggregertPeriode extends ArbeidssokerPeriode {
  opplysningerOmArbeidssoeker: OpplysningerMedProrilering[];
  bekreftelser: Bekreftelse[]
}

export type AggregertePerioder = AggregertPeriode[]