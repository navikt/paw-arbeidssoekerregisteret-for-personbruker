import { ActionMenu, Button } from '@navikt/ds-react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { useEffect, useState } from 'react';

type SavedState = {
    [key: string]: {
        [key: string]: boolean;
    };
};

type Options = { navn: string; underKategorier?: { navn: string }[] }[];
interface Props {
    triggerText: string;
    options: Options;
    values: string[];
    onChange: (values: string[]) => void;
}

function hentAktiveKategorier(options: any[], aktivNode: string | null) {
    if (aktivNode === null) {
        return options;
    }

    const underKategorier = options.find((o) => o.navn === aktivNode)?.underKategorier;
    return underKategorier ?? options;
}

function hentVelgAlleChecked(savedState: SavedState, aktivNode: string) {
    const vals = Object.values(savedState[aktivNode]);

    if (vals.every((val) => val)) {
        return true;
    } else if (vals.some((val) => val)) {
        return 'indeterminate';
    } else {
        return false;
    }
}

function getUiState(options: Options, savedValues: string[]): SavedState {
    return options.reduce((acc, opt) => {
        acc[opt.navn] = opt.underKategorier!.reduce(
            (res, kat) => {
                res[kat.navn] = savedValues.includes(kat.navn);
                return res;
            },
            {} as { [key: string]: boolean },
        );
        return acc;
    }, {} as SavedState);
}

function uiStateToValues(savedState: SavedState): string[] {
    return Object.values(savedState).flatMap((underKategorier) => {
        return Object.keys(underKategorier).filter((key) => underKategorier[key]);
    });
}

function MultiCheckboxFacet(props: Props) {
    const { triggerText, options, values, onChange } = props;
    const [aktivNode, settAktivNode] = useState<string | null>(null);
    const aktiveKategorier = hentAktiveKategorier(options, aktivNode);

    const uiState = getUiState(options, values);

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
                                checked={hentVelgAlleChecked(uiState, aktivNode)}
                                onCheckedChange={(checked) => {
                                    const newState = Object.keys(uiState[aktivNode]).reduce(
                                        (acc, key) => {
                                            acc[key] = checked;
                                            return acc;
                                        },
                                        {} as { [key: string]: boolean },
                                    );
                                    const newUIState = { ...uiState, [aktivNode]: newState };
                                    onChange(uiStateToValues(newUIState));
                                }}
                            >
                                Velg alle
                            </ActionMenu.CheckboxItem>
                        </>
                    )}

                    {aktiveKategorier.map((kat: any) => {
                        const harUnderkategorier = Array.isArray(kat.underKategorier) && kat.underKategorier.length > 0;
                        const checked = harUnderkategorier
                            ? hentVelgAlleChecked(uiState, kat.navn)
                            : uiState[aktivNode!][kat.navn];
                        return (
                            <ActionMenu.CheckboxItem
                                key={kat.navn}
                                checked={checked}
                                onCheckedChange={(checked) => {
                                    if (harUnderkategorier) {
                                        settAktivNode(kat.navn);
                                    } else {
                                        const newState = {
                                            ...uiState,
                                            [aktivNode!]: { ...uiState[aktivNode!], [kat.navn]: checked },
                                        };
                                        onChange(uiStateToValues(newState));
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
