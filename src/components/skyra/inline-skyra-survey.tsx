'use client';

import { isConsentingToSurveys } from '@/lib/tracking/common';

interface Props {}

export default function InlineSkyraSurvey(props: Props) {
    if (!isConsentingToSurveys()) return null;

    return (
        // @ts-expect-error
        <skyra-survey
            slug="arbeids-og-velferdsetaten-nav/test-undersokelse"
            style={{
                border: '1px solid rgba(7, 26, 54, .21)',
                padding: '0.5rem 1rem',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, .15), 0px 0px 1px 0px rgba(0, 0, 0, .2)',
                borderRadius: '8px',
                '--skyra-bg-color': '#fff',
                '--skyra-text-color': '#000',
                '--skyra-action-text-color': '#fff',
                '--skyra-action-color': 'rgba(0, 103, 197, 1)',
            }}
            // @ts-expect-error
        ></skyra-survey>
    );
}
