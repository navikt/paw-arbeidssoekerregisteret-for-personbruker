import { BodyShort, Box, HGrid } from '@navikt/ds-react';
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
    const harTreff = resultat && resultat.length > 0;
    return (
        <Box>
            {!harTreff && <BodyShort>Ingen treff</BodyShort>}
            {harTreff && (
                <HGrid gap="space-24" columns={{ sm: 1 }} className={'mb-4'}>
                    {resultat.map((stilling) => (
                        <LedigStilling ledigStilling={stilling} key={stilling.tittel} />
                    ))}
                </HGrid>
            )}
            <LinkTilArbeidsplassen stedSoek={soek} sprak={sprak} />
        </Box>
    );
}

export default LedigeStillingerStateless;
