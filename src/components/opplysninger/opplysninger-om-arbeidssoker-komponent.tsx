import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    OpplysningerOmArbeidssoker,
    SPORSMAL_TEKSTER,
    SporsmalId,
    Svar,
    Sprak
} from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Link } from '@navikt/ds-react';

import Oppfolging from './oppfolging';
import { BehovsvurderingResponse } from '../../../types/behovsvurdering';
import { loggAktivitet } from '@/lib/amplitude';
import { identity } from '@/lib/utils';

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

function mapOpplysninger(opplysninger: OpplysningerOmArbeidssoker, sprak: Sprak): OpplysningProps[] {
    const result: OpplysningProps[] = [
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
    ].filter(identity);

    return result;
}

type Props = {
    opplysninger: OpplysningerOmArbeidssoker;
    sprak: Sprak;
    behovsvurdering: BehovsvurderingResponse;
    harAktivPeriode: boolean;
};

const TEKSTER = {
    nb: {
        opplysningerText1: 'Du kan  ',
        opplysningerText2: 'Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.',
        endreOpplysninger: 'endre opplysninger her',
    },
};

function OpplysningerOmArbeidssokerKomponent(props: Props) {
    const { opplysninger, sprak, behovsvurdering, harAktivPeriode } = props;
    const besvarelser = mapOpplysninger(opplysninger, sprak);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            {harAktivPeriode && (
                <div className={'mb-5'}>
                    <BodyShort>
                        {tekst('opplysningerText1')}
                                <Link
                                    href={process.env.OPPDATER_OPPLYSNINGER_URL}
                                    variant="action"
                                    onClick={() => loggAktivitet({ aktivitet: 'Trykker på "Endre opplysninger"' })}
                                >
                                    {tekst('endreOpplysninger')}
                                </Link>
                                <br />


                        {tekst('opplysningerText2')}
                    </BodyShort>
                </div>
            )}
            <Oppfolging sprak={sprak} behovsvurdering={behovsvurdering} />
            {besvarelser.map((item, index) => (
                <Opplysning {...item} key={index} sprak={props.sprak} />
            ))}
        </>
    );
}

export default OpplysningerOmArbeidssokerKomponent;
