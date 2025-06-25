import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong, Box, Heading, Hide } from '@navikt/ds-react';
import ReadMoreVeileder from '@/components/egenvurdering/readmore-veileder';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils/dist/models/profilering';
import { InformationSquareIcon } from '@navikt/aksel-icons';

interface BehovvurderingAvklartProps {
    sprak: Sprak;
    profilering: any;
    egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER | ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING;
}

const TEKSTER = {
    nb: {
        'heading-enig-standard': 'Du har gode muligheter til å komme i jobb uten en veileder eller tiltak fra NAV',
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
            background="surface-default"
            borderRadius="large"
            borderColor={'border-subtle'}
            borderWidth={'1'}
            className={'divide-y divide-gray-300'}
        >
            <div className={'flex items-center py-4 px-6'} style={{ background: 'var(--a-blue-100)', borderRadius: 'var(--a-border-radius-large) var(--a-border-radius-large) 0 0'}}>
                <Hide below={'sm'}><InformationSquareIcon title="a11y-title" fontSize="1.5rem" className={'mr-4'}/></Hide>
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
