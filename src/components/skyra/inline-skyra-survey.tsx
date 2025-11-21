'use client';

import { isConsentingToSurveys } from '@/lib/tracking/common';

interface Props {
    slug: string;
    isStorybook?: boolean;
}

export default function InlineSkyraSurvey(props: Props) {
    if (!isConsentingToSurveys() && !props.isStorybook) return null;

    const { slug } = props;

    return (
        <>
            <style jsx>{`
                skyra-survey {
                    --skyra-bg-color: #fff;
                    --skyra-text-color: #000;
                    --skyra-action-text-color: #fff;
                    --skyra-action-color: rgba(0, 103, 197, 1);
                    --skyra-link-color: rgba(0, 103, 197, 1);
                }
                skyra-survey::part(wrapper) {
                    box-shadow:
                        0px 1px 3px 0px rgba(0, 0, 0, 0.15),
                        0px 0px 1px 0px rgba(0, 0, 0, 0.2);
                    border-radius: 8px;
                    border: 1px solid rgba(7, 26, 54, 0.21);
                    padding: 1rem;
                }
            `}</style>
            {/* @ts-expect-error */}
            <skyra-survey
                slug={slug}
                // @ts-expect-error
            ></skyra-survey>
        </>
    );
}
