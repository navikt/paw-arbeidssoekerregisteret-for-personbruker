'use client';

import { Bekreftelse, BekreftelseProps } from '@/components/bekreftelse/bekreftelse';

function BekreftelseWrapper(props: Omit<BekreftelseProps, 'onSubmit'>) {
    const onSubmit = (data: any) => Promise.resolve().then(() => console.log('onSubmit', data));
    return <Bekreftelse onSubmit={onSubmit} {...props} />
}

export default BekreftelseWrapper;
