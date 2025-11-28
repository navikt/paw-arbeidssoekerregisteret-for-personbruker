import { ActionMenu, Button } from '@navikt/ds-react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { useState } from 'react';

interface Props {
    triggerText: string;
    options: any[];
    values: string[];
    onChange: (values: string[]) => void;
}

function hentAktiveKategorier(options: any[], aktivNode: string | null) {
    if (aktivNode === null) {
        return options;
    }

    const subKategorier = options.find((o) => o.navn === aktivNode)?.subKategorier;
    return subKategorier ?? options;
}

function hentVelgAlleChecked(aktiveKategorier: any[], values: string[]) {
    if (aktiveKategorier.every((kat) => values.includes(kat.navn))) {
        return true;
    } else if (aktiveKategorier.some((kat) => values.includes(kat.navn))) {
        return 'indeterminate';
    } else {
        return false;
    }
}

function MultiCheckboxFacet(props: Props) {
    const { triggerText, options, values, onChange } = props;
    const [aktivNode, settAktivNode] = useState<string | null>(null);
    const aktiveKategorier = hentAktiveKategorier(options, aktivNode);

    return (
        <div className={'flex flex-wrap md:flexno-wrap'}>
            <ActionMenu
                onOpenChange={(open) => {
                    if (!open) {
                        settAktivNode(null);
                    }
                }}
            >
                <ActionMenu.Trigger>
                    <Button variant="secondary-neutral" icon={<ChevronDownIcon aria-hidden />} iconPosition="right">
                        {triggerText}
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    {aktivNode !== null && (
                        <>
                            <ActionMenu.Item
                                onSelect={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    settAktivNode(null);
                                }}
                            >
                                <ChevronLeftIcon title="a11y-title" fontSize="1.5rem" /> Tilbake
                            </ActionMenu.Item>
                            <ActionMenu.Divider />
                            <ActionMenu.CheckboxItem
                                checked={hentVelgAlleChecked(aktiveKategorier, values)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        onChange([
                                            ...new Set(
                                                [...values].concat(aktiveKategorier.map((kat: any) => kat.navn)),
                                            ),
                                        ]);
                                    } else {
                                        onChange(
                                            [...values].filter((v) =>
                                                aktiveKategorier.find((kat: any) => kat.navn === v),
                                            ),
                                        );
                                    }
                                }}
                            >
                                Velg alle
                            </ActionMenu.CheckboxItem>
                        </>
                    )}

                    {aktiveKategorier.map((kat: any) => {
                        const harUnderkategorier = Array.isArray(kat.subKategorier) && kat.subKategorier.length > 0;
                        return (
                            <ActionMenu.CheckboxItem
                                key={kat.navn}
                                checked={values.includes(kat.navn)}
                                onCheckedChange={(checked) => {
                                    if (harUnderkategorier) {
                                        settAktivNode(kat.navn);
                                    } else {
                                        onChange(
                                            checked
                                                ? [...values].concat(kat.navn)
                                                : [...values].filter((v) => v !== kat.navn),
                                        );
                                    }
                                }}
                            >
                                <div className={'flex grow justify-between'}>
                                    {kat.navn}
                                    {harUnderkategorier && <ChevronRightIcon title="a11y-title" fontSize="1.5rem" />}
                                </div>
                            </ActionMenu.CheckboxItem>
                        );
                    })}
                </ActionMenu.Content>
            </ActionMenu>
        </div>
    );
}

export default MultiCheckboxFacet;
