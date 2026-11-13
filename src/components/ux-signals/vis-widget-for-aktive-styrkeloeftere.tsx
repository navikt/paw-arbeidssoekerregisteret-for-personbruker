import type { BoxProps } from '@navikt/ds-react/Box';
import UxSignalsClientSideWidget from '@/components/ux-signals/ux-signals-client-side-widget';
import type { Brukerprofil } from '@/model/brukerprofil';

interface WidgetProps {
    brukerprofil?: Brukerprofil;
    marginBlock?: BoxProps['marginBlock'];
}

export default function VisWidgetForAktiveStyrkeloeftere(props: WidgetProps) {
    // TEMP - utkommenteres for og brukes i komponent hvor vi *vet* at bruker er aktiv
    //
    // const { brukerprofil } = props;
    // const erAktiv = 'AKTIV' as Tjenestestatus;
    //
    // if (!brukerprofil) return null;
    //
    // const skalHaWidget = brukerprofil.tjenestestatus === erAktiv;
    //
    // if (!skalHaWidget) return null;

    return <UxSignalsClientSideWidget marginBlock={props.marginBlock} erDemo={false} />;
}
