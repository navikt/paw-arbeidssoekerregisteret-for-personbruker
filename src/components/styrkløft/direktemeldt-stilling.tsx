import { BodyShort, Box, Heading, HStack, Link, Tag, VStack } from '@navikt/ds-react';
import { loggDirektemeldtStillinger } from '@/lib/tracking';
import { Buildings3Icon, LocationPinIcon } from '@navikt/aksel-icons';
import { JobbAnnonse } from '@/model/brukerprofil';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    ledigStilling: JobbAnnonse;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        soeknadsfrist: 'Søknadsfrist',
        reserverteStillinger: 'Reserverte stillinger',
    },
    nn: {
        soeknadsfrist: 'Søknadsfrist',
        reserverteStillinger: 'Reserverte stillingar',
    },
    en: {
        soeknadsfrist: 'Application deadline',
        reserverteStillinger: 'Reserved jobs',
    },
};
function DirektemeldtStilling(props: Props) {
    const { ledigStilling, sprak } = props;
    const ledigStillingUrl = `https://arbeidsplassen.nav.no/muligheter/mulighet/${ledigStilling.arbeidsplassenNoId}`;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box className={'py-4 pl-4 pr-2'} borderRadius="8" borderColor={'neutral-subtle'} borderWidth={'1'}>
            <Heading level={'2'} size={'small'}>
                <Link
                    href={ledigStillingUrl}
                    onClick={() => loggDirektemeldtStillinger({ aktivitet: 'Går til annonse på arbeidsplassen' })}
                >
                    {ledigStilling.tittel}
                </Link>
            </Heading>
            <BodyShort weight="semibold" className={'mt-2 mb-4'}>
                {ledigStilling.stillingbeskrivelse}
            </BodyShort>
            <VStack gap="space-1">
                <HStack gap="space-2">
                    <Buildings3Icon title="a11y-title" fontSize="1.5rem" />
                    <BodyShort>{ledigStilling.selskap}</BodyShort>
                </HStack>
                <HStack gap="space-2">
                    <LocationPinIcon title="a11y-title" fontSize="1.5rem" />
                    <BodyShort>{ledigStilling.kommune}</BodyShort>
                </HStack>
            </VStack>
            <Box className="flex justify-between mb-4">
                <BodyShort weight="semibold" textColor="subtle" className={'mt-4'}>
                    <label>{tekst('soknadsfrist')}:</label> {ledigStilling.soeknadsfrist?.raw}
                </BodyShort>
            </Box>
            <Tag variant="moderate" data-color="accent">
                {tekst('reserverteStillinger')}
            </Tag>
        </Box>
    );
}
export default DirektemeldtStilling;
