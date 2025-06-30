import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    SporsmalId,
    Sprak,
    Svar,
} from '@navikt/arbeidssokerregisteret-utils';
import { identity } from '@/lib/utils';
import { BodyShort } from '@navikt/ds-react';
import { OpplysningerMedProfilering } from '../../../types/aggregerte-perioder';

type Props = {
    opplysninger: OpplysningerMedProfilering;
    sprak: Sprak;
};

type OpplysningProps = { sporsmal: string; svar: Svar | string };

const Opplysning = (props: OpplysningProps & { sprak: Sprak }) => {
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, props.sprak);
    const { sporsmal, svar } = props;

    return (
        <div className={'mb-5'}>
            <BodyShort>
                <strong>{tekst(sporsmal)}</strong>
                <br />
                {tekst(svar as string) ?? svar}
            </BodyShort>
        </div>
    );
};

function getSisteStillingSvar(opplysninger: OpplysningerOmArbeidssoker) {
    const detaljer = opplysninger.jobbsituasjon[0]?.detaljer;
    return detaljer?.stilling || 'Ikke oppgitt';
}

function getDinSituasjonSvar(opplysninger: OpplysningerOmArbeidssoker) {
    const situasjon = opplysninger.jobbsituasjon[0];
    return situasjon ? situasjon.beskrivelse : 'Ikke oppgitt';
}

export function mapOpplysninger(opplysninger: OpplysningerMedProfilering, sprak: Sprak): OpplysningProps[] {
    return [
        {
            sporsmal: SporsmalId.dinSituasjon,
            svar: getDinSituasjonSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.sisteStilling,
            svar: getSisteStillingSvar(opplysninger),
        },
        {
            sporsmal: SporsmalId.utdanning,
            svar: mapNusKodeTilUtdannignsnivaa(opplysninger.utdanning.nus),
        },
        opplysninger.utdanning.bestaatt && {
            sporsmal: SporsmalId.utdanningBestatt,
            svar: opplysninger.utdanning.bestaatt,
        },
        opplysninger.utdanning.bestaatt && {
            sporsmal: SporsmalId.utdanningGodkjent,
            svar: opplysninger.utdanning.godkjent,
        },
        opplysninger.helse && {
            sporsmal: SporsmalId.helseHinder,
            svar: opplysninger.helse.helsetilstandHindrerArbeid,
        },
        opplysninger.annet && {
            sporsmal: SporsmalId.andreForhold,
            svar: opplysninger.annet.andreForholdHindrerArbeid,
        },
        opplysninger.profilering?.egenvurderinger &&
            opplysninger.profilering?.egenvurderinger.length > 0 && {
                sporsmal: 'egenvurdering',
                svar: `egenvurdering-${opplysninger.profilering.egenvurderinger[0].egenvurdering}`,
            },
    ].filter(identity) as OpplysningProps[];
}

const Opplysninger = ({ opplysninger, sprak }: Props) => {
    const besvarelser = mapOpplysninger(opplysninger, sprak);
    return besvarelser.map((item, index) => <Opplysning {...item} key={index} sprak={sprak} />);
};

export default Opplysninger;
