import { Buildings3Icon, LocationPinIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Box, Heading, HStack, Link, Tag, VStack } from '@navikt/ds-react';
import { loggDirektemeldtStillinger } from '@/lib/tracking';
import type { JobbAnnonse } from '@/model/brukerprofil';
import styles from './stillingskort.module.css';

interface Props {
    ledigStilling: JobbAnnonse;
    sprak: Sprak;
    jobbmuligheterUrl?: string;
}

const TEKSTER = {
    nb: {
        soknadsfrist: 'Søknadsfrist',
        reserverteStillinger: 'Vises til begrenset antall jobbsøkere',
    },
    nn: {
        soknadsfrist: 'Søknadsfrist',
        reserverteStillinger: 'Blir vist til eit avgrensa tal jobbsøkjarar',
    },
    en: {
        soknadsfrist: 'Application deadline',
        reserverteStillinger: 'Shown to a limited number of job seekers',
    },
};
function DirektemeldtStilling(props: Props) {
    const { ledigStilling, sprak, jobbmuligheterUrl } = props;
    const ledigStillingUrl = `${jobbmuligheterUrl}/stilling/${ledigStilling.arbeidsplassenNoId}`;
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
                    onClick={() => loggDirektemeldtStillinger({ aktivitet: 'Går til annonse på arbeidsplassen' })}
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
            <Box asChild marginBlock="space-16">
                <BodyShort weight="semibold" textColor="subtle">
                    <span>{tekst('soknadsfrist')}:</span> {ledigStilling.soeknadsfrist?.raw}
                </BodyShort>
            </Box>
            <Tag variant="moderate" data-color="accent">
                {tekst('reserverteStillinger')}
            </Tag>
        </Box>
    );
}
export default DirektemeldtStilling;
