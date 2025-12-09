import { BodyShort, Box, HGrid } from '@navikt/ds-react';
import LedigStilling from '@/components/styrkløft/ledig-stilling';
import { LinkTilArbeidsplassen } from '@/components/styrkløft/link-til-arbeidsplassen';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import Paginering from '@/components/styrkløft/paginering';
import { Ref } from 'react';

interface Props {
    ref?: Ref<HTMLDivElement>;
    resultat: any[];
    soek: any;
    sprak: Sprak;
    antallSider: number;
    aktivSide: number;
    onClick: (side: any) => void;
    brukPaginering: boolean;
}

const TEKSTER = {
    nb: {
        ingenTreff: 'Ingen treff',
        endreYrkeskategorier: 'Du kan forsøke å endre valgene dine for yrkeskategori i det lagrede søket',
    },
    nn: {
        ingenTreff: 'Ingen treff',
        endreYrkeskategorier: 'Du kan prøva å endra vala dine for yrkeskategori i det lagra søket',
    },
    en: {
        ingenTreff: 'No matches',
        endreYrkeskategorier: 'You can try changing your job category selections in the saved search',
    },
};

function LedigeStillingerStateless(props: Props) {
    const { resultat, soek, sprak, brukPaginering, ref } = props;
    const harTreff = resultat && resultat.length > 0;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box ref={ref}>
            {!harTreff && (
                <Box className="mb-2">
                    <BodyShort>{tekst('ingenTreff')}</BodyShort>
                    <BodyShort>{tekst('endreYrkeskategorier')}.</BodyShort>
                </Box>
            )}
            {harTreff && (
                <>
                    <HGrid gap="space-24" columns={{ sm: 1 }} className={'mb-4'}>
                        {resultat.map((stilling) => (
                            <LedigStilling ledigStilling={stilling} key={stilling.tittel} />
                        ))}
                    </HGrid>
                    {brukPaginering && (
                        <div className={'mb-4 flex justify-center'}>
                            <Paginering {...props} />
                        </div>
                    )}
                </>
            )}
            <LinkTilArbeidsplassen stedSoek={soek} sprak={sprak} />
        </Box>
    );
}

export default LedigeStillingerStateless;
