import { Button, HGrid, HStack } from '@navikt/ds-react';
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    antallSider: number;
    aktivSide: number;
    onClick: (side: Number) => void;
}

function NummererteKnapper(props: Props) {
    const { aktivSide, antallSider, onClick } = props;
    const elems = [];
    for (let i = 1; i <= antallSider; i++) {
        elems.push(
            <Button
                // size={'xsmall'}
                key={i}
                onClick={() => onClick(i)}
                variant={i === aktivSide ? 'secondary-neutral' : 'tertiary-neutral'}
            >
                {i}
            </Button>,
        );
    }
    return elems;
}

function Paginering(props: Props) {
    const { aktivSide, antallSider, onClick } = props;

    return (
        <HStack gap={'space-8'}>
            <Button
                data-color="neutral"
                aria-label={'Forrige side'}
                onClick={() => onClick(Math.max(1, aktivSide - 1))}
                variant={'tertiary'}
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
            ></Button>
            <NummererteKnapper {...props} />
            <Button
                data-color="neutral"
                aria-label={'Neste side'}
                onClick={() => onClick(Math.min(aktivSide + 1, antallSider))}
                variant={'tertiary'}
                icon={<ArrowRightIcon title="a11y-title" fontSize="1.5rem" />}
                iconPosition={'right'}
            ></Button>
        </HStack>
    );
}

export default Paginering;
