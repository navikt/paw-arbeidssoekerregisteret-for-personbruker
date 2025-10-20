import { Alert, Heading } from '@navikt/ds-react';

export function KvitteringAvmeldt() {
    return (
        <Alert variant={'info'}>
            <Heading size="small" level="3">
                Den er grei
            </Heading>
            Vi vil ikke vise deg forslag på ledige stillinger
        </Alert>
    );
}
