import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { Buildings3Icon, LocationPinIcon } from '@navikt/aksel-icons';

interface Props {
    ledigStilling: any;
}

function LedigStilling(props: Props) {
    const { ledigStilling } = props;
    return (
        <Box
            padding="space-16"
            borderRadius="large"
            shadow="xsmall">
            <Heading level={'2'} size={'small'}>
                <a href={`https://arbeidsplassen.nav.no/stillinger/stilling/${ledigStilling.uuid}`}>
                    {ledigStilling.tittel}
                </a>
            </Heading>
            <BodyShort weight="semibold" className={'mt-2 mb-4'}>{ledigStilling.stillingbeskrivelse}</BodyShort>
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
            <BodyShort weight="semibold" textColor="subtle" className={'mt-4'}>{ledigStilling.soknadsfrist?.raw}</BodyShort>
        </Box>
    );
}

export default LedigStilling;
