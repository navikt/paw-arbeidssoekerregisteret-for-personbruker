import { prettyPrintDato } from '@/lib/date-utils';
import { BekreftelseHendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import React from 'react';

type BekreftelseProps = {
    bekreftelse: BekreftelseHendelse;
};

const Bekreftelse: React.FC<BekreftelseProps> = (props) => {
    const { bekreftelse } = props;

    const formaterBekreftelsePeriode = () => {
        const fraDato = prettyPrintDato(bekreftelse.svar.gjelderFra);
        const tilDato = prettyPrintDato(bekreftelse.svar.gjelderTil);
        return `Gjelder fra ${fraDato} til ${tilDato}`;
    };

    return (
        <div>
            <h3 className="font-semibold mb-4">{formaterBekreftelsePeriode()}</h3>
            <dl>
                <dt className="font-semibold"></dt>
                <dt className="font-semibold">Har jobbet</dt>
                <dd>{bekreftelse.svar.harJobbetIDennePerioden ? 'Ja' : 'Nei'}</dd>
                <dt className="font-semibold">Vil fortsatt være søker</dt>
                <dd>{bekreftelse.svar.vilFortsetteSomArbeidssoeker ? 'Ja' : 'Nei'}</dd>
            </dl>
        </div>
    );
};

export { Bekreftelse };
