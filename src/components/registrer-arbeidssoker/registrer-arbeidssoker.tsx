'use client';

import { LinkPanel } from '@navikt/ds-react';
import { loggAktivitet } from '@/lib/amplitude';

interface Props extends React.HTMLProps<any> {
    registrerArbeidssokerUrl: string;
}

export default function RegistrerArbeidssoker(props: Props) {
    return (
        <LinkPanel
            style={{ background: 'var(--a-surface-action-subtle)' }}
            href={props.registrerArbeidssokerUrl}
            className={props.className ?? ''}
            onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Registrer deg som arbeidssøker"' })}
        >
            <LinkPanel.Title>Registrer deg som arbeidssøker</LinkPanel.Title>
        </LinkPanel>
    );
}
