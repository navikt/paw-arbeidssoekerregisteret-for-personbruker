import { Alert, BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import Beta from '@/components/styrkløft/beta';

const TEKSTER = {
    nb: {
        heading: 'Har du lyst til å se ledige stillinger som kan passe for deg?',
        body: 'Hvis du sier ja til å dele informasjon med oss kan vi vise deg ledige stillinger i ditt område som kan være aktuelle ut fra den kompetansen du har',
        submitButton: 'Vis meg ledige stillinger',
        cancelButton: 'Nei takk, jeg ønsker ikke å se ledige stillinger',
        feilmelding: 'Noe gikk dessverre galt. Prøv igjen senere',
    },
};

interface StaticProps {
    sprak: Sprak;
    visAvmeldtLoader: boolean;
    visGodkjennLoader: boolean;
    visFeilmelding: boolean;
    onAvmeldSubmit(): Promise<void>;
    onGodkjennSubmit(): Promise<void>;
}

function GodkjennEksperimentStatic(props: StaticProps) {
    const { sprak, visFeilmelding, visAvmeldtLoader, visGodkjennLoader, onGodkjennSubmit, onAvmeldSubmit } = props;
    const isPending = visAvmeldtLoader || visGodkjennLoader;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
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

export default GodkjennEksperimentStatic;
