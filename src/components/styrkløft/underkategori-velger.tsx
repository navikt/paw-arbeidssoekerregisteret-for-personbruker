import { ActionMenu, Button, Chips } from '@navikt/ds-react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { alfabetiskSortering } from '@/lib/hent-yrkeskategorier';
import { loggUnderkategoriFilter } from '@/lib/tracking';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

type SavedState = {
    [key: string]: {
        [key: string]: boolean;
    };
};

type Options = { navn: string; underKategorier: { navn: string }[] }[];
interface Props {
    triggerText: string;
    options: Options;
    values: string[];
    onChange: (values: string[]) => void;
    sprak: Sprak;
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

function uiStateToChips(savedState: SavedState): string[] {
    return Object.keys(savedState)
        .reduce((res, key) => {
            if (Object.values(savedState[key]).every((underKategori) => underKategori)) {
                return res.concat(key);
            } else {
                const aktiveUnderKategorier = Object.keys(savedState[key])
                    .map((underKategori) => {
                        if (savedState[key][underKategori]) {
                            return underKategori;
                        }
                    })
                    .filter((i) => i) as string[];

                return res.concat(aktiveUnderKategorier);
            }
        }, [] as string[])
        .sort(alfabetiskSortering);
}

function toggleOffChip(savedState: SavedState, kategori: string): SavedState {
    if (savedState[kategori]) {
        const newState = Object.keys(savedState[kategori]).reduce((acc, key) => {
            return { ...acc, [key]: false };
        }, {});
        return { ...savedState, [kategori]: newState };
    } else {
        return Object.keys(savedState).reduce((acc, key) => {
            const newState = Object.keys(savedState[key]).reduce((acc, underKategori) => {
                const value = underKategori === kategori ? false : savedState[key][underKategori];
                return { ...acc, [underKategori]: value };
            }, {});
            return { ...acc, [key]: newState };
        }, {});
    }
}

const TEKSTER = {
    nb: {
        tilbake: 'Tilbake',
        lukk: 'Lukk',
    },
    en: {
        tilbake: 'Back',
        lukk: 'Close',
    },
};
function UnderkategoriVelger(props: Props) {
    const { triggerText, options, values, onChange } = props;
    const [aktivNode, settAktivNode] = useState<string | null>(null);
    const aktiveKategorier = hentAktiveKategorier(options, aktivNode);

    const uiState = getUiState(options, values);
    const tekst = lagHentTekstForSprak(TEKSTER, props.sprak);
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
                    <Button
                        variant="secondary"
                        size={'small'}
                        icon={<ChevronDownIcon aria-hidden />}
                        iconPosition="right"
                        className={'shrink-0 h-fit mb-2'}
                    >
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
                                    loggUnderkategoriFilter({ aktivitet: 'Trykker på Tilbake' });
                                }}
                            >
                                <ChevronLeftIcon title="a11y-title" fontSize="1.5rem" /> {tekst('tilbake')}
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
                                    loggUnderkategoriFilter({
                                        aktivitet: checked ? 'Trykker på velg alle' : 'Trykker på fjern alle',
                                    });
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
                                        loggUnderkategoriFilter({ aktivitet: 'Trykker på hovedkategori' });
                                    } else {
                                        const newState = {
                                            ...uiState,
                                            [aktivNode!]: { ...uiState[aktivNode!], [kat.navn]: checked },
                                        };
                                        onChange(uiStateToValues(newState));
                                        loggUnderkategoriFilter({ aktivitet: 'Trykker på underkategori' });
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
                    {Boolean(aktivNode) && (
                        <>
                            <ActionMenu.Divider />
                            <ActionMenu.Item
                                onSelect={() => {
                                    settAktivNode(null);
                                    loggUnderkategoriFilter({ aktivitet: 'Trykker på Lukk' });
                                }}
                            >
                                <XMarkIcon title="a11y-title" fontSize="1.5rem" />
                                {tekst('lukk')}
                            </ActionMenu.Item>
                        </>
                    )}
                </ActionMenu.Content>
            </ActionMenu>
            <Chips className={'ml-2'}>
                {uiStateToChips(uiState).map((c) => (
                    <Chips.Removable
                        data-color="neutral"
                        key={c}
                        onClick={() => {
                            onChange(uiStateToValues(toggleOffChip(uiState, c)));
                            loggUnderkategoriFilter({ aktivitet: 'Trykker på Chips' });
                        }}
                    >
                        {c}
                    </Chips.Removable>
                ))}
            </Chips>
        </div>
    );
}

export default UnderkategoriVelger;
