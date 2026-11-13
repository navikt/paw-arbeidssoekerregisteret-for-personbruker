import { Buildings3Icon, LocationPinIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Box, Heading, HStack, Link, VStack } from '@navikt/ds-react';
import { loggStyrkeloft } from '@/lib/tracking';
import type { JobbAnnonse } from '@/model/brukerprofil';
import styles from './stillingskort.module.css';

interface Props {
    ledigStilling: JobbAnnonse;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        soknadsfrist: 'Søknadsfrist',
    },
    nn: {
        soknadsfrist: 'Søknadsfrist',
    },
    en: {
        soknadsfrist: 'Application deadline',
    },
};

function LedigStilling(props: Props) {
    const { ledigStilling, sprak } = props;
    const ledigStillingUrl = `https://arbeidsplassen.nav.no/stillinger/stilling/${ledigStilling.arbeidsplassenNoId}`;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box
            paddingBlock="space-16"
            paddingInline="space-16 space-8"
            borderRadius="8"
            borderColor={'neutral-subtle'}
            borderWidth={'1'}
        >
            <Heading level={'2'} size={'small'} className={styles.tittel}>
                <Link
                    href={ledigStillingUrl}
                    onClick={() => loggStyrkeloft({ aktivitet: 'Går til annonse på arbeidsplassen' })}
                >
                    {ledigStilling.tittel}
                </Link>
            </Heading>
            <Box asChild marginBlock="space-8 space-16">
                <BodyShort weight="semibold">{ledigStilling.stillingbeskrivelse}</BodyShort>
            </Box>
            <VStack gap="space-1">
                <HStack gap="space-2">
                    <Buildings3Icon aria-hidden="true" fontSize="1.5rem" />
                    <BodyShort>{ledigStilling.selskap}</BodyShort>
                </HStack>
                <HStack gap="space-2">
                    <LocationPinIcon aria-hidden="true" fontSize="1.5rem" />
                    <BodyShort>{ledigStilling.kommune}</BodyShort>
                </HStack>
            </VStack>
            <Box asChild marginBlock="space-16 space-0">
                <BodyShort weight="semibold" textColor="subtle">
                    <span>{tekst('soknadsfrist')}:</span> {ledigStilling.soeknadsfrist?.raw}
                </BodyShort>
            </Box>
        </Box>
    );
}

export default LedigStilling;
