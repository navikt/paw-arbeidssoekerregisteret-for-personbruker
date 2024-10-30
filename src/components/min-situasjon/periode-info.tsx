import {
    ArbeidssokerperioderResponse,
    hentSisteArbeidssokerPeriode,
    hentSisteOpplysningerOmArbeidssoker,
    lagHentTekstForSprak,
    OpplysningerOmArbeidssokerResponse,
    Sprak,
} from '@navikt/arbeidssokerregisteret-utils';
import { prettyPringDato } from '@/lib/date-utils';

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
        ikkeTidligereRegistrert: 'Du har ikke tidligere vært registrert som arbeidssøker'
    },
};

const PeriodeInfo = (props: PeriodeInfoProps) => {
    const { arbeidssoekerperioder, opplysningerOmArbeidssoeker, sprak } = props;
    const periode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (!periode.startet) {
        return (
            <div className={'flex items-center flex-wrap mb-4'}>
                {tekst('ikkeTidligereRegistrert')}
            </div>
        );
    }

    const opplysninger = hentSisteOpplysningerOmArbeidssoker(opplysningerOmArbeidssoeker);
    const harAktivPeriode = !Boolean(periode.avsluttet);
    const opprettetDato = periode && periode.startet?.tidspunkt;
    const erRegistrertAvSluttbruker = opplysninger.sendtInnAv?.utfoertAv.type === 'SLUTTBRUKER';

    return (
        <div className={'flex items-center flex-wrap mb-4'}>
            {harAktivPeriode ? (
                <>
                    {tekst(erRegistrertAvSluttbruker ? 'du' : 'nav')} {tekst('registrerte')}
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
