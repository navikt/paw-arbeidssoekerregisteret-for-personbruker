import { Button, Dropdown, Tag } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';

interface Props {
    tekst: string;
    options: any[];
    heading: string;
    onChange: (verdi: string | null) => void;
    defaultOpen?: boolean;
}

function FilterVelger2(props: Props) {
    const { tekst, heading, options, onChange, defaultOpen } = props;
    return (
        <div className={'flex'}>
            <Tag variant="neutral" className={'mr-2'}>{tekst}</Tag>
            <Dropdown defaultOpen={defaultOpen}>
                <Button variant={'secondary'} as={Dropdown.Toggle} size={'small'} iconPosition="right" icon={<PencilIcon title={'Endre'}/>} />
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Heading>
                            {heading}
                        </Dropdown.Menu.GroupedList.Heading>
                        <Dropdown.Menu.Divider />
                        {options.map((option) => {
                            return <Dropdown.Menu.GroupedList.Item key={option} onClick={() => { onChange(option)}}>
                                { option }
                            </Dropdown.Menu.GroupedList.Item>
                        })}
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default FilterVelger2;
