'use client';

import { isConsentingToSurveys } from '@/lib/tracking/common';

interface Props {}

export default function InlineSkyraSurvey(props: Props) {
    if (!isConsentingToSurveys()) return null;

    // @ts-ignore
    return <skyra-survey slug="arbeids-og-velferdsetaten-nav/test-undersokelse"></skyra-survey>;
}
