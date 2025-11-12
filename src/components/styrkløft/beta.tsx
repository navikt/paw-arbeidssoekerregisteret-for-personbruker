import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { HelpText, Tag } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        beta: 'Beta',
        betaTitle: 'Betaversjon',
        betaDescription: 'Verktøyet er under utvikling',
    },
    nn: {
        beta: 'Beta',
        betaTitle: 'Betaversjon',
        betaDescription: 'Verktøyet er under utvikling',
    },
    en: {
        beta: 'Beta',
        betaTitle: 'Beta version',
        betaDescription: 'The tool is under development',
    },
};

interface Props {
    sprak: Sprak;
}

function Beta(props: Props) {
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
    return (
        <Tag variant={'alt1'} size={'small'}>
            {tekst('beta')}
            <HelpText title={tekst('betaTitle')} className={'ml-2'}>
                {tekst('betaDescription')}
            </HelpText>
        </Tag>
    );
}

export default Beta;
