import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BehovsvurderingResponse } from '../../../types/behovsvurdering';

const TEKSTER = {
    nb: {
        'oppfolging.STANDARD_INNSATS': 'Jeg ønsker å klare meg selv',
        'oppfolging.SITUASJONSBESTEMT_INNSATS': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
    en: {
        'oppfolging.STANDARD_INNSATS': 'Jeg ønsker å klare meg selv',
        'oppfolging.SITUASJONSBESTEMT_INNSATS': 'Jeg ønsker oppfølging fra NAV',
        'oppfolging.IKKE_BESVART': 'Ikke besvart',
    },
};

const Oppfolging = (props: { sprak: Sprak; behovsvurdering: BehovsvurderingResponse }) => {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    const { behovsvurdering } = props;

    return (
        <div className={'mb-5'}>
            <strong className={'mb-5'}>Hva slags veiledning ønsker du?</strong>
            <div className={'flex items-center flex-wrap'}>
                <div className={'flex items-center flex-wrap'}>
                    {tekst(`oppfolging.${behovsvurdering?.oppfolging || 'IKKE_BESVART'}`)}
                </div>
            </div>
        </div>
    );
};

export default Oppfolging;
