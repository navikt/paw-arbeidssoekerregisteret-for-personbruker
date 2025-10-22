import { Button, Chips, Dropdown } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
    values: any[];
    options: any[];
    heading: string;
    onChange: (values: any[]) => void;
    defaultOpen?: boolean;
}

function FilterVelger(props: Props) {
    const { values, heading, options, onChange, defaultOpen } = props;
    return (
        <div className={'flex'}>
            <Dropdown defaultOpen={defaultOpen}>
                <Button
                    variant={'secondary'}
                    size={'small'}
                    as={Dropdown.Toggle}
                    iconPosition="right"
                    icon={<PencilIcon title={'Endre'} />}
                >
                    {heading}
                </Button>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Heading>{heading}</Dropdown.Menu.GroupedList.Heading>
                        <Dropdown.Menu.Divider />
                        {options.map((option) => {
                            const isDisabled = values.indexOf(option) !== -1;
                            return (
                                <Dropdown.Menu.GroupedList.Item
                                    key={option}
                                    disabled={isDisabled}
                                    onClick={() => {
                                        onChange(values.concat(option));
                                    }}
                                >
                                    {option}
                                </Dropdown.Menu.GroupedList.Item>
                            );
                        })}
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
            <Chips className={'ml-2'}>
                {values.map((c) => (
                    <Chips.Removable key={c} variant="neutral" onClick={() => onChange(values.filter((v) => v !== c))}>
                        {c}
                    </Chips.Removable>
                ))}
            </Chips>
        </div>
    );
}

export default FilterVelger;
