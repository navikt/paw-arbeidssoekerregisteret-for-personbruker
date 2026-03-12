import { Brukerprofil, Tjenestestatus } from '@/model/brukerprofil';
import UxSignalsClientSideWidget from '@/components/ux-signals/ux-signals-client-side-widget';

interface WidgetProps {
    brukerprofil: Brukerprofil;
    className?: string;
}

export default function VisWidgetForAktiveStyrkeloeftere(props: WidgetProps) {
    const { brukerprofil } = props;
    const erAktiv = 'AKTIV' as Tjenestestatus;

    if (!brukerprofil) return null;

    const skalHaWidget = brukerprofil.tjenestestatus === erAktiv;

    if (!skalHaWidget) return null;

    return (
        <>
            <style jsx>{`
                :global(.uxsignals-container) {
                    background-color: pink;
                }
            `}</style>
            <UxSignalsClientSideWidget className={props.className} erDemo={false} />
        </>
    );
}
