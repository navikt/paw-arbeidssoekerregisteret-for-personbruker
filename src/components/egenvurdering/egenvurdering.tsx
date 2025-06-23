'use client';

import { Profilering, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils/dist/models/profilering';
import EgenvurderingStateless from '@/components/egenvurdering/egenvurdering-stateless';
import EgenvurderingAvklart from '@/components/egenvurdering/egenvurdering-avklart';

interface Props {
    sprak: Sprak;
    profilering: Profilering;
    arbeidssokerPeriodeId: string;
}

const Egenvurdering = (props: Props) => {
    const { sprak, profilering, arbeidssokerPeriodeId } = props;
    const [pendingRequest, settPendingRequest] = useState<
        ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING | null
    >(null);
    const [visFeilmelding, settVisFeilmelding] = useState<boolean>(false);
    const [innsendtEgenvurdering, settInnsendtEgenvurdering] = useState<ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING | null>(null);

    async function onSubmit(
        egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING,
    ) {
        settPendingRequest(egenvurdering);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/egenvurdering`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    profileringId: profilering.profileringId,
                    periodeId: arbeidssokerPeriodeId,
                    egenvurdering,
                }),
            });
            if (!response.ok) {
                settVisFeilmelding(true);
            } else {
                settInnsendtEgenvurdering(egenvurdering);
            }
        } catch (error) {
            settVisFeilmelding(true);
        } finally {
            settPendingRequest(null);
        }
    }

    if (innsendtEgenvurdering) {
        return <EgenvurderingAvklart sprak={sprak} egenvurdering={innsendtEgenvurdering} profilering={profilering}/>;
    }

    return (
        <EgenvurderingStateless
            sprak={sprak}
            profilering={profilering}
            pendingRequest={pendingRequest}
            visFeilmelding={visFeilmelding}
            onSubmit={onSubmit}
        />
    );
};

export default Egenvurdering;
