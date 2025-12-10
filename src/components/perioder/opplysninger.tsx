import type { OpplysningerHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import {
    lagHentTekstForSprak,
    mapNusKodeTilUtdannignsnivaa,
    SPORSMAL_TEKSTER,
    SporsmalId,
} from '@navikt/arbeidssokerregisteret-utils';
import React from 'react';
import { BodyShort } from '@navikt/ds-react';

function getSisteStillingSvar(opplysninger: OpplysningerHendelse) {
    return opplysninger.jobbsituasjon?.beskrivelser[0].detaljer?.stilling || 'Ikke oppgitt';
}

function getDinSituasjonSvar(opplysninger: OpplysningerHendelse) {
    return opplysninger.jobbsituasjon?.beskrivelser[0].beskrivelse || 'Ikke oppgitt';
}

function mapOpplysninger(opplysninger: OpplysningerHendelse): { sporsmal: string; svar: string }[] {
    const result: { sporsmal: string; svar: string }[] = [];
    const addIfPresent = (sporsmalId: string, value: string | undefined | null) => {
        if (value) {
            result.push({ sporsmal: sporsmalId, svar: value });
        }
    };
    addIfPresent(SporsmalId.dinSituasjon, getDinSituasjonSvar(opplysninger));
    addIfPresent(SporsmalId.sisteStilling, getSisteStillingSvar(opplysninger));
    addIfPresent(SporsmalId.utdanning, mapNusKodeTilUtdannignsnivaa(opplysninger.utdanning?.nus || ''));
    addIfPresent(SporsmalId.utdanningBestatt, opplysninger.utdanning?.bestaatt);
    addIfPresent(SporsmalId.utdanningGodkjent, opplysninger.utdanning?.godkjent);
    addIfPresent(SporsmalId.helseHinder, opplysninger.helse?.helsetilstandHindrerArbeid);
    addIfPresent(SporsmalId.andreForhold, opplysninger.annet?.andreForholdHindrerArbeid);

    return result;
}

type OpplysningerProps = {
    opplysninger: OpplysningerHendelse;
};

const Opplysninger: React.FC<OpplysningerProps> = (props) => {
    const { opplysninger } = props;
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, 'nb');
    const besvarelser = mapOpplysninger(opplysninger);

    return (
        <>
            {besvarelser.map((besvarelse) => (
                <BodyShort key={besvarelse.sporsmal} className="mb-2">
                    <strong>{tekst(besvarelse.sporsmal)}</strong>
                    <br />
                    {tekst(besvarelse.svar as string) ?? besvarelse.svar}
                </BodyShort>
            ))}
        </>
    );
};

export { Opplysninger };
