import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tjenestestatus } from '@/model/brukerprofil';
import { Alert, BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import Beta from '@/components/styrkløft/beta';
import ReadMoreEksperiment from './godkjenn-eksperiment-readmore';

import { loggStyrkeloft } from '@/lib/tracking';

interface Props {
    sprak: Sprak;
    onSubmit(val: Tjenestestatus): Promise<void>;
    error?: string | null;
    pending?: string | null;
}

const TEKSTER = {
    nb: {
        heading: 'Har du lyst til å se ledige stillinger som kan passe for deg?',
        body: 'Hvis du sier ja til å dele informasjon med oss kan vi vise deg ledige stillinger i ditt område som kan være aktuelle ut fra den kompetansen du har',
        submitButton: 'Vis meg ledige stillinger',
        cancelButton: 'Nei takk, jeg ønsker ikke å se ledige stillinger',
        feilmelding: 'Noe gikk dessverre galt. Prøv igjen senere',
    },
    nn: {
        heading: 'Har du lyst til å sjå ledige stillingar som kan passa for deg?',
        body: 'Om du seier ja til å dela informasjon med oss kan me visa deg ledige stillingar i ditt område som kan vera aktuelle ut frå den kompetansen du har',
        submitButton: 'Vis meg ledige stillingar',
        cancelButton: 'Nei takk, eg ønskjer ikkje å sjå ledige stillingar',
        feilmelding: 'Noko gjekk dessverre gale. Prøv igjen seinare',
    },
    en: {
        heading: 'Do you want to see job openings that may suit you?',
        body: 'If you say yes to sharing information with us, we can show you job openings in your area that may be relevant based on your competencies',
        submitButton: 'Show me job openings',
        cancelButton: "No thanks, I don't want to see job openings",
        feilmelding: 'Something went wrong. Try again later',
    },
};

function GodkjennEksperiment(props: Props) {
    const { sprak, onSubmit, pending, error } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const visGodkjennLoader = pending === 'AKTIV';
    const visAvmeldtLoader = pending === 'OPT_OUT';
    const isPending = visAvmeldtLoader || visGodkjennLoader;
    const visFeilmelding = Boolean(error);
    const onGodkjennSubmit = () => {
        loggStyrkeloft({ aktivitet: 'Takker ja til å delta' });
        return onSubmit('AKTIV');
    };
    const onAvmeldSubmit = () => {
        loggStyrkeloft({ aktivitet: 'Takker nei til å delta' });
        return onSubmit('OPT_OUT');
    };

    return (
        <Box>
            <Heading level="3" size="large">
                {tekst('heading')}
                <div>
                    <Beta sprak={sprak} />
                </div>
            </Heading>
            <BodyShort className={'py-4'}>{tekst('body')}</BodyShort>
            {visFeilmelding && <Alert variant={'error'}>{tekst('feilmelding')}</Alert>}
            <div className={'flex flex-col gap-4 py-4'}>
                <Button variant={'primary'} disabled={isPending} loading={visGodkjennLoader} onClick={onGodkjennSubmit}>
                    {tekst('submitButton')}
                </Button>
                <Button variant={'tertiary'} disabled={isPending} loading={visAvmeldtLoader} onClick={onAvmeldSubmit}>
                    {tekst('cancelButton')}
                </Button>
            </div>
            <ReadMoreEksperiment sprak={sprak} />
        </Box>
    );
}

export default GodkjennEksperiment;
