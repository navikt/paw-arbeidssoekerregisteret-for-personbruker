import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Button, Heading, List } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { InnsendtBekreftelse } from '../../../types/innsendt-bekreftelse';
import prettyPrintDato from '@/lib/pretty-print-dato';

export interface Props {
    besvarelse: InnsendtBekreftelse;
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        heading: 'Har du vært i arbeid i perioden',
        svarteDu: 'svarte du at:',
        vaertIArbeid: 'du har vært i arbeid foregående 14 dager',
        ikkeVaertIArbeid: 'du ikke har vært i arbeid foregående 14 dager',
        onskerAaVaereRegistrert: 'at du ønsker å være registrert som arbeidssøker',
        onskerIkkeAaVaereRegistrert: 'at du ønsker ikke å være registrert som arbeidssøker',
        buttonText: 'Jeg ønsker å endre svarene mine',
        buttonTextUtmeldt: 'Jeg ønsker å registrere meg på nytt',
    },
};

const BesvarelseInfo = (props: { sprak: Sprak; besvarelse: Props['besvarelse']; innsendtDato: string }) => {
    const { sprak, besvarelse, innsendtDato } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <BodyShort>
                {innsendtDato} {tekst('svarteDu')}
            </BodyShort>
            <List size={'small'}>
                <List.Item>
                    {tekst(besvarelse.svar.harJobbetIDennePerioden ? 'vaertIArbeid' : 'ikkeVaertIArbeid')}
                </List.Item>
                <List.Item>
                    {tekst(
                        besvarelse.svar.vilFortsetteSomArbeidssoeker
                            ? 'onskerAaVaereRegistrert'
                            : 'onskerIkkeAaVaereRegistrert',
                    )}
                </List.Item>
            </List>
        </>
    );
};

const getPeriode = (besvarelse: InnsendtBekreftelse) => {
    return `${prettyPrintDato(besvarelse.svar.gjelderFra)} - ${prettyPrintDato(besvarelse.svar.gjelderTil)}`;
};
const getInnsendtDato = (besvarelse: InnsendtBekreftelse) => {
    return prettyPrintDato(besvarelse.svar.sendtInn.tidspunkt);
};

const OenskerAaVaereRegistrert = (props: Props) => {
    const { sprak, besvarelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            <InfoTekst sprak={sprak} />
            <Heading size={'xsmall'} className={'mb-4'}>
                {tekst('heading')} <span className={'text-nowrap'}>{getPeriode(besvarelse)}?</span>
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={getInnsendtDato(besvarelse)} />
            </div>
        </>
    );
};

const OenskerIkkeAaVaereRegistrert = (props: Props) => {
    const { sprak, besvarelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            <Heading size={'xsmall'} className={'mb-4'}>
                {tekst('heading')} <span className={'text-nowrap'}>{getPeriode(besvarelse)}</span>?
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={getInnsendtDato(besvarelse)} />
            </div>
            <Button variant={'secondary'} onClick={() => console.log('Jeg ønsker å registrere meg på nytt')}>
                {tekst('buttonTextUtmeldt')}
            </Button>
        </>
    );
};

export const BekreftelseBesvart = (props: Props) => {
    const { besvarelse } = props;

    return besvarelse.svar.vilFortsetteSomArbeidssoeker ? (
        <OenskerAaVaereRegistrert {...props} />
    ) : (
        <OenskerIkkeAaVaereRegistrert {...props} />
    );
};
