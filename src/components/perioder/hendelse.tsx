'use client';

import type { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Box, Process } from '@navikt/ds-react';
import type { ReactNode } from 'react';
import { useShowDetails } from '../../contexts/show-details-context';
import { prettyPrintDatoOgKlokkeslettKortform } from './helpers';
import { Source } from './source';

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
            {children && showDetails && <Box paddingBlock="space-0 space-8">{children}</Box>}
        </Process.Event>
    );
};

export { Hendelse };
