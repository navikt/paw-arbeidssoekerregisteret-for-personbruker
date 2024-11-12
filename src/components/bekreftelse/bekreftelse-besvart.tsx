'use client';

import { Bekreftelse, lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Button, Heading, List } from '@navikt/ds-react';
import { formaterDato, prettyPrintDato } from '@/lib/date-utils';
import { loggAktivitet } from '@/lib/amplitude';

export interface Props {
    besvarelse: Bekreftelse;
    sprak: Sprak;
    registrerArbeidssokerUrl: string;
}

const TEKSTER = {
    nb: {
        heading: 'Du har bekreftet at du fortsatt ønsker å være registrert som arbeidssøker',
        headingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
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

const getInnsendtDato = (besvarelse: Bekreftelse) => {
    return formaterDato(besvarelse.svar.sendtInnAv.tidspunkt);
};

const OenskerAaVaereRegistrert = (props: Props) => {
    const { sprak, besvarelse } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <>
            <Heading size={'xlarge'} level={'1'} className={'mb-4'}>
                {tekst('heading')}
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={getInnsendtDato(besvarelse)} />
            </div>
        </>
    );
};

const OenskerIkkeAaVaereRegistrert = (props: Props) => {
    const { sprak, besvarelse, registrerArbeidssokerUrl } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const onClick = () => {
        loggAktivitet({ aktivitet: 'Trykker på "Jeg ønsker å registrere meg på nytt" fra bekreftelse' });
        document.location.href = registrerArbeidssokerUrl;
    };

    return (
        <>
            <Heading size={'xlarge'} level={'1'} className={'mb-4'}>
                {tekst('headingUtmeldt')}
            </Heading>
            <div className={'px-4'}>
                <BesvarelseInfo sprak={sprak} besvarelse={besvarelse} innsendtDato={getInnsendtDato(besvarelse)} />
            </div>
            <Button variant={'secondary'} onClick={onClick}>
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
