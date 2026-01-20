import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { PeriodeStartetHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
const norsk = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
];
const monthNames = {
    nb: norsk,
    nn: norsk,
    pl: norsk,
    en: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
};
export function prettyPrintDatoOgKlokkeslettKortform(dato: string, locale?: Sprak, visAar?: boolean) {
    const now = new Date();
    const date = new Date(dato);
    const thisYear = now.getFullYear();
    const year = date.getFullYear();
    const timer = date.getHours();
    const minutter = date.getMinutes();
    const valgtSprak = !locale ? 'nb' : (locale as Sprak);
    const month = monthNames[valgtSprak][date.getMonth()];
    const maaned = date.getMonth() + 1;

    if (valgtSprak === 'en') {
        return `${month} ${date.getDate()}.${visAar || thisYear !== year ? ' ' + year : ''} at {timer.toString().length === 1 ? '0': ''}${timer}:${minutter.toString().length === 1 ? '0' : ''}${minutter}`;
    }

    return `${date.getDate().toString().padStart(2, '0')}.${maaned.toString().padStart(2, '0')}${visAar || thisYear !== year ? '.' + year : ''} ${timer.toString().length === 1 ? '0' : ''}${timer}:${minutter.toString().length === 1 ? '0' : ''}${minutter}`;
}

const TEKSTER = {
    nb: {
        periode_started: 'Registrert som arbeidssøker',
        periode_started_sys: 'Registrert som arbeidssøker av',
        SYSTEM: 'Nav',
        VEILEDER: 'veileder',
    },
    nn: {
        periode_started: 'Registrert seg som arbeidssøkjar',
        periode_started_sys: 'Registrert som arbeidssøkjar av',
        SYSTEM: 'Nav',
        VEILEDER: 'rettleiar',
    },

    en: {
        periode_started: 'Registered as job seeker',
        periode_started_sys: 'Registered as job seeker by',
        SYSTEM: 'Nav',
        VEILEDER: 'supervisor',
    },
};

export const opprettHeadingTilPeriodeStartet = (hendelse: PeriodeStartetHendelse, sprak: Sprak): string => {
    const overskriftTekster = lagHentTekstForSprak(TEKSTER, sprak);
    const opprettetAvBruker = hendelse.sendtInnAv.utfoertAv.type === 'SLUTTBRUKER';
    if (!opprettetAvBruker) {
        const doneBy = hendelse.sendtInnAv.utfoertAv.type;
        return `${overskriftTekster('periode_started_sys')} ${overskriftTekster(doneBy)}`;
    }
    return overskriftTekster('periode_started');
};
