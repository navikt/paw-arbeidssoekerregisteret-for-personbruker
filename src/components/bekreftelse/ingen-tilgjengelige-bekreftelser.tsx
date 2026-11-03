import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Heading, LocalAlert } from '@navikt/ds-react';
import LenkeTilBekreftelseArtikkel from '../lenke-til-bekreftelse-artikkel';

interface Props {
    sprak: Sprak;
    headingLevel?: '1' | '2';
}
const TEKSTER = {
    nb: {
        melding: 'Du har ingen bekreftelser å sende inn',
    },
    nn: {
        melding: 'Du har ingen stadfestingar å senda inn',
    },
    en: {
        melding: 'You have no confirmation forms to submit',
    },
};

export default function IngenTilgjengeligeBekreftelser(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    const headingLevel = props.headingLevel ?? '1';
    return (
        <>
            <LocalAlert status="announcement">
                <LocalAlert.Content>
                    <Heading size="small" level={headingLevel}>
                        {tekst('melding')}
                    </Heading>
                </LocalAlert.Content>
            </LocalAlert>
            <LenkeTilBekreftelseArtikkel sprak={props.sprak} />
        </>
    );
}
