import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';

import UxSignalsWidget from './ux-signals-widget';

interface WidgetProps {
    brukerprofil: Brukerprofil;
}

export default function VisWidgetForAktiveStyrkeloeftere(props: WidgetProps) {
    const { brukerprofil } = props;
    const erAktiv = 'AKTIV' as Tjenestestatus;

    if (!brukerprofil) return null;

    const skalHaWidget = brukerprofil.tjenestestatus === erAktiv;

    if (!skalHaWidget) return null;

    return <UxSignalsWidget />;
}
