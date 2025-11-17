'use client';

import { isConsentingToSurveys } from '@/lib/tracking/common';

interface Props {}

export default function InlineSkyraSurvey(props: Props) {
    if (!isConsentingToSurveys()) return null;

    return (
        <>
            <style jsx>{`
                skyra-survey[slug='arbeids-og-velferdsetaten-nav/test-undersokelse'] {
                    box-shadow:
                        0px 1px 3px 0px rgba(0, 0, 0, 0.15),
                        0px 0px 1px 0px rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    --skyra-bg-color: #fff;
                    --skyra-text-color: #000;
                    --skyra-action-text-color: #fff;
                    --skyra-action-color: rgba(0, 103, 197, 1);
                }
                &::part(wrapper) {
                    padding: 0.5rem 1rem;
                }
            `}</style>
            {/* @ts-expect-error */}
            <skyra-survey
                slug="arbeids-og-velferdsetaten-nav/test-undersokelse"
                // @ts-expect-error
            ></skyra-survey>
        </>
    );
}
