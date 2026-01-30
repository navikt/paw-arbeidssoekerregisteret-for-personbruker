import { Button, Chips, Dropdown } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
    values: string[];
    options: string[];
    heading: string;
    onChange: (values: string[]) => void;
    defaultOpen?: boolean;
}

function FilterVelger(props: Props) {
    const { values, heading, options, onChange, defaultOpen } = props;
    return (
        <div className={'flex flex-wrap md:flexno-wrap'}>
            <Dropdown defaultOpen={defaultOpen}>
                <Button
                    variant={'secondary'}
                    size={'small'}
                    as={Dropdown.Toggle}
                    iconPosition="right"
                    icon={<PencilIcon title={'Endre'} />}
                    className={'shrink-0 h-fit mb-2'}
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
                    <Chips.Removable
                        data-color="neutral"
                        key={c}
                        onClick={() => onChange(values.filter((v) => v !== c))}
                    >
                        {c}
                    </Chips.Removable>
                ))}
            </Chips>
        </div>
    );
}

export default FilterVelger;
