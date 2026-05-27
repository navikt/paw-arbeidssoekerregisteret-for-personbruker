import { UxSignalsComponent, type UxSignalsWidgetProps } from '@/components/ux-signals/ux-signals-component';
import { isEnabled } from '@/lib/unleash-is-enabled';
import unleashKeys from '@/unleash-keys';

export default async function UxSignalsWidget(props: UxSignalsWidgetProps) {
    const { erDemo } = props;
    const erUndersoekelseAktiv = await isEnabled(unleashKeys.BRUK_UXSIGNALS);

    if (!erUndersoekelseAktiv) return null;

    return <UxSignalsComponent erDemo={erDemo} className={props.className} />;
}
