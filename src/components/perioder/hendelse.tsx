'use client';

import { Process } from '@navikt/ds-react';
import { ReactNode } from 'react';
import { useShowDetails } from '../../contexts/show-details-context';
import { prettyPrintDatoOgKlokkeslettKortform } from './helpers';
import { Source } from './source';

type HendelseProps = {
    timestamp?: string;
    title: string;
    kilde: string;
    children?: ReactNode;
};

const Hendelse: React.FC<HendelseProps> = ({ timestamp, title, kilde, children }) => {
    const { showDetails } = useShowDetails();
    return (
        <Process.Event
            timestamp={prettyPrintDatoOgKlokkeslettKortform(timestamp || '', 'nb', true)}
            status="completed"
            title={title}
        >
            <Source source={kilde || 'UVENTET_KILDE'} />
            {children && showDetails && <div className="pb-2">{children}</div>}
        </Process.Event>
    );
};

export { Hendelse };
