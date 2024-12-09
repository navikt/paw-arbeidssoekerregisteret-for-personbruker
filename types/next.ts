import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

export interface NextPageProps {
    params: Promise<{
        lang?: Sprak;
    }>;
    searchParams: Promise<{
        [key: string]: string;
    }>;
}
