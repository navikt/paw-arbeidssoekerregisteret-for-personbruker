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

function initUIstate(options: Options, savedValues: string[]): SavedState {
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

function UIstateToValues(savedState: SavedState): string[] {
    return Object.values(savedState).flatMap((underKategorier) => {
        return Object.keys(underKategorier).filter((key) => underKategorier[key]);
    });
}

function MultiCheckboxFacet(props: Props) {
    const { triggerText, options, values, onChange } = props;
    const [aktivNode, settAktivNode] = useState<string | null>(null);
    const aktiveKategorier = hentAktiveKategorier(options, aktivNode);
    const [UIstate, setUIstate] = useState<SavedState>(initUIstate(options, values));

    useEffect(() => {
        setUIstate(initUIstate(options, values));
    }, [options, values]);

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
                                checked={hentVelgAlleChecked(UIstate, aktivNode)}
                                onCheckedChange={(checked) => {
                                    const newState = Object.keys(UIstate[aktivNode]).reduce(
                                        (acc, key) => {
                                            acc[key] = checked;
                                            return acc;
                                        },
                                        {} as { [key: string]: boolean },
                                    );
                                    const newUIState = { ...UIstate, [aktivNode]: newState };
                                    onChange(UIstateToValues(newUIState));
                                }}
                            >
                                Velg alle
                            </ActionMenu.CheckboxItem>
                        </>
                    )}

                    {aktiveKategorier.map((kat: any) => {
                        const harUnderkategorier = Array.isArray(kat.underKategorier) && kat.underKategorier.length > 0;
                        const checked = harUnderkategorier
                            ? hentVelgAlleChecked(UIstate, kat.navn)
                            : UIstate[aktivNode!][kat.navn];
                        return (
                            <ActionMenu.CheckboxItem
                                key={kat.navn}
                                checked={checked}
                                onCheckedChange={(checked) => {
                                    if (harUnderkategorier) {
                                        settAktivNode(kat.navn);
                                    } else {
                                        const newState = {
                                            ...UIstate,
                                            [aktivNode!]: { ...UIstate[aktivNode!], [kat.navn]: checked },
                                        };
                                        onChange(UIstateToValues(newState));
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
