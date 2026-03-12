import { Brukerprofil } from '@/model/brukerprofil';
import UxSignalsClientSideWidget from '@/components/ux-signals/ux-signals-client-side-widget';

interface WidgetProps {
    brukerprofil?: Brukerprofil;
    className?: string;
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

    return (
        <>
            <style jsx>{`
                :global(.uxsignals-container) {
                    background-color: var(--ax-bg-meta-purple-soft) !important;
                }
            `}</style>
            <UxSignalsClientSideWidget className={props.className} erDemo={false} />
        </>
    );
}
