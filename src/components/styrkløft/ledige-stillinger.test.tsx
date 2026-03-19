import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import LedigeStillinger from '@/components/styrkløft/ledige-stillinger';
import type {
    DirektemeldtStillingTag,
    JobbAnnonse,
    LedigeStillinger as LedigeStillingerSoek,
} from '@/model/brukerprofil';

const { loggDirektemeldtStillinger, loggStyrkeloft } = vi.hoisted(() => ({
    loggDirektemeldtStillinger: vi.fn(),
    loggStyrkeloft: vi.fn(),
}));

vi.mock('@/lib/tracking', () => ({
    loggDirektemeldtStillinger,
    loggStyrkeloft,
}));

vi.mock('@/components/ux-signals/vis-widget-for-aktive-styrkeloeftere', () => ({
    default: () => <div data-testid="ux-widget" />,
}));

function lagStilling(id: string, tags: readonly DirektemeldtStillingTag[] = []): JobbAnnonse {
    return {
        arbeidsplassenNoId: id,
        tittel: `Stilling ${id}`,
        publisert: '2025-01-01T12:00:00.000Z',
        stillingbeskrivelse: `Beskrivelse ${id}`,
        soeknadsfrist: { raw: 'Snarest' },
        land: 'Norge',
        kommune: 'Oslo',
        sektor: 'Privat',
        selskap: 'Nav',
        tags,
    };
}

function lagData(resultat: JobbAnnonse[]): LedigeStillingerSoek {
    return {
        soek: {
            soekType: 'STED_SOEK_V1',
            fylker: [],
            soekeord: [],
        },
        resultat,
    };
}

function renderKomponent({
    data,
    kanSeDirektemeldteStillinger = true,
}: {
    data: LedigeStillingerSoek;
    kanSeDirektemeldteStillinger?: boolean;
}) {
    return render(
        <LedigeStillinger
            useOnFetchData={() => ({ data })}
            sprak="nb"
            kanSeDirektemeldteStillinger={kanSeDirektemeldteStillinger}
        />,
    );
}

function hentTitler() {
    return screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent);
}

describe('LedigeStillinger', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Element.prototype.scrollIntoView = vi.fn();
    });

    test('viser bare direktemeldte stillinger som standard når brukeren kan se dem', () => {
        const data = lagData([
            lagStilling('1', ['DIREKTEMELDT_V1']),
            lagStilling('2'),
            lagStilling('3', ['DIREKTEMELDT_V1']),
            lagStilling('4'),
        ]);

        renderKomponent({ data });

        expect(screen.getByRole('radio', { name: 'Reserverte stillinger' })).toHaveAttribute('aria-checked', 'true');
        expect(hentTitler()).toEqual(['Stilling 1', 'Stilling 3']);
        expect(screen.queryByRole('button', { name: 'Neste side' })).not.toBeInTheDocument();
    });

    test('nullstiller paginering og viser ledige stillinger når brukeren bytter fane', () => {
        const direktemeldte = Array.from({ length: 8 }, (_, index) =>
            lagStilling(`d${index + 1}`, ['DIREKTEMELDT_V1']),
        );
        const ledige = Array.from({ length: 8 }, (_, index) => lagStilling(`l${index + 1}`));

        renderKomponent({ data: lagData([...direktemeldte, ...ledige]) });

        expect(hentTitler()).toEqual([
            'Stilling d1',
            'Stilling d2',
            'Stilling d3',
            'Stilling d4',
            'Stilling d5',
            'Stilling d6',
            'Stilling d7',
        ]);
        expect(screen.getByRole('button', { name: 'Neste side' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Neste side' }));

        expect(screen.getByRole('heading', { level: 2, name: 'Stilling d8' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { level: 2, name: 'Stilling d1' })).not.toBeInTheDocument();
        expect(loggStyrkeloft).toHaveBeenCalledWith({ aktivitet: 'Trykker på pagineringsknapp' });

        fireEvent.click(screen.getByRole('radio', { name: 'Ledige stillinger' }));

        expect(screen.getByRole('radio', { name: 'Ledige stillinger' })).toHaveAttribute('aria-checked', 'true');
        expect(hentTitler()).toEqual([
            'Stilling l1',
            'Stilling l2',
            'Stilling l3',
            'Stilling l4',
            'Stilling l5',
            'Stilling l6',
            'Stilling l7',
        ]);
        expect(loggDirektemeldtStillinger).toHaveBeenCalledWith({
            aktivitet: 'Trykker på "Ledige stillinger" fane',
        });
    });
});
