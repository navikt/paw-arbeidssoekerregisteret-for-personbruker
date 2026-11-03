import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Heading, Loader } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { SeHistorikkLenke } from '@/components/historikk/se-historikk-lenke';
import PeriodeInfo from '@/components/min-situasjon/periode-info';
import ManglerOpplysninger from '@/components/opplysninger/mangler-opplysninger';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import RegistrerArbeidssoker from '@/components/registrer-arbeidssoker/registrer-arbeidssoker';
import RegistrertTittel from '@/components/registrert-tittel/registrert-tittel';

const SIDETITTEL = {
    nb: 'Arbeidssøkerregisteret',
    nn: 'Arbeidssøkarregisteret',
    en: 'Jobseeker register',
};

interface HovedsideRammeProps {
    children: ReactNode;
}

function HovedsideRamme({ children }: HovedsideRammeProps) {
    return <div className="flex flex-col max-w-3xl mx-auto px-4">{children}</div>;
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
                    <Heading level="1" size="xlarge">
                        {sidetittel}
                    </Heading>
                    {error}
                </>
            ) : loading ? (
                <>
                    <Heading level="1" size="xlarge">
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
                        <div className="my-4">
                            <OpplysningerOppsummering
                                snapshot={snapshot}
                                sprak={sprak}
                                oppdaterOpplysningerUrl={oppdaterOpplysningerUrl}
                                visEndreLink={innloggingsNivaa === 'idporten-loa-high'}
                            />
                        </div>
                    )}
                    {Boolean(snapshot?.id) && !snapshot?.avsluttet && !snapshot?.opplysning && (
                        <div className="my-4">
                            <ManglerOpplysninger
                                sprak={sprak}
                                oppdaterOpplysningerUrl={oppdaterOpplysningerUrl}
                                visAdvarsel={innloggingsNivaa !== 'idporten-loa-high'}
                            />
                        </div>
                    )}
                    {(!snapshot?.id || snapshot?.avsluttet) && (
                        <RegistrerArbeidssoker
                            className="my-4"
                            registrerArbeidssokerUrl={registrerArbeidssokerUrl}
                            sprak={sprak}
                        />
                    )}
                    {snapshot && <SeHistorikkLenke sprak={sprak} />}
                </>
            )}
        </>
    );
}

export { HovedsideInnhold, HovedsideRamme };
