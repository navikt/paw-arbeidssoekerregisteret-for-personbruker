import { Brukerprofil } from '@/model/brukerprofil';
import InlineSkyraSurvey from '@/components/skyra/inline-skyra-survey';

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
