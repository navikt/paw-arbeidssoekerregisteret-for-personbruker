import { Switch } from '@navikt/ds-react';
import { loggStyrkeloft } from '@/lib/tracking';

interface Props {
    checked: boolean;
    onChange: (val: boolean) => void;
    tekst: string;
}

const StillingerUtenKravToggler = (props: Props) => {
    const { checked, onChange, tekst } = props;
    return (
        <Switch
            checked={checked}
            onChange={(e) => {
                onChange(e.target.checked);
                loggStyrkeloft({ aktivitet: `Skrur ${e.target.checked ? 'på' : 'av'} Stillinger uten krav` });
            }}
        >
            {tekst}
        </Switch>
    );
};

export default StillingerUtenKravToggler;
