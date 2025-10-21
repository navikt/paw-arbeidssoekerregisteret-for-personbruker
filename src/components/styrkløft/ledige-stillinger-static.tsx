import { HGrid } from '@navikt/ds-react';
import LedigStilling from '@/components/styrkløft/ledig-stilling';

interface Props {
    resultat: any[];
}

function LedigeStillingerStatic(props: Props) {
    const { resultat } = props;

    if (!resultat || resultat.length === 0) {
        return null;
    }

    return (
        <HGrid gap="space-24" columns={{ sm: 1, md: 2 }}>
            {resultat.map((stilling) => (
                <LedigStilling ledigStilling={stilling} key={stilling.tittel} />
            ))}
        </HGrid>
    );
}

export default LedigeStillingerStatic;
