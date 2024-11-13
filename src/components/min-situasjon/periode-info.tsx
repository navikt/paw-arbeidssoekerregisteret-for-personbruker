import {
    ArbeidssokerperioderResponse,
    BekreftelseResponse,
    hentSisteArbeidssokerPeriode,
    lagHentTekstForSprak,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';

import { prettyPrintDato } from '@/lib/date-utils';

interface PeriodeInfoProps {
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
    bekreftelser: BekreftelseResponse,
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        registreringsDato: 'Registrert: ',
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
    const bekreftet = bekreftelser[0]

    if (!periode.startet) {
        return (
            <div className={'flex items-center flex-wrap mb-4'}>
                {tekst('ikkeTidligereRegistrert')}
            </div>
        );
    }

    const harAktivPeriode = !Boolean(periode.avsluttet);
    const opprettetDato = periode && periode.startet?.tidspunkt;
    const harBekreftet = Boolean(bekreftet)
    const bekreftetDato = bekreftet && bekreftet?.svar?.sendtInnAv?.tidspunkt 

    return (
        <div className={'flex flex-wrap mb-4'}>
            {harAktivPeriode ? (
                <>
                    {tekst('registreringsDato')}
                    {prettyPrintDato(opprettetDato)}
                    {harBekreftet && (<>
                        <br/>{tekst('sistBekreftetDato')} {prettyPrintDato(bekreftetDato)}
                    </>)}
                </>
            ) : (
                <>
                    {tekst('varRegistrert')}
                    {prettyPrintDato(opprettetDato)} {tekst('til')}
                    {periode.avsluttet && prettyPrintDato(periode.avsluttet.tidspunkt)}
                </>
            )}
        </div>
    );
};

export default PeriodeInfo;
