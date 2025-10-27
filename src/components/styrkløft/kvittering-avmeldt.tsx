import { Alert, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

const TEKSTER = {
    nb: {
        heading: 'Valget ditt er registrert',
        body: 'Vi vil ikke vise deg forslag på ledige stillinger',
    },
};

interface KvitteringAvmeldtProps {
    sprak: Sprak;
}

export function KvitteringAvmeldt(props: KvitteringAvmeldtProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Alert variant={'info'}>
            <Heading size="small" level="3">
                {tekst('heading')}
            </Heading>
            {tekst('body')}
        </Alert>
    );
}
