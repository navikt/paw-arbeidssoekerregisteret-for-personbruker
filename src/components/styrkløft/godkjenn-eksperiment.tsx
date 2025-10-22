import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Tjenestestatus } from '@/model/brukerprofil';
import { Alert, BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import Beta from '@/components/styrkløft/beta';

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
};

function GodkjennEksperiment(props: Props) {
    const { sprak, onSubmit, pending, error } = props;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const visGodkjennLoader = pending === 'AKTIV';
    const visAvmeldtLoader = pending === 'OPT_OUT';
    const isPending = visAvmeldtLoader || visGodkjennLoader;
    const visFeilmelding = Boolean(error);
    const onGodkjennSubmit = () => onSubmit('AKTIV');
    const onAvmeldSubmit = () => onSubmit('OPT_OUT');

    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <Heading level="3" size="large">
                {tekst('heading')}
                <div className={'float-right'}>
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
        </Box>
    );
}

export default GodkjennEksperiment;
