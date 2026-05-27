import InlineSkyraSurvey from '@/components/skyra/inline-skyra-survey';
import type { Brukerprofil } from '@/model/brukerprofil';

interface Props {
    brukerprofil: Brukerprofil;
    slug: string;
}

export default function StyrkloftSkyra(props: Props) {
    if (props.brukerprofil.tjenestestatus !== 'AKTIV') {
        return null;
    }

    return <InlineSkyraSurvey slug={props.slug} />;
}
