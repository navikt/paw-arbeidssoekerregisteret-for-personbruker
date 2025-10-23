import { Box, HGrid } from '@navikt/ds-react';
import LedigStilling from '@/components/styrkløft/ledig-stilling';
import { LinkTilArbeidsplassen } from '@/components/styrkløft/link-til-arbeidsplassen';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    resultat: any[];
    soek: any;
    sprak: Sprak;
}

function LedigeStillingerStateless(props: Props) {
    const { resultat, soek, sprak } = props;

    if (!resultat || resultat.length === 0) {
        return null;
    }

    return (
        <Box>
            <HGrid gap="space-24" columns={{ sm: 1, md: 2 }} className={'mb-4'}>
                {resultat.map((stilling) => (
                    <LedigStilling ledigStilling={stilling} key={stilling.tittel} />
                ))}
            </HGrid>
            <LinkTilArbeidsplassen brukerprofil={soek} sprak={sprak} />
        </Box>
    );
}

export default LedigeStillingerStateless;
