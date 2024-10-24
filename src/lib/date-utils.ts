type Sprak = 'nb' | 'en' | 'nn';

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

const prettyPringDato = (dato: string, locale?: Sprak) => {
    const now = new Date();
    const date = new Date(dato);
    const thisYear = now.getFullYear();
    const year = date.getFullYear();
    const valgtSprak = !locale ? 'nb' : (locale as Sprak);
    const month = monthNames[valgtSprak][date.getMonth()];

    if (valgtSprak === 'en') {
        return `${month} ${date.getDate()}.${thisYear !== year ? ' ' + year : ''}`;
    }

    return `${date.getDate()}. ${month}${thisYear !== year ? ' ' + year : ''}`;
};

function formaterDato(
    dateString: string | undefined,
    options: Intl.DateTimeFormatOptions = {
        // dateStyle: 'short',
        // timeStyle: 'long',
    },
): string {
    return dateString ? new Intl.DateTimeFormat('nb', options).format(new Date(dateString)) : 'Ingen tidspunkt funnet';
}

export { prettyPringDato, formaterDato };
