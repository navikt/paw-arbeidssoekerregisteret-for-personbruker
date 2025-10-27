import { ProfilertTil, OpplysningerMedProfilering } from '@navikt/arbeidssokerregisteret-utils';

import UxSignalsWidget from './ux-signals-widget';

interface WidgetProps {
    profilertTil: ProfilertTil[];
    opplysninger: OpplysningerMedProfilering | undefined;
}

export default function VisWidgetForProfilerteTil(props: WidgetProps) {
    const { profilertTil, opplysninger } = props;

    if (!profilertTil || !opplysninger) return null;

    const sisteProfilertTil = opplysninger.profilering.profilertTil;

    const skalHaWidget = profilertTil.includes(sisteProfilertTil);

    if (!skalHaWidget) return null;

    return <UxSignalsWidget />;
}
