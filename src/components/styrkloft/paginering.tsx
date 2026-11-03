import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Button, HStack } from '@navikt/ds-react';

const TEKSTER = {
    nb: {
        forrige: 'Forrige side',
        neste: 'Neste side',
        side: 'Side',
        paginering: 'Paginering',
    },
    nn: {
        forrige: 'Førre side',
        neste: 'Neste side',
        side: 'Side',
        paginering: 'Sideinndeling',
    },
    en: {
        forrige: 'Previous page',
        neste: 'Next page',
        side: 'Page',
        paginering: 'Pagination',
    },
};

interface Props {
    antallSider: number;
    aktivSide: number;
    onClick: (side: number) => void;
    sprak?: Sprak;
}

function NummererteKnapper(props: Props) {
    const { aktivSide, antallSider, onClick, sprak = 'nb' } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const elems = [];
    for (let i = 1; i <= antallSider; i++) {
        elems.push(
            <Button
                // size={'xsmall'}
                key={i}
                onClick={() => onClick(i)}
                variant={i === aktivSide ? 'secondary-neutral' : 'tertiary-neutral'}
                aria-label={`${tekst('side')} ${i}`}
                aria-current={i === aktivSide ? 'page' : undefined}
            >
                {i}
            </Button>,
        );
    }
    return elems;
}

function Paginering(props: Props) {
    const { aktivSide, antallSider, onClick, sprak = 'nb' } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <nav aria-label={tekst('paginering')}>
            <HStack gap={'space-8'}>
                <Button
                    data-color="neutral"
                    aria-label={tekst('forrige')}
                    onClick={() => onClick(Math.max(1, aktivSide - 1))}
                    variant={'tertiary'}
                    icon={<ArrowLeftIcon aria-hidden fontSize="1.5rem" />}
                ></Button>
                <NummererteKnapper {...props} />
                <Button
                    data-color="neutral"
                    aria-label={tekst('neste')}
                    onClick={() => onClick(Math.min(aktivSide + 1, antallSider))}
                    variant={'tertiary'}
                    icon={<ArrowRightIcon aria-hidden fontSize="1.5rem" />}
                    iconPosition={'right'}
                ></Button>
            </HStack>
        </nav>
    );
}

export default Paginering;
