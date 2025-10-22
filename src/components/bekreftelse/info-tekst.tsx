import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        infoText1: 'Hvis du ønsker å være registrert som arbeidssøker hos Nav må du besvare disse spørsmålene. ',
        infoText2: 'Informasjonen brukes også i arbeidsmarkedsstatistikken.',
    },
    nn: {
        infoText1: 'Dersom du ønskjer å vere registrert som arbeidssøkjar hos Nav, må du svare på desse spørsmåla. ',
        infoText2: 'Informasjonen blir brukt også i arbeidsmarknadsstatistikken.',
    },
    en: {
        infoText1: 'If you wish to be registered as a jobseeker with Nav you must answer these questions.  ',
        infoText2: 'The information is also used in labour market statistics.',
    },
};

const InfoTekst = (props: { sprak: Sprak }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <BodyLong spacing>
            {tekst('infoText1')}
            {tekst('infoText2')}
        </BodyLong>
    );
};

export default InfoTekst;
