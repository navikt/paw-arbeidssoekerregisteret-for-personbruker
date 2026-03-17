import { BodyShort, Box, Heading, HStack, Link, Tag, VStack } from '@navikt/ds-react';
import { loggStyrkeloft } from '@/lib/tracking';
import { Buildings3Icon, LocationPinIcon } from '@navikt/aksel-icons';
import { JobbAnnonse } from '@/model/brukerprofil';

interface Props {
    ledigStilling: JobbAnnonse;
}

function DirektemeldtStilling(props: Props) {
    const { ledigStilling } = props;
    const ledigStillingUrl = `https://arbeidsplassen.nav.no/muligheter/mulighet/${ledigStilling.arbeidsplassenNoId}`;

    return (
        <Box className={'py-4 pl-4 pr-2'} borderRadius="8" borderColor={'neutral-subtle'} borderWidth={'1'}>
            <Heading level={'2'} size={'small'}>
                <Link
                    href={ledigStillingUrl}
                    onClick={() => loggStyrkeloft({ aktivitet: 'Går til annonse på arbeidsplassen' })}
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
                    <label>Søknadsfrist:</label> {ledigStilling.soeknadsfrist?.raw}
                </BodyShort>
            </Box>
            <Tag variant="moderate" data-color="accent">
                Reserverte stillinger
            </Tag>
        </Box>
    );
}
export default DirektemeldtStilling;
