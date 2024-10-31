import { Alert, Heading, Loader } from '@navikt/ds-react';
import { fetchTilgjengeligeBekreftelser } from '@/app/bekreftelse/actions';
import { Suspense } from 'react';
import BekreftelseWrapper from '@/components/bekreftelse/bekreftelse-wrapper';
import { fetchSisteSamletInformasjon } from '@/app/actions';
import { hentSisteArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';

async function BekreftelseServerComponent() {
    const { data: tilgjengeligeBekreftelser, error } = await fetchTilgjengeligeBekreftelser();
    const { data: samletInformasjon, error: informasjonError } = await fetchSisteSamletInformasjon();

    if (error || informasjonError) {
        return <Alert variant={'error'}>Noe gikk dessverre galt</Alert>;
    }

    const sisteArbeidssokerPeriode = hentSisteArbeidssokerPeriode(samletInformasjon?.arbeidssoekerperioder ?? []);
    const erAktivArbeidssoker = !Boolean(sisteArbeidssokerPeriode?.avsluttet);
    const sistInnsendteBekreftelse = samletInformasjon?.bekreftelser[0];

    return (
        <BekreftelseWrapper
            sprak={'nb'}
            erAktivArbeidssoker={erAktivArbeidssoker}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
            sistInnsendteBekreftelse={sistInnsendteBekreftelse}
        />
    );
}

export default async function BekreftelsePage() {
    return (
        <div className={'flex flex-col items-center py-8'}>
            <Heading size={'large'} level={'1'}>
                Bekreftelse
            </Heading>
            <Suspense fallback={<Loader />}>
                <BekreftelseServerComponent />
            </Suspense>
        </div>
    );
}
