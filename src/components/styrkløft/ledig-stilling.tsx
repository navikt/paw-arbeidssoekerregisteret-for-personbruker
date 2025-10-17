import { BodyShort, Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { Buildings3Icon } from '@navikt/aksel-icons';

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
            <BodyShort weight="semibold" className={'mt-2 mb-4'}>{ledigStilling.underTittel}</BodyShort>
            <VStack gap="space-1">
                <HStack gap="space-2">
                    <Buildings3Icon title="a11y-title" fontSize="1.5rem" />
                    <BodyShort>{ledigStilling.arbeidsgiver}</BodyShort>
                </HStack>
                <HStack gap="space-2">
                    <Buildings3Icon title="a11y-title" fontSize="1.5rem" />
                    <BodyShort>{ledigStilling.sted}</BodyShort>
                </HStack>
            </VStack>
            <BodyShort weight="semibold" textColor="subtle" className={'mt-4'}>{ledigStilling.soknadsFrist}</BodyShort>
        </Box>
    );
}

export default LedigStilling;
