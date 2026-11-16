import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, HGrid, HStack, InlineMessage, ToggleGroup } from '@navikt/ds-react';
import type { Ref } from 'react';
import DirektemeldtStilling from '@/components/styrkloft/direktemeldt-stilling';
import LedigStilling from '@/components/styrkloft/ledig-stilling';
import type { AktivFane } from '@/components/styrkloft/ledige-stillinger';
import { LinkTilArbeidsplassen } from '@/components/styrkloft/link-til-arbeidsplassen';
import { LinkTilDirektemeldteStillinger } from '@/components/styrkloft/link-til-direktemeldte-stillinger';
import Paginering from '@/components/styrkloft/paginering';
import VisWidgetForAktiveStyrkeloeftere from '@/components/ux-signals/vis-widget-for-aktive-styrkeloeftere';
import type { JobbAnnonse } from '@/model/brukerprofil';

interface Props {
    ref?: Ref<HTMLDivElement>;
    resultat: JobbAnnonse[];
    soek: any;
    sprak: Sprak;
    jobbmuligheterUrl?: string;
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
        direktemeldteStillinger: 'Reserverte stillinger',
        ledigeStillinger: 'Ledige stillinger',
        direktemeldteStillingerInfo:
            'Reserverte stillinger vises kun til registrerte arbeidssøkere og gir deg større sjanse til å bli vurdert av arbeidsgivere',
    },
    nn: {
        ingenTreff: 'Ingen treff',
        direktemeldteStillinger: 'Reserverte stillingar',
        ledigeStillinger: 'Ledige stillingar',
        direktemeldteStillingerInfo:
            'Reserverte stillingar blir berre viste til registrerte arbeidssøkjarar og gir deg større sjanse til å bli vurdert av arbeidsgivarar',
    },
    en: {
        ingenTreff: 'No matches',
        direktemeldteStillinger: 'Reserved jobs',
        ledigeStillinger: 'Open positions',
        direktemeldteStillingerInfo:
            'Reserved jobs are shown only to registered job seekers and give you a better chance of being considered by employers',
    },
};

function LedigeStillingerStateless(props: Props) {
    const {
        resultat,
        soek,
        sprak,
        jobbmuligheterUrl,
        brukPaginering,
        ref,
        kanSeDirektemeldteStillinger,
        aktivFane,
        onAktivFaneChange,
    } = props;
    const harTreff = resultat && resultat.length > 0;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Box ref={ref}>
            {kanSeDirektemeldteStillinger && (
                <>
                    <Box asChild marginBlock="space-0 space-16">
                        <InlineMessage status={'info'}>{tekst('direktemeldteStillingerInfo')}</InlineMessage>
                    </Box>
                    <Box asChild marginBlock="space-0 space-16">
                        <ToggleGroup value={aktivFane} onChange={(value) => onAktivFaneChange(value as AktivFane)}>
                            <ToggleGroup.Item value={'direktemeldteStillinger'}>
                                {tekst('direktemeldteStillinger')}
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value={'ledigeStillinger'}>{tekst('ledigeStillinger')}</ToggleGroup.Item>
                        </ToggleGroup>
                    </Box>
                </>
            )}
            {!harTreff && (
                <Box marginBlock="space-0 space-16" padding="space-16" background="info-soft">
                    {tekst('ingenTreff')}
                </Box>
            )}
            {harTreff && (
                <>
                    <Box asChild marginBlock="space-0 space-16">
                        <HGrid gap="space-24" columns={{ sm: 1 }}>
                            {resultat.map((stilling) => {
                                const erDirekteMeldtStilling = (stilling.tags || []).includes('DIREKTEMELDT_V1');
                                return erDirekteMeldtStilling ? (
                                    <DirektemeldtStilling
                                        ledigStilling={stilling}
                                        key={stilling.arbeidsplassenNoId}
                                        sprak={sprak}
                                        jobbmuligheterUrl={jobbmuligheterUrl}
                                    />
                                ) : (
                                    <LedigStilling
                                        ledigStilling={stilling}
                                        key={stilling.arbeidsplassenNoId}
                                        sprak={sprak}
                                    />
                                );
                            })}
                        </HGrid>
                    </Box>
                    {brukPaginering && (
                        <Box asChild marginBlock="space-0 space-16">
                            <HStack justify="center">
                                <Paginering {...props} />
                            </HStack>
                        </Box>
                    )}
                </>
            )}
            {kanSeDirektemeldteStillinger && aktivFane === 'direktemeldteStillinger' ? (
                <LinkTilDirektemeldteStillinger sprak={sprak} jobbmuligheterUrl={jobbmuligheterUrl} />
            ) : (
                <LinkTilArbeidsplassen stedSoek={soek} sprak={sprak} />
            )}
            <VisWidgetForAktiveStyrkeloeftere marginBlock="space-16 space-0" />
        </Box>
    );
}

export default LedigeStillingerStateless;
