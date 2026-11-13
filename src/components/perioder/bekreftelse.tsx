import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import type { BekreftelseHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import type React from 'react';
import { prettyPrintDato } from '@/lib/date-utils';

const TEKSTER = {
    nb: {
        gjelder_fra: 'Gjelder fra',
        gjelder_til: 'til',
        har_jobbet: 'Har jobbet',
        vil_fortsette: 'Vil fortsette være søker',
        yes: 'Ja',
        no: 'Nei',
    },
    nn: {
        gjelder_fra: 'Gjelder frå',
        gjelder_til: 'til',
        har_jobbet: 'Har jobbet',
        vil_fortsette: 'Vil fortsette å vere søkjar',
        yes: 'Ja',
        no: 'Nei',
    },
    en: {
        gjelder_fra: 'Valid from',
        gjelder_til: 'to',
        har_jobbet: 'Has worked',
        vil_fortsette: 'Wants to remain a jobseeker',
        yes: 'Yes',
        no: 'No',
    },
};

type BekreftelseProps = {
    bekreftelse: BekreftelseHendelse;
    sprak: Sprak;
};

const Bekreftelse: React.FC<BekreftelseProps> = (props) => {
    const { bekreftelse, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const formaterBekreftelsePeriode = () => {
        const fraDato = prettyPrintDato(bekreftelse.svar.gjelderFra);
        const tilDato = prettyPrintDato(bekreftelse.svar.gjelderTil);
        return ` ${tekst('gjelder_fra')} ${fraDato} ${tekst('gjelder_til')} ${tilDato}`;
    };

    return (
        <div>
            <Box asChild marginBlock="space-0 space-16">
                <Heading level="2" size="xsmall">
                    {formaterBekreftelsePeriode()}
                </Heading>
            </Box>
            <Box as="dl" margin="space-0">
                <BodyShort as="dt" weight="semibold">
                    {tekst('har_jobbet')}
                </BodyShort>
                <BodyShort as="dd">{bekreftelse.svar.harJobbetIDennePerioden ? tekst('yes') : tekst('no')}</BodyShort>
                <BodyShort as="dt" weight="semibold">
                    {tekst('vil_fortsette')}
                </BodyShort>
                <BodyShort as="dd">
                    {bekreftelse.svar.vilFortsetteSomArbeidssoeker ? tekst('yes') : tekst('no')}
                </BodyShort>
            </Box>
        </div>
    );
};

export { Bekreftelse };
