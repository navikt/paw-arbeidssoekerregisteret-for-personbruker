import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { HelpText, Tag } from '@navikt/ds-react';

interface Props {
    sprak: Sprak;
}

function Beta(props: Props) {
    return (
        <Tag variant={'alt1'}>
            Beta
            <HelpText title="Betaversjon" className={'ml-2'}>
                Verktøyet er under utvikling
            </HelpText>
        </Tag>
    );
}

export default Beta;
