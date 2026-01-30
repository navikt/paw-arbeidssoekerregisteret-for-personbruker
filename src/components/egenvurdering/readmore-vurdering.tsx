'use client';

import { BodyShort, List, ReadMore, Box } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { useState } from 'react';

interface ReadmoreProps {
    sprak: Sprak;
}

const TEKSTER = {
    nb: {
        header: 'Hvordan vurderer vi ditt behov for veiledning?',
        tittel: 'Vår vurdering er basert på',
        punkt1: 'dine svar fra registreringen',
        punkt2: 'opplysningene Nav har om din situasjon',
        punkt3: 'det du selv mener',
    },
};

function ReadMoreVurdering(props: ReadmoreProps) {
    const [clickedReadMorebehov, setClickedReadMore] = useState<boolean>(false);
    const { sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const handleClickReadMore = () => {
        if (!clickedReadMorebehov) {
            // loggAktivitet({ aktivitet: 'Trykker på "Readmore: Hvordan vurderer vi ditt behov"' });
            setClickedReadMore(true);
        }
    };
    return (
        <ReadMore size="medium" header={tekst('header')} onClick={() => handleClickReadMore()}>
            <BodyShort>{tekst('tittel')}:</BodyShort>
            <Box marginBlock="space-16" asChild>
                <List data-aksel-migrated-v8 as="ul">
                    <List.Item>{tekst('punkt1')}</List.Item>
                    <List.Item>{tekst('punkt2')}</List.Item>
                    <List.Item>{tekst('punkt3')}</List.Item>
                </List>
            </Box>
        </ReadMore>
    );
}

export default ReadMoreVurdering;
