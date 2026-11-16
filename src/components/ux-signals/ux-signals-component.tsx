import { Box, type BoxProps } from '@navikt/ds-react/Box';
import Script from 'next/script';

export interface UxSignalsWidgetProps {
    erDemo?: boolean;
    marginBlock?: BoxProps['marginBlock'];
}

const uxSignalsUndersoekelseId = 'panel-sg6fwvepqu';

export const UxSignalsComponent = (props: UxSignalsWidgetProps) => {
    return (
        <Box background="default" borderRadius="8" borderColor={'neutral-subtle'} marginBlock={props.marginBlock}>
            <div data-uxsignals-embed={uxSignalsUndersoekelseId} data-uxsignals-mode={props.erDemo ? 'demo' : ''}></div>
            <Script type="module" strategy="lazyOnload" src="https://widget.uxsignals.com/embed.js" />
        </Box>
    );
};
