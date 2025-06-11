import { BodyLong, Box, Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Profilering, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import ReadMoreVeileder from '@/components/egenvurdering/readmore-veileder';
import ReadMoreVurdering from '@/components/egenvurdering/readmore-vurdering';

interface Props {
    sprak: Sprak;
    profilering: Profilering;
}
const TEKSTER = {
    nb: {
        'heading-standard': 'Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV',
        'beskrivelse-standard':
            'En veileders oppgave er å hjelpe deg med å søke stillinger og finne aktuelle tiltak på veien til arbeid.',
        'svarEnigKnappetekst-standard': 'Jeg klarer meg uten veileder',
        'svarUenigKnappetekst-standard': 'Jeg trenger en veileder for å komme i arbeid',
        'dialogtekstNavSinVurdering-standard':
            'Nav sin vurdering: Vi tror du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra Nav.',
        'dialogtekstSvarEnig-standard': 'Jeg klarer meg uten veileder',
        'dialogtekstSvarUenig-standard': 'Jeg trenger en veileder for å komme i arbeid',
        dialogtekstMinVurdering: 'Min vurdering: ',
        veilederKanIkke: 'En veileder kan ikke svare på spørsmål om dagpenger eller meldekort.',
        'heading-situasjonsbestemt': 'Ønsker du hjelp fra en veileder?',
        'beskrivelse-situasjonsbestemt': 'Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        'svarEnigKnappetekst-situasjonsbestemt': 'Ja, jeg ønsker hjelp',
        'svarUenigKnappetekst-situasjonsbestemt': 'Nei, jeg vil gjerne klare meg selv',
        'dialogtekstNavSinVurdering-situasjonsbestemt':
            'Nav sin vurdering: Vi tror du vil trenge hjelp fra en veileder for å nå ditt mål om arbeid.',
        'dialogtekstSvarEnig-situasjonsbestemt': 'Nei, jeg vil gjerne klare meg selv',
        'dialogtekstSvarUenig-situasjonsbestemt': 'Ja, jeg ønsker hjelp',
        dialogtekstAutomatiskGenerert: 'Dette er en automatisk generert melding',
    },
};
const Egenvurdering = (props: Props) => {
    const { sprak, profilering } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const tekstnoekkel = profilering.profilertTil === 'ANTATT_GODE_MULIGHETER' ? 'standard' : 'situasjonsbestemt';
    return (
        <Box
            background="surface-default"
            borderRadius="xlarge"
            borderColor={'border-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-gray-300'}
        >
            <Heading level="2" size="small" className={'pt-4 pb-3 px-5'}>
                {tekst(`heading-${tekstnoekkel}`)}
            </Heading>
            <div className={'py-4 px-6'}>
                <BodyLong className={'mt-4'}>{tekst(`beskrivelse-${tekstnoekkel}`)}</BodyLong>
                <BodyLong spacing>{tekst('veilederKanIkke')}</BodyLong>
                <Button
                // onClick={() => {
                //     onClickBehovForVeiledning(enigRespons);
                //     loggAktivitet({ aktivitet: 'Trykker på "Klarer meg uten veileder"' });
                // }}
                // disabled={pendingRequest !== null}
                // loading={pendingRequest === enigRespons}
                >
                    {tekst(`svarEnigKnappetekst-${tekstnoekkel}`)}
                </Button>
                <div className="mb-4">
                    <Button
                        // onClick={() => {
                        //     onClickBehovForVeiledning(uenigRespons);
                        //     loggAktivitet({ aktivitet: 'Trykker på "Behov for veileder"' });
                        // }}
                        // disabled={pendingRequest !== null}
                        // loading={pendingRequest === uenigRespons}
                        variant="secondary"
                        className="mt-4"
                    >
                        {tekst(`svarUenigKnappetekst-${tekstnoekkel}`)}
                    </Button>
                </div>
                <ReadMoreVeileder sprak={sprak} />
                <ReadMoreVurdering sprak={sprak} />
            </div>
        </Box>
    );
};

export default Egenvurdering;
