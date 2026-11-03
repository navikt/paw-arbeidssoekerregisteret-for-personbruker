import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { ReactNode } from 'react';

interface BekreftelseSideProps {
    sprak: Sprak;
    children: ReactNode;
}

function BekreftelseSide({ children }: BekreftelseSideProps) {
    return <div className="flex flex-col max-w-3xl mx-auto py-8">{children}</div>;
}

export default BekreftelseSide;
