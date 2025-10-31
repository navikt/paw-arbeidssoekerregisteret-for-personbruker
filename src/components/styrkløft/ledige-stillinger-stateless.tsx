import { BodyShort, Box, HGrid } from '@navikt/ds-react';
import LedigStilling from '@/components/styrkløft/ledig-stilling';
import { LinkTilArbeidsplassen } from '@/components/styrkløft/link-til-arbeidsplassen';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    resultat: any[];
    soek: any;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        ingenTreff: 'Ingen treff',
    },
    en: {
        ingenTreff: 'No matches',
    },
};

function LedigeStillingerStateless(props: Props) {
    const { resultat, soek, sprak } = props;
    const harTreff = resultat && resultat.length > 0;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Box>
            {!harTreff && <BodyShort>{tekst('ingenTreff')}</BodyShort>}
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
