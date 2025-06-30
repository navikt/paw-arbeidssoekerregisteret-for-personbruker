import {
    ArbeidssokerPeriode,
    Bekreftelse,
    OpplysningerOmArbeidssoker,
    Profilering,
    SendtInnAv,
} from '@navikt/arbeidssokerregisteret-utils';

import { BekreftelseMedStatus } from '@/model/bekreftelse';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils/dist/models/profilering';

export interface ProfileringMedEgenvurdering extends Profilering {
    egenvurderinger?: {
        egenvurderingId: string;
        periodeId: string;
        opplysningerOmArbeidssoekerId: string;
        profileringId: string;
        sendtInnAv: SendtInnAv;
        egenvurdering: ProfilertTil;
    }[];
}

export interface OpplysningerMedProfilering extends OpplysningerOmArbeidssoker {
    profilering: ProfileringMedEgenvurdering;
}

export interface AggregertPeriode extends ArbeidssokerPeriode {
    opplysningerOmArbeidssoeker: OpplysningerMedProfilering[];
    bekreftelser: Bekreftelse[];
}

export interface AggregertPeriodeMedBekreftelseStatus {
    opplysningerOmArbeidssoeker: OpplysningerMedProfilering[];
    bekreftelser: BekreftelseMedStatus[];
}

export type AggregertePerioder = AggregertPeriode[];

export type AggregertePerioderMedBekreftelseStatus = AggregertePerioderMedBekreftelseStatus[];
