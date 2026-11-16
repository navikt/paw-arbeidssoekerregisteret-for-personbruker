import { PencilIcon } from '@navikt/aksel-icons';
import { Box, Button, Chips, Dropdown, HStack } from '@navikt/ds-react';

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
        <HStack align="start">
            <Dropdown defaultOpen={defaultOpen}>
                <Box asChild flexShrink="0" height="fit-content" marginBlock="space-0 space-8">
                    <Button
                        variant={'secondary'}
                        size={'small'}
                        as={Dropdown.Toggle}
                        iconPosition="right"
                        icon={<PencilIcon title={'Endre'} />}
                    >
                        {heading}
                    </Button>
                </Box>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Heading>{heading}</Dropdown.Menu.GroupedList.Heading>
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
            <Box asChild marginInline="space-8 space-0">
                <Chips>
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
            </Box>
        </HStack>
    );
}

export default FilterVelger;
