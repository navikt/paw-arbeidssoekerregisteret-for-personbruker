import { BodyShort, Box, CopyButton, Heading, HStack, Link, VStack } from '@navikt/ds-react';
import { Buildings3Icon, CheckmarkIcon, FilesIcon, LocationPinIcon } from '@navikt/aksel-icons';

import { loggStyrkeloft } from '@/lib/tracking';
import { JobbAnnonse } from '@/model/brukerprofil';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    ledigStilling: JobbAnnonse;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        soeknadsfrist: 'Søknadsfrist',
    },
    nn: {
        soeknadsfrist: 'Søknadsfrist',
    },
    en: {
        soeknadsfrist: 'Application deadline',
    },
};

function LedigStilling(props: Props) {
    const { ledigStilling, sprak } = props;
    const ledigStillingUrl = `https://arbeidsplassen.nav.no/stillinger/stilling/${ledigStilling.arbeidsplassenNoId}`;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

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
            <Box className="flex justify-between">
                <BodyShort weight="semibold" textColor="subtle" className={'mt-4'}>
                    <label>{tekst('soknadsfrist')}:</label> {ledigStilling.soeknadsfrist?.raw}
                </BodyShort>
                <CopyButton
                    copyText={ledigStillingUrl}
                    icon={<FilesIcon title="Kopier lenke til den ledige stillingen" />}
                    activeIcon={<CheckmarkIcon title="Kopierte lenke til stillingen" />}
                    onClick={() => loggStyrkeloft({ aktivitet: 'Kopierer lenke til stilling' })}
                    className={'hidden md:block'}
                />
            </Box>
        </Box>
    );
}

export default LedigStilling;
