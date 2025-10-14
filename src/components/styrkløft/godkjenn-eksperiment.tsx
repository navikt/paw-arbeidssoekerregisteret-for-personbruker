import { BodyShort, Box, Button, Checkbox, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import Beta from '@/components/styrkløft/beta';

const TEKSTER = {
    nb: {
        heading: 'Har du lyst til å se ledige stillinger som kan passe for deg?',
        body: 'Hvis du sier ja til å dele informasjon med oss kan vi vise deg ledige stillinger i ditt område som kan være aktuelle ut fra den kompetansen du har',
        checkboxText:
            'Ja, Nav kan bruke informasjon de allerede har om meg til å vise stillinger som kan være aktuelle for meg',
        submitButton: 'Vis meg ledige stillinger',
        cancelButton: 'Nei takk, jeg ønsker ikke å se ledige stillinger',
    },
};

interface Props {
    sprak: Sprak;
}

function GodkjennEksperiment(props: Props) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <Heading level="3" size="large">
                {tekst('heading')}
                <div className={'float-right'}><Beta sprak={sprak}/></div>
            </Heading>
            <BodyShort className={'py-4'}>{tekst('body')}</BodyShort>
            <Checkbox value={'ok'}>{tekst('checkboxText')}</Checkbox>
            <div className={'flex flex-col gap-4 py-4'}>
                <Button variant={'primary'}>{tekst('submitButton')}</Button>
                <Button variant={'tertiary'}>{tekst('cancelButton')}</Button>
            </div>
        </Box>
    );
}

export default GodkjennEksperiment;
