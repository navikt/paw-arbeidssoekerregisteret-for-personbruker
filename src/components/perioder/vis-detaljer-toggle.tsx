'use client';

import { Switch } from '@navikt/ds-react';
import { useShowDetails } from '@/contexts/show-details-context';

export function VisDetaljerToggle() {
    const { showDetails, setShowDetails } = useShowDetails();

    return (
        <Switch checked={showDetails} onChange={(e) => setShowDetails(e.target.checked)}>
            Vis detaljer
        </Switch>
    );
}
