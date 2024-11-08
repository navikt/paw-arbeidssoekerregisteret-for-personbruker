import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

export interface NextPageProps {
    params: {
        lang?: Sprak;
    };
    searchParams: {
        [key:string]: string
    }
}
