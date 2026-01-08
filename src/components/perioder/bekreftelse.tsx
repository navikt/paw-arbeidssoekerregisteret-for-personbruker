import { prettyPrintDato } from '@/lib/date-utils';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BekreftelseHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import React from 'react';

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
            <h3 className="font-semibold mb-4">{formaterBekreftelsePeriode()}</h3>
            <dl>
                <dt className="font-semibold"></dt>
                <dt className="font-semibold">{tekst('har_jobbet')}</dt>
                <dd>{bekreftelse.svar.harJobbetIDennePerioden ? tekst('yes') : tekst('no')}</dd>
                <dt className="font-semibold">{tekst('vil_fortsette')}</dt>
                <dd>{bekreftelse.svar.vilFortsetteSomArbeidssoeker ? tekst('yes') : tekst('no')}</dd>
            </dl>
        </div>
    );
};

export { Bekreftelse };
