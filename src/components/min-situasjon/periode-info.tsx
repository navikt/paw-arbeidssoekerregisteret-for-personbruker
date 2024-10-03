import {
    ArbeidssokerperioderResponse,
    lagHentTekstForSprak,
    OpplysningerOmArbeidssokerResponse,
    Sprak,
    hentSisteArbeidssokerPeriode,
    hentSisteOpplysningerOmArbeidssoker
} from '@navikt/arbeidssokerregisteret-utils';
import prettyPrintDato from '../../lib/pretty-print-dato';

interface PeriodeInfoProps {
    arbeidssoekerperioder: ArbeidssokerperioderResponse;
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssokerResponse;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        du: 'Du',
        nav: 'NAV',
        registrerte: 'registrerte deg som arbeidssøker ',
        varRegistrert: 'Du var registrert som arbeidssøker fra ',
        til: 'til ',
    },
};

const PeriodeInfo = (props: PeriodeInfoProps) => {
    const { arbeidssoekerperioder, opplysningerOmArbeidssoeker, sprak } = props;
    const periode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder)
    const opplysninger = hentSisteOpplysningerOmArbeidssoker(opplysningerOmArbeidssoeker)
    const harAktivPeriode = !Boolean(periode.avsluttet);
    const opprettetDato = periode.startet.tidspunkt;
    const erRegistrertAvSluttbruker = opplysninger.sendtInnAv?.utfoertAv.type === 'SLUTTBRUKER';
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <div className={'flex items-center flex-wrap mb-4'}>
            {harAktivPeriode ? (
                <>
                    {tekst(erRegistrertAvSluttbruker ? 'du' : 'nav')} {tekst('registrerte')}
                    {prettyPrintDato(opprettetDato)}
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
