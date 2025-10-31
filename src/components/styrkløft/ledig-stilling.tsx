import { BodyShort, Box, CopyButton, Heading, HStack, VStack } from '@navikt/ds-react';
import { Buildings3Icon, LocationPinIcon, FilesIcon, CheckmarkIcon } from '@navikt/aksel-icons';

import { StyrkeloftEventNavn } from '@/lib/tracking/common';

interface Props {
    ledigStilling: any;
}

function LedigStilling(props: Props) {
    const { ledigStilling } = props;
    const ledigStillingUrl = `https://arbeidsplassen.nav.no/stillinger/stilling/${ledigStilling.arbeidsplassenNoId}`;

    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <Heading level={'2'} size={'small'}>
                <a
                    data-umami-event={StyrkeloftEventNavn}
                    data-umami-event-aktivitet="Går til annonse på arbeidsplassen"
                    href={ledigStillingUrl}
                >
                    {ledigStilling.tittel}
                </a>
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
            <Box className="flex justify-between">
                <BodyShort weight="semibold" textColor="subtle" className={'mt-4'}>
                    {ledigStilling.soeknadsfrist?.raw}
                </BodyShort>
                <CopyButton
                    copyText={ledigStillingUrl}
                    icon={<FilesIcon title="Kopier lenke til den ledige stillingen" />}
                    activeIcon={<CheckmarkIcon title="Kopierte lenke til stillingen" />}
                    data-umami-event={StyrkeloftEventNavn}
                    data-umami-event-aktivitet="Går til søk på arbeidsplassen"
                />
            </Box>
        </Box>
    );
}

export default LedigStilling;
