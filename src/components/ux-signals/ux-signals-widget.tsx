import Script from 'next/script';
import { ReactElement } from 'react';

import { isEnabled } from '@/lib/unleash-is-enabled';
import unleashKeys from '@/unleash-keys';

import styles from './ux-signals.module.css';

interface UxSignalsWidgetProps {
    erDemo?: boolean;
}

const uxSignalsUndersoekelseId = 'panel-sg6fwvepqu';

export default function UxSignalsWidget(props: UxSignalsWidgetProps): ReactElement | null {
    const { erDemo } = props;
    const erUndersoekelseAktiv = isEnabled(unleashKeys.BRUK_UXSIGNALS);

    if (!erUndersoekelseAktiv) return null;

    return (
        <>
            <div
                data-uxsignals-embed={uxSignalsUndersoekelseId}
                data-uxsignals-mode={erDemo ? 'demo' : ''}
                className={styles.uxSignalsContainer}
            ></div>
            <Script type="module" strategy="lazyOnload" src="https://widget.uxsignals.com/embed.js" />
        </>
    );
}
