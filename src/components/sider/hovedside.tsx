import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Box, Heading, Loader, VStack } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import type { ReactNode } from 'react';
import { SeHistorikkLenke } from '@/components/historikk/se-historikk-lenke';
import PeriodeInfo from '@/components/min-situasjon/periode-info';
import ManglerOpplysninger from '@/components/opplysninger/mangler-opplysninger';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';
import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';
import styles from './hovedside.module.css';

const SIDETITTEL = {
    nb: 'Arbeidssøkerregisteret',
    nn: 'Arbeidssøkarregisteret',
    en: 'Jobseeker register',
};

interface HovedsideRammeProps {
    children: ReactNode;
}

function HovedsideRamme({ children }: HovedsideRammeProps) {
    return (
        <PageBlock width="md">
            <Box asChild paddingInline="space-16">
                <VStack>{children}</VStack>
            </Box>
        </PageBlock>
    );
}

interface HovedsideInnholdProps {
    sprak: Sprak;
    snapshot?: Snapshot;
    innloggingsNivaa?: string;
    registrerArbeidssokerUrl: string;
    oppdaterOpplysningerUrl: string;
    bekreftelse?: ReactNode;
    egenvurdering?: ReactNode;
    styrk?: ReactNode;
    error?: ReactNode;
    loading?: boolean;
}

function HovedsideInnhold({
    sprak,
    snapshot,
    innloggingsNivaa,
    registrerArbeidssokerUrl,
    oppdaterOpplysningerUrl,
    bekreftelse,
    egenvurdering,
    styrk,
    error,
    loading = false,
}: HovedsideInnholdProps) {
    const sidetittel = SIDETITTEL[sprak as keyof typeof SIDETITTEL] ?? SIDETITTEL.nb;

    return (
        <>
            {error ? (
                <>
                    <Heading level="1" size="xlarge" className={styles.sidetittel}>
                        {sidetittel}
                    </Heading>
                    {error}
                </>
            ) : loading ? (
                <>
                    <Heading level="1" size="xlarge" className={styles.sidetittel}>
                        {sidetittel}
                    </Heading>
                    <Loader />
                </>
            ) : (
                <>
                    <RegistrertTittel snapshot={snapshot} sprak={sprak} />
                    <PeriodeInfo snapshot={snapshot} sprak={sprak} />
                    {bekreftelse}
                    {egenvurdering}
                    {Boolean(snapshot?.id) && !snapshot?.avsluttet && styrk && <>{styrk}</>}
                    {Boolean(snapshot?.id) && !snapshot?.avsluttet && snapshot?.opplysning && (
                        <Box marginBlock="space-16">
                            <OpplysningerOppsummering
                                snapshot={snapshot}
                                sprak={sprak}
                                oppdaterOpplysningerUrl={oppdaterOpplysningerUrl}
                                visEndreLink={innloggingsNivaa === 'idporten-loa-high'}
                            />
                        </Box>
                    )}
                    {Boolean(snapshot?.id) && !snapshot?.avsluttet && !snapshot?.opplysning && (
                        <Box marginBlock="space-16">
                            <ManglerOpplysninger
                                sprak={sprak}
                                oppdaterOpplysningerUrl={oppdaterOpplysningerUrl}
                                visAdvarsel={innloggingsNivaa !== 'idporten-loa-high'}
                            />
                        </Box>
                    )}
                    {(!snapshot?.id || snapshot?.avsluttet) && (
                        <Box marginBlock="space-16">
                            <RegistrerArbeidssoker registrerArbeidssokerUrl={registrerArbeidssokerUrl} sprak={sprak} />
                        </Box>
                    )}
                    {snapshot && <SeHistorikkLenke sprak={sprak} />}
                </>
            )}
        </>
    );
}

export { HovedsideInnhold, HovedsideRamme };
