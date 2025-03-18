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
    bekreftelser: BekreftelseResponse;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        registreringsDato: 'Registrert: ',
        sistBekreftetDato: 'Sist bekreftet: ',
        varRegistrert: 'Du var registrert som arbeidssøker fra ',
        til: 'til ',
        ikkeTidligereRegistrert: 'Du har ikke tidligere vært registrert som arbeidssøker',
        sluttarsak: 'Sluttårsak: ',
        'graceperiode utløpt': 'Ikke svart på bekreftelse',
        '[bekreftelse] ikke levert innen fristen': 'Ikke svart på bekreftelse',
        '[bekreftelse:ytelse/støtte] ikke levert innen fristen': 'Ikke svart på bekreftelse',
        'stopp av periode': 'Stoppet av veileder',
        "svarte nei på spørsmål 'vil du fortsatt være registrert som arbeidssøker?'": 'Stoppet av deg',
        '[bekreftelse] ønsket ikke lenger å være arbeidssøker': 'Svarte "Nei" på bekreftelse',
    },
    nn: {
        registreringsDato: 'Registrert: ',
        sistBekreftetDato: 'Sist stadfesta: ',
        varRegistrert: 'Du var registrert som arbeidssøkjar frå ',
        til: 'til ',
        ikkeTidligereRegistrert: 'Du har ikkje tidlegare vore registrert som arbeidssøkjar',
    },
    en: {
        registreringsDato: 'Registered: ',
        sistBekreftetDato: 'Last confirmed: ',
        varRegistrert: 'You were registered as a job seeker from ',
        til: 'to ',
        ikkeTidligereRegistrert: 'You have not previously been registered as a job seeker',
    },
};

const PeriodeInfo = (props: PeriodeInfoProps) => {
    const { arbeidssoekerperioder, sprak, bekreftelser } = props;
    const periode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const bekreftet = bekreftelser[0];

    if (!periode.startet) {
        return <div className={'flex items-center flex-wrap mb-4'}>{tekst('ikkeTidligereRegistrert')}</div>;
    }

    const harAktivPeriode = !Boolean(periode.avsluttet);
    const opprettetDato = periode && periode.startet?.tidspunkt;
    const harBekreftet = Boolean(bekreftet);
    const bekreftetDato = bekreftet && bekreftet?.svar?.sendtInnAv?.tidspunkt;
    const harSluttarsak = Boolean(tekst(periode.avsluttet?.aarsak.toLowerCase() ?? ''));

    return (
        <div className={'mb-4'}>
            {harAktivPeriode ? (
                <>
                    {tekst('registreringsDato')}
                    {prettyPrintDato(opprettetDato, sprak)}
                    {harBekreftet && (
                        <>
                            <br />
                            {tekst('sistBekreftetDato')} {prettyPrintDato(bekreftetDato, sprak)}
                        </>
                    )}
                </>
            ) : (
                <>
                    {tekst('varRegistrert')}
                    {prettyPrintDato(opprettetDato, sprak)} {tekst('til')}
                    {periode.avsluttet && prettyPrintDato(periode.avsluttet.tidspunkt, sprak)}
                    {harSluttarsak && (
                        <div>
                            {tekst('sluttarsak')} {tekst(periode.avsluttet?.aarsak.toLowerCase() ?? '')}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PeriodeInfo;
