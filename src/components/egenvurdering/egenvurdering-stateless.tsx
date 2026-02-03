import { Alert, BodyLong, Box, Button, Heading, Hide } from '@navikt/ds-react';
import ReadMoreVeileder from '@/components/egenvurdering/readmore-veileder';
import ReadMoreVurdering from '@/components/egenvurdering/readmore-vurdering';
import { lagHentTekstForSprak, Profilering, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { loggAktivitet } from '@/lib/tracking';
import { VisningEventNavn } from '@/lib/tracking/common';

interface Props {
    sprak: Sprak;
    profilering: Profilering;
    pendingRequest: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING | null | null;
    visFeilmelding: boolean;
    onSubmit(
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING | null,
    ): Promise<void>;
}

const TEKSTER = {
    nb: {
        'heading-standard': 'Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra Nav',
        'beskrivelse-standard':
            'En veileders oppgave er å hjelpe deg med å søke stillinger og finne aktuelle tiltak på veien til arbeid.',
        'svarEnigKnappetekst-standard': 'Jeg klarer meg uten hjelp',
        'svarUenigKnappetekst-standard': 'Jeg ønsker hjelp fra en veileder',
        veilederKanIkke: 'En veileder kan ikke svare på spørsmål om dagpenger eller meldekort.',
        'heading-situasjonsbestemt': 'Ønsker du hjelp fra en veileder?',
        'beskrivelse-situasjonsbestemt': 'Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        'svarEnigKnappetekst-situasjonsbestemt': 'Ja, jeg ønsker hjelp',
        'svarUenigKnappetekst-situasjonsbestemt': 'Nei, jeg vil gjerne klare meg selv',
        feilmelding: 'Vi klarte ikke lagre svaret ditt, prøv igjen om et par minutter.',
    },
    nn: {
        'heading-standard': 'Vi trur du har gode høve til å kome i jobb utan ein rettleiar eller tiltak frå Nav',
        'beskrivelse-standard':
            'Oppgåva til ein rettleiar er å hjelpe deg med å søkje stillingar og finne aktuelle tiltak på vegen til arbeid.',
        'svarEnigKnappetekst-standard': 'Eg klarer meg utan hjelp',
        'svarUenigKnappetekst-standard': 'Eg ønskjer hjelp frå ein rettleiar',
        veilederKanIkke: 'Ein rettleiar kan ikkje svare på spørsmål om dagpengar eller meldekort.',
        'heading-situasjonsbestemt': 'Ønskjer du hjelp frå ein rettleiar?',
        'beskrivelse-situasjonsbestemt': 'Vi trur du vil trenge hjelp frå ein rettleiar for å nå målet ditt om arbeid.',
        'svarEnigKnappetekst-situasjonsbestemt': 'Ja, eg ønskjer hjelp',
        'svarUenigKnappetekst-situasjonsbestemt': 'Nei, eg vil gjerne klare meg sjølv',
        feilmelding: 'Vi klarte ikkje lagre svaret ditt. Prøv igjen om eit par minutt.',
    },
    en: {
        'heading-standard': 'We believe you have a good chance of getting a job without a supervisor or help from Nav',
        'beskrivelse-standard':
            'A supervisor’s role is to help you apply for jobs and find relevant measures on your way to work.',
        'svarEnigKnappetekst-standard': 'I can manage without help',
        'svarUenigKnappetekst-standard': 'I want help from a supervisor',
        veilederKanIkke: 'A supervisor cannot answer questions about unemployment benefits or employment status cards.',
        'heading-situasjonsbestemt': 'Do you want help from a supervisor?',
        'beskrivelse-situasjonsbestemt':
            'We believe you will need help from a supervisor to reach your goal of working.',
        'svarEnigKnappetekst-situasjonsbestemt': 'Yes, I want help',
        'svarUenigKnappetekst-situasjonsbestemt': 'No, I’d like to manage on my own',
        feilmelding: 'We couldn’t save your answer. Please try again in a couple of minutes.',
    },
};

const EgenvurderingStateless = (props: Props) => {
    const { sprak, profilering, pendingRequest, visFeilmelding, onSubmit } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const tekstnoekkel = profilering.profilertTil === 'ANTATT_GODE_MULIGHETER' ? 'standard' : 'situasjonsbestemt';
    const antattGodeMuligheter = profilering.profilertTil === 'ANTATT_GODE_MULIGHETER';
    const enigRespons = antattGodeMuligheter
        ? ProfilertTil.ANTATT_GODE_MULIGHETER
        : ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING;
    const uenigRespons = antattGodeMuligheter
        ? ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING
        : ProfilertTil.ANTATT_GODE_MULIGHETER;

    return (
        <Box
            background="default"
            borderRadius="8"
            borderColor={'neutral-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-ax-border-neutral-subtle'}
            data-umami-event={VisningEventNavn}
            data-umami-event-viser={'Egenvurdering'}
        >
            <div
                className={'flex items-center py-4 px-6'}
                style={{
                    background: 'var(--ax-bg-brand-blue-moderate)',
                    borderRadius: 'var(--ax-radius-8) var(--ax-radius-8) 0 0',
                    borderColor: 'var(--ax-border-brand-blue-subtle)',
                }}
            >
                <Hide below={'sm'}>
                    <InformationSquareIcon title="a11y-title" fontSize="1.5rem" className={'mr-4'} />
                </Hide>
                <Heading level="2" size="medium">
                    {tekst(`heading-${tekstnoekkel}`)}
                </Heading>
            </div>
            <div className={'py-4 px-6'}>
                <BodyLong className={'mt-4'}>{tekst(`beskrivelse-${tekstnoekkel}`)}</BodyLong>
                <BodyLong spacing>{tekst('veilederKanIkke')}</BodyLong>
                <Button
                    onClick={() => {
                        onSubmit(enigRespons);
                        loggAktivitet({ aktivitet: 'Trykker på "Klarer meg uten veileder"' });
                    }}
                    disabled={pendingRequest !== null}
                    loading={pendingRequest === enigRespons}
                >
                    {tekst(`svarEnigKnappetekst-${tekstnoekkel}`)}
                </Button>
                <div className="mb-4">
                    <Button
                        onClick={() => {
                            onSubmit(uenigRespons);
                            loggAktivitet({ aktivitet: 'Trykker på "Behov for veileder"' });
                        }}
                        disabled={pendingRequest !== null}
                        loading={pendingRequest === uenigRespons}
                        variant="secondary"
                        className="mt-4"
                    >
                        {tekst(`svarUenigKnappetekst-${tekstnoekkel}`)}
                    </Button>
                </div>
                {visFeilmelding && (
                    <Alert variant="error" className={'mb-4'}>
                        {tekst('feilmelding')}
                    </Alert>
                )}
                <ReadMoreVeileder sprak={sprak} />
                <ReadMoreVurdering sprak={sprak} />
            </div>
        </Box>
    );
};

export default EgenvurderingStateless;
