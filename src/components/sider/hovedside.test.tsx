import type { Snapshot } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { snapshotMock } from '@/app/mockdata';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import SettSprakIDekorator from '@/components/sett-sprak-i-dekorator';
import { HovedsideInnhold } from './hovedside';

const dekoratorMock = vi.hoisted(() => ({
    onLanguageSelect: vi.fn(),
    routerPush: vi.fn(),
    setBreadcrumbs: vi.fn(),
    setParams: vi.fn(),
}));

vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
    onLanguageSelect: dekoratorMock.onLanguageSelect,
    setBreadcrumbs: dekoratorMock.setBreadcrumbs,
    setParams: dekoratorMock.setParams,
}));

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: dekoratorMock.routerPush }) }));

const renderHovedside = (snapshot: Snapshot | undefined, innloggingsNivaa = 'idporten-loa-high') =>
    render(
        <HovedsideInnhold
            sprak="nb"
            snapshot={snapshot}
            innloggingsNivaa={innloggingsNivaa}
            registrerArbeidssokerUrl="https://www.nav.no/registrer"
            oppdaterOpplysningerUrl="https://www.nav.no/oppdater"
            bekreftelse={<div data-testid="bekreftelse-slot" />}
            egenvurdering={<div data-testid="egenvurdering-slot" />}
            styrk={<div data-testid="styrk-slot" />}
        />,
    );

describe('HovedsideInnhold', () => {
    it('viser aktiv periode, opplysninger og alle relevante slots', () => {
        renderHovedside(snapshotMock);

        expect(screen.getByRole('heading', { name: 'Du er registrert som arbeidssøker' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Opplysninger fra registrering' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Endre svar' })).toHaveAttribute('href', 'https://www.nav.no/oppdater');
        expect(screen.getByTestId('bekreftelse-slot')).toBeInTheDocument();
        expect(screen.getByTestId('egenvurdering-slot')).toBeInTheDocument();
        expect(screen.getByTestId('styrk-slot')).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Registrer deg som arbeidssøker' })).not.toBeInTheDocument();
    });

    it('viser registreringslenke og historikk for en avsluttet periode', () => {
        renderHovedside({
            ...snapshotMock,
            avsluttet: {
                tidspunkt: '2026-10-15T10:00:00.000Z',
                sendtInnAv: { aarsak: 'stopp av periode' },
            },
        } as Snapshot);

        expect(
            screen.getByRole('heading', { name: 'Du er ikke lenger registrert som arbeidssøker' }),
        ).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Registrer deg som arbeidssøker' })).toHaveAttribute(
            'href',
            'https://www.nav.no/registrer',
        );
        expect(screen.getByRole('link', { name: 'Se tidligere registreringer og opplysninger' })).toBeInTheDocument();
        expect(screen.queryByTestId('styrk-slot')).not.toBeInTheDocument();
    });

    it('viser registreringslenke uten historikk når snapshot mangler', () => {
        renderHovedside(undefined);

        expect(screen.getByRole('heading', { name: 'Du er ikke registrert som arbeidssøker' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Registrer deg som arbeidssøker' })).toBeInTheDocument();
        expect(
            screen.queryByRole('link', { name: 'Se tidligere registreringer og opplysninger' }),
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId('styrk-slot')).not.toBeInTheDocument();
    });

    it('viser manglende opplysninger og advarsel ved lavt innloggingsnivå', () => {
        renderHovedside({ ...snapshotMock, opplysning: undefined }, 'idporten-loa-substantial');

        expect(screen.getByText('Du er registrert som arbeidssøker.')).toBeInTheDocument();
        expect(screen.getByText(/Du har logget inn med Min ID/)).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Opplysninger fra registrering' })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Endre svar' })).not.toBeInTheDocument();
    });

    it('skjuler endre-lenken ved lavt innloggingsnivå selv når opplysninger finnes', () => {
        renderHovedside(snapshotMock, 'idporten-loa-substantial');

        expect(screen.getByRole('heading', { name: 'Opplysninger fra registrering' })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: 'Endre svar' })).not.toBeInTheDocument();
    });
});

describe('Dekoratørintegrasjon', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('sender breadcrumbs til dekoratøren uten å rendre synlig innhold', async () => {
        const breadcrumbs = [
            { title: 'Min side', url: '/minside' },
            { title: 'Arbeidssøkerregisteret', url: '/arbeidssoekerregisteret' },
        ];
        const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />);

        await waitFor(() => expect(setBreadcrumbs).toHaveBeenCalledWith(breadcrumbs));
        expect(container).toBeEmptyDOMElement();
    });

    it('kobler språkvelgeren til ruting og setter språkparametere', async () => {
        render(<SettSprakIDekorator sprak="nn" />);

        await waitFor(() => expect(dekoratorMock.setParams).toHaveBeenCalledWith({ language: 'nn' }));
        expect(document.documentElement).toHaveAttribute('lang', 'nn');

        window.history.replaceState({}, '', '/arbeidssoekerregisteret/nn/historikk');
        const velgSprak = dekoratorMock.onLanguageSelect.mock.calls[0]?.[0];
        velgSprak?.({ locale: 'en', handleInApp: true });

        expect(dekoratorMock.routerPush).toHaveBeenCalledWith('/en/historikk');
    });
});
