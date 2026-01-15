'use client';

import { Process } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { useShowDetails } from '../../contexts/show-details-context';
import { prettyPrintDatoOgKlokkeslettKortform } from './helpers';
import { Source } from './source';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

type HendelseProps = {
    timestamp?: string;
    title: string;
    sprak: Sprak;
    children?: ReactNode;
};

const Hendelse: React.FC<HendelseProps> = ({ timestamp, title, sprak, children }) => {
    const { showDetails } = useShowDetails();
    return (
        <Process.Event
            timestamp={timestamp ? prettyPrintDatoOgKlokkeslettKortform(timestamp, 'nb', true) : undefined}
            status="completed"
            title={title}
        >
            {children && showDetails && <div className="pb-2">{children}</div>}
        </Process.Event>
    );
};

export { Hendelse };
