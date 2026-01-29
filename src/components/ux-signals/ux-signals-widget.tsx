import Script from 'next/script';
import { Box } from '@navikt/ds-react';

import { isEnabled } from '@/lib/unleash-is-enabled';
import unleashKeys from '@/unleash-keys';

interface UxSignalsWidgetProps {
    erDemo?: boolean;
}

const uxSignalsUndersoekelseId = 'panel-sg6fwvepqu';

export default async function UxSignalsWidget(props: UxSignalsWidgetProps) {
    const { erDemo } = props;
    const erUndersoekelseAktiv = await isEnabled(unleashKeys.BRUK_UXSIGNALS);

    if (!erUndersoekelseAktiv) return null;

    return (
        <Box background="default" borderRadius="8" borderColor={'neutral-subtle'} className="mb-8 mt-8">
            <div data-uxsignals-embed={uxSignalsUndersoekelseId} data-uxsignals-mode={erDemo ? 'demo' : ''}></div>
            <Script type="module" strategy="lazyOnload" src="https://widget.uxsignals.com/embed.js" />
        </Box>
    );
}
