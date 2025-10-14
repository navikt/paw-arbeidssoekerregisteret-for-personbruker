import { Button, Dropdown } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
    tekst: string;
    options: any[];
    heading: string;
    onChange: (verdi: string | null) => void;
    defaultOpen?: boolean;
}

function FilterVelger(props: Props) {
    const { tekst, heading, options, onChange, defaultOpen } = props;
    return (
        <Dropdown defaultOpen={defaultOpen}>
            <Button as={Dropdown.Toggle} iconPosition="right" icon={<PencilIcon aria-hidden />}>
                {tekst}
            </Button>
            <Dropdown.Menu>
                <Dropdown.Menu.GroupedList>
                    <Dropdown.Menu.GroupedList.Heading>
                        {heading}
                    </Dropdown.Menu.GroupedList.Heading>
                    {options.map((option) => {
                        return <Dropdown.Menu.GroupedList.Item key={option} onClick={() => { onChange(option)}}>
                            { option }
                        </Dropdown.Menu.GroupedList.Item>
                    })}
                </Dropdown.Menu.GroupedList>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default FilterVelger;
