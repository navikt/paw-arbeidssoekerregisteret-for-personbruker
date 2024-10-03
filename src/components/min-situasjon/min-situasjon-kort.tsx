import { Box } from '@navikt/ds-react';
// import Sammendrag from '../endre-situasjon/sammendrag';
import { InnsynLesMer } from '../opplysninger/innsyn';
import {
    hentSisteArbeidssokerPeriode,
    hentSisteOpplysningerOmArbeidssoker,
} from '@navikt/arbeidssokerregisteret-utils';
import ManglerOpplysninger from '../opplysninger/mangler-opplysninger';
import { harPermittertSituasjon } from '../../lib/har-permittert-situasjon';
import RegistrertTittel from '../registrert-tittel/registrert-tittel';
import PeriodeInfo from './periode-info';

const Sammendrag = (props: any) => {
    return (
        <div>
            Sammendrag
        </div>
    )
}

const MinSituasjonKort = (props: any) => {
    const { sprak, opplysningerOmArbeidssoker, onOppdaterOpplysninger, arbeidssokerperioder, behovsvurdering } = props;
    const harAktivPeriode = !Boolean(hentSisteArbeidssokerPeriode(arbeidssokerperioder).avsluttet);
    const manglerOpplysninger = opplysningerOmArbeidssoker.length === 0;
    const erPermittert = !manglerOpplysninger && harPermittertSituasjon(opplysningerOmArbeidssoker);
    const opplysninger = hentSisteOpplysningerOmArbeidssoker(opplysningerOmArbeidssoker);

    return (
        <Box
            background="surface-default"
            borderRadius="xlarge"
            borderColor={'border-subtle'}
            className={'divide-y divide-gray-300'}
        >
            <header className={'pt-4 pb-3 px-5'}>
                <RegistrertTittel
                    sprak={sprak}
                    arbeidssoekerperioder={arbeidssokerperioder}
                    opplysningerOmArbeidssoeker={opplysningerOmArbeidssoker}
                />
            </header>
            <section className={'py-4 px-6'}>
                <PeriodeInfo
                    arbeidssoekerperioder={arbeidssokerperioder}
                    opplysningerOmArbeidssoeker={opplysningerOmArbeidssoker}
                    sprak={sprak}
                />
                {manglerOpplysninger && harAktivPeriode && <ManglerOpplysninger sprak={sprak} />}
                {erPermittert && harAktivPeriode && (
                    <Sammendrag
                        sprak={sprak}
                        opplysninger={opplysningerOmArbeidssoker}
                        onOppdaterOpplysninger={onOppdaterOpplysninger}
                    />
                )}
                {!manglerOpplysninger && (
                    <InnsynLesMer
                        sprak={sprak}
                        opplysninger={opplysninger}
                        behovsvurdering={behovsvurdering}
                        harAktivPeriode={harAktivPeriode}
                    />
                )}
            </section>
        </Box>
    );
};

export default MinSituasjonKort;
