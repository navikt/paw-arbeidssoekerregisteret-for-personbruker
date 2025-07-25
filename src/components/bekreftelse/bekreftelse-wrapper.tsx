'use client';

import { Bekreftelse, BekreftelseProps } from '@/components/bekreftelse/bekreftelse';

import { BekreftelseSkjemaType } from '@/model/bekreftelse';

function BekreftelseWrapper(props: Omit<BekreftelseProps, 'onSubmit'>) {
    const onSubmit = (data: BekreftelseSkjemaType) => {
        return fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/bekreftelse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            let body = null;
            if (res.headers.get('content-type')?.includes('application/json')) {
                body = await res.json();
            }
            if (res.ok) {
                return body;
            } else {
                throw body;
            }
        });
    };

    return <Bekreftelse onSubmit={onSubmit} {...props} />;
}

export default BekreftelseWrapper;
