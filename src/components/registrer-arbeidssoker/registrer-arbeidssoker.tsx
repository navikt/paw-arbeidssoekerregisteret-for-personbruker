'use client';

import { LinkPanel } from '@navikt/ds-react';

export default function RegistrerArbeidssoker(props: React.HTMLProps<any>) {
    return (
        <LinkPanel href={process.env.REGISTRER_ARBEIDSSOKER_URL} className={props.className ?? ''}>
            <LinkPanel.Title>Registrer deg som arbeidssøker</LinkPanel.Title>
        </LinkPanel>
    );
}
