import {
    ArbeidssokerperioderResponse,
    BekreftelseResponse,
    hentSisteArbeidssokerPeriode,
    lagHentTekstForSprak,
    OpplysningerOmArbeidssokerResponse,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';

import { prettyPringDato } from '@/lib/date-utils';

interface PeriodeInfoProps {
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssokerResponse;
    bekreftelser: BekreftelseResponse,
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        registreringsDato: 'Registreringsdato: ',
        sistBekreftetDato: 'Sist bekreftet: ',
        varRegistrert: 'Du var registrert som arbeidssøker fra ',
        til: 'til ',
        ikkeTidligereRegistrert: 'Du har ikke tidligere vært registrert som arbeidssøker'
    },
};

const PeriodeInfo = (props: PeriodeInfoProps) => {
    const { arbeidssoekerperioder, sprak, bekreftelser } = props;
    const periode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!periode.startet) {
        return (
            <div className={'flex items-center flex-wrap mb-4'}>
                {tekst('ikkeTidligereRegistrert')}
            </div>
        );
    }

    const harAktivPeriode = !Boolean(periode.avsluttet);
    const opprettetDato = periode && periode.startet?.tidspunkt;

    return (
        <div className={'flex items-center flex-wrap mb-4'}>
            {harAktivPeriode ? (
                <>
                    {tekst('registreringsDato')}
                    {prettyPringDato(opprettetDato)}
                </>
            ) : (
                <>
                    {tekst('varRegistrert')}
                    {prettyPringDato(opprettetDato)} {tekst('til')}
                    {periode.avsluttet && prettyPringDato(periode.avsluttet.tidspunkt)}
                </>
            )}
        </div>
    );
};

export default PeriodeInfo;
