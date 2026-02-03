import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong, Box, Heading, Hide } from '@navikt/ds-react';
import ReadMoreVeileder from '@/components/egenvurdering/readmore-veileder';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';
import { InformationSquareIcon } from '@navikt/aksel-icons';
import { VisningEventNavn } from '@/lib/tracking/common';

interface BehovvurderingAvklartProps {
    sprak: Sprak;
    profilering: any;
    egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING;
}

const TEKSTER = {
    nb: {
        'heading-enig-standard': 'Du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra Nav',
        'heading-uenig-standard': 'Du har sagt at du ønsker hjelp',
        'beskrivelse-enig-standard':
            'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egenhånd.',
        'beskrivelse-uenig-standard': 'Vi vil gjøre en vurdering av ditt bistandsbehov.',
        'veiledning-enig-standard': 'Gi beskjed i dialogen dersom du likevel har behov for veiledning.',
        'veiledning-uenig-standard':
            'Gi beskjed i dialogen dersom du har opplysninger du mener er viktige for vurderingen.',
        'heading-enig-situasjonsbestemt': 'Du har sagt at du ønsker hjelp',
        'heading-uenig-situasjonsbestemt': 'Du har sagt at du vil klare deg selv',
        'beskrivelse-enig-situasjonsbestemt':
            'Du kan ha kontakt med din veileder ved å bruke Dialogen og Aktivitetsplanen.',
        'beskrivelse-uenig-situasjonsbestemt': 'Vi vil gjøre en vurdering av ditt bistandsbehov.',
        'veiledning-enig-situasjonsbestemt': '',
        'veiledning-uenig-situasjonsbestemt':
            'Gi beskjed i dialogen dersom du har opplysninger du mener er viktige for vurderingen.',
        behovForVeiledningLikevel: 'Gi beskjed i dialogen dersom du likevel har behov for veiledning.',
    },
    nn: {
        'heading-enig-standard': 'Du har gode høve til å kome i jobb utan ein rettleiar eller tiltak frå Nav',
        'heading-uenig-standard': 'Du har sagt at du ønskjer hjelp',
        'beskrivelse-enig-standard':
            'Du har ansvar for å leite aktivt etter jobbar og å søkje på relevante stillingar på eiga hand.',
        'beskrivelse-uenig-standard': 'Vi vil gjere ei vurdering av behovet ditt for bistand.',
        'veiledning-enig-standard': 'Gi beskjed i dialogen dersom du likevel har behov for rettleiing.',
        'veiledning-uenig-standard':
            'Gi beskjed i dialogen dersom du har opplysningar du meiner er viktige for vurderinga.',
        'heading-enig-situasjonsbestemt': 'Du har sagt at du ønskjer hjelp',
        'heading-uenig-situasjonsbestemt': 'Du har sagt at du vil klare deg sjølv',
        'beskrivelse-enig-situasjonsbestemt':
            'Du kan ha kontakt med rettleiaren din ved å bruke Dialogen og Aktivitetsplanen.',
        'beskrivelse-uenig-situasjonsbestemt': 'Vi vil gjere ei vurdering av behovet ditt for bistand.',
        'veiledning-enig-situasjonsbestemt': '',
        'veiledning-uenig-situasjonsbestemt':
            'Gi beskjed i dialogen dersom du har opplysningar du meiner er viktige for vurderinga.',
        behovForVeiledningLikevel: 'Gi beskjed i dialogen dersom du likevel har behov for rettleiing.',
    },
    en: {
        'heading-enig-standard': 'You have a good chance of getting a job without a supervisor or measures from Nav',
        'heading-uenig-standard': 'You have said that you want help',
        'beskrivelse-enig-standard':
            'You are responsible for actively looking for jobs and applying for relevant positions on your own.',
        'beskrivelse-uenig-standard': 'We will assess your need for support.',
        'veiledning-enig-standard': 'Let us know in the dialogue if you still need guidance.',
        'veiledning-uenig-standard':
            'Let us know in the dialogue if you have information you believe is important for the assessment.',
        'heading-enig-situasjonsbestemt': 'You have said that you want help',
        'heading-uenig-situasjonsbestemt': 'You have said that you want to manage on your own',
        'beskrivelse-enig-situasjonsbestemt':
            'You can stay in touch with your supervisor by using the Dialogue and the Activity Plan.',
        'beskrivelse-uenig-situasjonsbestemt': 'We will assess your need for support.',
        'veiledning-enig-situasjonsbestemt': '',
        'veiledning-uenig-situasjonsbestemt':
            'Let us know in the dialogue if you have information you believe is important for the assessment.',
        behovForVeiledningLikevel: 'Let us know in the dialogue if you still need guidance.',
    },
};

function EgenvurderingAvklart(props: BehovvurderingAvklartProps) {
    const { sprak, profilering, egenvurdering } = props;
    const profilertTil = profilering?.profilertTil;
    const antattGodeMuligheter = profilering && profilering.profilertTil === 'ANTATT_GODE_MULIGHETER';
    const tekstnoekkel = antattGodeMuligheter ? 'standard' : 'situasjonsbestemt';
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const enig = profilertTil === egenvurdering ? 'enig' : 'uenig';

    return (
        <Box
            background="default"
            borderRadius="8"
            borderColor={'neutral-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-ax-border-neutral-subtle'}
            data-umami-event={VisningEventNavn}
            data-umami-event-viser={'Egenvurdering avklart'}
        >
            <div
                className={'flex items-center py-4 px-6'}
                style={{
                    background: 'var(--ax-bg-brand-blue-moderate)',
                    borderRadius: 'var(--ax-radius-8) var(--ax-radius-8) 0 0',
                    borderColor: 'var(--ax-border-brand-blue-subtle)',
                }}
            >
                <Hide below={'sm'}>
                    <InformationSquareIcon title="a11y-title" fontSize="1.5rem" className={'mr-4'} />
                </Hide>
                <Heading level="2" size="medium">
                    {tekst(`heading-${enig}-${tekstnoekkel}`)}
                </Heading>
            </div>
            <div className={'py-4 px-6'}>
                <BodyLong className={'mt-4'}>{tekst(`beskrivelse-${enig}-${tekstnoekkel}`)}</BodyLong>
                <BodyLong spacing>{tekst(`veiledning-${enig}-${tekstnoekkel}`)}</BodyLong>
                <ReadMoreVeileder sprak={sprak} />
            </div>
        </Box>
    );
}

export default EgenvurderingAvklart;
