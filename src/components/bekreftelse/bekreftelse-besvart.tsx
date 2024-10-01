import { lagHentTekstForSprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Button, Heading, List } from '@navikt/ds-react';
import InfoTekst from './info-tekst';
import { Sprak } from '../../types/sprak';
import { SistInnsendteBekreftelse } from '../../types/bekreftelse';

export interface Props {
    periode: string;
    innsendtDato: string;
    nesteDato: string;
    besvarelse: SistInnsendteBekreftelse;
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
        nesteGang: 'Neste gang du må svare på meldeplikt er ',
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
                <List.Item>{tekst(besvarelse.harJobbetIDennePerioden ? 'vaertIArbeid' : 'ikkeVaertIArbeid')}</List.Item>
                <List.Item>
                    {tekst(
                        besvarelse.vilFortsetteSomArbeidssoeker
                            ? 'onskerAaVaereRegistrert'
                            : 'onskerIkkeAaVaereRegistrert',
                    )}
                </List.Item>
            </List>
        </>
    );
};

const OenskerAaVaereRegistrert = (props: Props) => {
    const { sprak, periode, innsendtDato, nesteDato, besvarelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            <InfoTekst sprak={sprak} />
            <Heading size={'xsmall'} className={'mb-4'}>
                {tekst('heading')} <span className={'text-nowrap'}>{periode}?</span>
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={innsendtDato} />
            </div>
            <Heading size={'xsmall'} className={'mt-4'}>
                {tekst('nesteGang')} {nesteDato}
            </Heading>
        </>
    );
};

const OenskerIkkeAaVaereRegistrert = (props: Props) => {
    const { sprak, periode, innsendtDato, besvarelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <>
            {/*{!visBekreftelse && <InfoTekst sprak={sprak} />}*/}
            <Heading size={'xsmall'} className={'mb-4'}>
                {tekst('heading')} <span className={'text-nowrap'}>{periode}</span>?
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={innsendtDato} />
            </div>
            <Button variant={'secondary'} onClick={() => console.log('Jeg ønsker å registrere meg på nytt')}>
                {tekst('buttonTextUtmeldt')}
            </Button>
        </>
    );
};

export const BekreftelseBesvart = (props: Props) => {
    const { besvarelse } = props;

    return besvarelse.vilFortsetteSomArbeidssoeker ? (
        <OenskerAaVaereRegistrert {...props} />
    ) : (
        <OenskerIkkeAaVaereRegistrert {...props} />
    );
};
