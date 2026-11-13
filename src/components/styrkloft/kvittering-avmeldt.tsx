import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { InfoCard } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        heading: 'Valget ditt er registrert',
        body: 'Vi vil ikke vise deg forslag på ledige stillinger',
    },
    nn: {
        heading: 'Valet ditt er registrert',
        body: 'Me vil ikkje visa deg forslag på ledige stillingar',
    },
    en: {
        heading: 'Your choice has been registered',
        body: 'We will not show you job suggestions',
    },
};

interface KvitteringAvmeldtProps {
    sprak: Sprak;
}

export function KvitteringAvmeldt(props: KvitteringAvmeldtProps) {
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <InfoCard data-color="info">
            <InfoCard.Header>
                <InfoCard.Title as="h3">{tekst('heading')}</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>{tekst('body')}</InfoCard.Content>
        </InfoCard>
    );
}
