import { AggregertePerioder, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

import { prettyPrintDato } from '@/lib/date-utils';

interface PeriodeInfoProps {
    sprak: Sprak;
    aggregertePerioder: AggregertePerioder;
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
        'graceperiode utløpt': 'Ikkje svart på stadfesting',
        '[bekreftelse] ikke levert innen fristen': 'Ikkje svart på stadfesting',
        '[bekreftelse:ytelse/støtte] ikke levert innen fristen': 'Ikkje svart på stadfesting',
        'stopp av periode': 'Stoppa av rettleiar',
        'svarte nei på spørsmål \'vil du fortsatt være registrert som arbeidssøker?\'': 'Stoppa av deg',
        '[bekreftelse] ønsket ikke lenger å være arbeidssøker': 'Svara "Nei" på stadfesting',
    },
    en: {
        registreringsDato: 'Registered: ',
        sistBekreftetDato: 'Last confirmed: ',
        varRegistrert: 'You were registered as a jobseeker from ',
        til: 'to ',
        ikkeTidligereRegistrert: 'You have not previously been registered as a jobseeker',
    },
};

const PeriodeInfo = (props: PeriodeInfoProps) => {
    const { aggregertePerioder, sprak } = props;
    const periode = aggregertePerioder[0];
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const bekreftet = periode?.bekreftelser[0];

    if (!periode?.startet) {
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
