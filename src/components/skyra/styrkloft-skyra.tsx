import { Brukerprofil } from '@/model/brukerprofil';
import InlineSkyraSurvey from '@/components/skyra/inline-skyra-survey';

interface Props {
    brukerprofil: Brukerprofil;
}

export default function StyrkloftSkyra(props: Props) {
    return <InlineSkyraSurvey {...props} />;
}
