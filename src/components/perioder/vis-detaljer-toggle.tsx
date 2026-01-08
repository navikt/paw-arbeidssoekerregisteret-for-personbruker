'use client';

import { Switch } from '@navikt/ds-react';
import { useShowDetails } from '@/contexts/show-details-context';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

const TEKSTER = {
    nb: { tittel: 'Vis detaljer' },
    nn: { tittel: 'Vis detaljar' },
    en: { tittel: 'Show details' },
};

export function VisDetaljerToggle({ sprak }: { sprak: Sprak }) {
    const { showDetails, setShowDetails } = useShowDetails();
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Switch checked={showDetails} onChange={(e) => setShowDetails(e.target.checked)}>
            {tekst('tittel')}
        </Switch>
    );
}
