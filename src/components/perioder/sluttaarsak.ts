import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

const TEKSTER = {
    nb: {
        'fortsatt aktiv': 'Arbeidssøkerperioden er fortsatt aktiv',
        'graceperiode utløpt': 'Ikke bekreftet arbeidssøkerstatus',
        'stopp av periode': 'Arbeidssøkerperioden er avsluttet av veileder',
        feilregistrering: 'Slettet på grunn av feilregistrering',
        "svarte nei på spørsmål 'vil du fortsatt være registrert som arbeidssøker?'": 'Stoppet av bruker',
        'personen er ikke bosatt etter folkeregisterloven':
            'Personen oppfyller ikke lenger kravene til å være registrert arbeidssøker',
        'avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'Personen oppfyller ikke lenger kravene til å være registrert arbeidssøker',
        'er registrert som død, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'Personen oppfyller ikke lenger kravene til å være registrert arbeidssøker',
        'personen er doed': 'Personen oppfyller ikke lenger kravene til å være registrert arbeidssøker',
        'er registrert som død': 'Personen oppfyller ikke lenger kravene til å være registrert arbeidssøker',
        iserv: 'Arbeidssøkerperioden er avsluttet i Arena',
        overføring: 'Arbeidssøkerperioden er avsluttet i Arena',
        'har ugyldig/annullert identitet, kunne ikke fastslå alder, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'Personen oppfyller ikke lenger kravene til å være registrert arbeidssøker',
        '[bekreftelse] ikke levert innen fristen':
            'Bekreftelse på arbeidssøkerperiode ikke levert innen fristen. Periode er avsluttet av systemet.',
        '[bekreftelse] ønsket ikke lenger å være arbeidssøker': 'Svarte "Nei" til å være arbeidssøker på bekreftelsen',
    },
    nn: {
        'fortsatt aktiv': 'Arbeidssøkarperioden er framleis aktiv',
        'graceperiode utløpt': 'Ikkje stadfesta arbeidssøkarstatus',
        'stopp av periode': 'Arbeidssøkarperioden er avslutta av rettleiar',
        feilregistrering: 'Sletta på grunn av feilregistrering',
        "svarte nei på spørsmål 'vil du fortsatt være registrert som arbeidssøker?'": 'Stoppa av brukar',
        'personen er ikke bosatt etter folkeregisterloven':
            'Personen oppfyller ikkje lenger krava til å vere registrert arbeidssøkar',
        'avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'Personen oppfyller ikkje lenger krava til å vere registrert arbeidssøkar',
        'er registrert som død, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'Personen oppfyller ikkje lenger krava til å vere registrert arbeidssøkar',
        'personen er doed': 'Personen oppfyller ikkje lenger krava til å vere registrert arbeidssøkar',
        'er registrert som død': 'Personen oppfyller ikkje lenger krava til å vere registrert arbeidssøkar',
        iserv: 'Arbeidssøkarperioden er avslutta i Arena',
        overføring: 'Arbeidssøkarperioden er avslutta i Arena',
        'har ugyldig/annullert identitet, kunne ikke fastslå alder, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'Personen oppfyller ikkje lenger krava til å vere registrert arbeidssøkar',
        '[bekreftelse] ikke levert innen fristen':
            'Stadfesting på arbeidssøkarperiode ikkje levert innan fristen. Periode er avslutta av systemet.',
        '[bekreftelse] ønsket ikke lenger å være arbeidssøker': 'Svarte "Nei" til å vere arbeidssøkar på stadfestinga',
    },
    en: {
        'fortsatt aktiv': 'The jobseeker period is still active',
        'graceperiode utløpt': 'Jobseeker status not confirmed',
        'stopp av periode': 'The jobseeker period has been ended by the supervisor',
        feilregistrering: 'Deleted due to incorrect registration',
        "svarte nei på spørsmål 'vil du fortsatt være registrert som arbeidssøker?'": 'Ended by the user',
        'personen er ikke bosatt etter folkeregisterloven':
            'The person no longer meets the requirements to be registered as a jobseeker',
        'avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'The person no longer meets the requirements to be registered as a jobseeker',
        'er registrert som død, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'The person no longer meets the requirements to be registered as a jobseeker',
        'personen er doed': 'The person no longer meets the requirements to be registered as a jobseeker',
        'er registrert som død': 'The person no longer meets the requirements to be registered as a jobseeker',
        iserv: 'The jobseeker period has been ended in Arena',
        overføring: 'The jobseeker period has been ended in Arena',
        'har ugyldig/annullert identitet, kunne ikke fastslå alder, avvist fordi personen ikke er bosatt i Norge i henhold til folkeregisterloven':
            'The person no longer meets the requirements to be registered as a jobseeker',
        '[bekreftelse] ikke levert innen fristen':
            'Jobseeker status confirmation not submitted within the deadline. Period has been ended by the system.',
        '[bekreftelse] ønsket ikke lenger å være arbeidssøker':
            'Answered "No" to being a jobseeker on the confirmation',
    },
};

export function oversettSluttaarsak(sprak: Sprak) {
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return function (tekststreng: string) {
        const oversatt = tekst(tekststreng.toLocaleLowerCase());
        return oversatt || tekststreng;
    };
}
