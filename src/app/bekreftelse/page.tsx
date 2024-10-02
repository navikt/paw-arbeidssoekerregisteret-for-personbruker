import { Alert, Heading, Page } from '@navikt/ds-react';
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

    const erAktivArbeidssoker = !Boolean(hentSisteArbeidssokerPeriode(samletInformasjon?.arbeidssoekerperioder ?? [])?.avsluttet);

    return (
        <BekreftelseWrapper
            sprak={'nb'}
            erAktivArbeidssoker={erAktivArbeidssoker}
            tilgjengeligeBekreftelser={tilgjengeligeBekreftelser}
        />
    );
}

export default async function BekreftelsePage() {
    return (
        <div className={'flex flex-col items-center py-8'}>
            <Heading size={'large'} level={'1'}>
                Bekreftelse
            </Heading>
            <Suspense>
                <BekreftelseServerComponent />
            </Suspense>
        </div>
    );
}
