import { Box, HGrid, ToggleGroup } from '@navikt/ds-react';
import LedigStilling from '@/components/styrkløft/ledig-stilling';
import { LinkTilArbeidsplassen } from '@/components/styrkløft/link-til-arbeidsplassen';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import Paginering from '@/components/styrkløft/paginering';
import { Ref } from 'react';
import VisWidgetForAktiveStyrkeloeftere from '@/components/ux-signals/vis-widget-for-aktive-styrkeloeftere';
import { AktivFane } from '@/components/styrkløft/ledige-stillinger';
import DirektemeldtStilling from '@/components/styrkløft/direktemeldt-stilling';
import { JobbAnnonse } from '@/model/brukerprofil';

interface Props {
    ref?: Ref<HTMLDivElement>;
    resultat: JobbAnnonse[];
    soek: any;
    sprak: Sprak;
    antallSider: number;
    aktivSide: number;
    onClick: (side: any) => void;
    brukPaginering: boolean;
    kanSeDirektemeldteStillinger: boolean;
    aktivFane?: AktivFane;
    onAktivFaneChange: (fane: AktivFane) => void;
}

const TEKSTER = {
    nb: {
        ingenTreff: 'Ingen treff',
    },
    nn: {
        ingenTreff: 'Ingen treff',
    },
    en: {
        ingenTreff: 'No matches',
    },
};

function LedigeStillingerStateless(props: Props) {
    const { resultat, soek, sprak, brukPaginering, ref, kanSeDirektemeldteStillinger, aktivFane, onAktivFaneChange } =
        props;
    const harTreff = resultat && resultat.length > 0;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box ref={ref}>
            {kanSeDirektemeldteStillinger && (
                <ToggleGroup
                    value={aktivFane}
                    onChange={(value) => onAktivFaneChange(value as AktivFane)}
                    className={'mb-4'}
                >
                    <ToggleGroup.Item value={'direktemeldteStillinger'}>Reserverte jobber</ToggleGroup.Item>
                    <ToggleGroup.Item value={'ledigeStillinger'}>Ledige stillinger</ToggleGroup.Item>
                </ToggleGroup>
            )}
            {!harTreff && (
                <Box className="mb-4" padding="space-16" background="info-soft">
                    {tekst('ingenTreff')}
                </Box>
            )}
            {harTreff && (
                <>
                    <HGrid gap="space-24" columns={{ sm: 1 }} className={'mb-4'}>
                        {resultat.map((stilling) => {
                            const erDirekteMeldtStilling = (stilling.tags || []).includes('DIREKTEMELDT_V1');
                            return erDirekteMeldtStilling ? (
                                <DirektemeldtStilling ledigStilling={stilling} key={stilling.arbeidsplassenNoId} />
                            ) : (
                                <LedigStilling ledigStilling={stilling} key={stilling.arbeidsplassenNoId} />
                            );
                        })}
                    </HGrid>
                    {brukPaginering && (
                        <div className={'mb-4 flex justify-center'}>
                            <Paginering {...props} />
                        </div>
                    )}
                </>
            )}
            <VisWidgetForAktiveStyrkeloeftere className={'mb-4'} />
            <LinkTilArbeidsplassen stedSoek={soek} sprak={sprak} />
        </Box>
    );
}

export default LedigeStillingerStateless;
