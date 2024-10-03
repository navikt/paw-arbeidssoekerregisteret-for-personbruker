import { Alert } from '@navikt/ds-react';

export default function Feilmelding() {
    return (
        <Alert variant={'error'} className={'my-8'}>
            Noe gikk dessverre galt. Forsøk igjen, eller kontakt NAV.
        </Alert>
    );
}
