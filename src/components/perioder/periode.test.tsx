import { ShowDetailsProvider } from '@/contexts/show-details-context';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Hendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Accordion } from '@navikt/ds-react';
import { render, screen, within } from '@testing-library/react';
import { test, vi } from 'vitest';
import {
    createBekreftelseHendelse,
    createEgenvurderingHendelse,
    createOpplysningerHendelse,
    createPaaVegneAvStartet,
    createPaaVegneAvStoppet,
    createPeriodeStartetHendelse,
    createProfileringHendelse,
} from './__tests__/utils/hendelser';
import { HendelseRenderer } from './hendelse-renderer';
import { Periode } from './periode';

vi.mock('./opplysninger', () => ({
    Opplysninger: ({ opplysninger, sprak }: any) => (
        <div data-testid={opplysninger.id} data-title="opplysninger-hendelse" data-timestamp={opplysninger.tidspunkt}>
            ID: {opplysninger.id}
        </div>
    ),
}));

vi.mock('./hendelse', () => ({
    Hendelse: ({ children, title, timestamp }: { children: React.ReactNode; title: string; timestamp: string }) => (
        <div
            data-testid={`merged-hendelse-${title.toString().toLowerCase().split(' ').join('-')}`}
            data-title={title}
            data-timestamp={timestamp}
        >
            {children}
        </div>
    ),
}));

describe('Periode-komponent', () => {
    const sprak: Sprak = 'nb';
    // Hjelper for å rendere Periode inni en Accordion og context
    const renderPeriode = (hendelser: Hendelse[]) => {
        return render(
            <ShowDetailsProvider>
                <Accordion>
                    <Accordion.Item>
                        <Periode hendelser={hendelser} sprak={sprak} />
                    </Accordion.Item>
                </Accordion>
            </ShowDetailsProvider>,
        );
    };

    describe('Egenvurdering - merging av Opplysninger og Egenvurdering hendelser', () => {
        // Vi tester for "ikke de to første" siden det skjer logikk angående merging der allerede (se opplysninger med periode-startet)
        test('Skal merge egenvurdering med tilhørende opplysning når opplysning ikke er en del av de to første', () => {
            // Lag følgende: periode startet + opplysninger, ny opplysning med profilering og med egenvurdering
            const periodeStartet = createPeriodeStartetHendelse('2025-01-10T10:00:00Z');
            const opplysninger1UtenEgenvurdering = createOpplysningerHendelse(
                '2025-01-10T10:01:00Z',
                'opplysninger-id-1',
            );
            const profileringForOpplysninger1 = createProfileringHendelse(
                '2025-01-10T10:02:00Z',
                'profilering-id-1',
                'opplysninger-id-1',
            );
            const opplysninger2UtenEgenvurdering = createOpplysningerHendelse(
                '2025-01-20T10:00:00Z',
                'opplysninger-id-2',
            );
            const opplysninger3 = createOpplysningerHendelse('2025-01-20T10:00:00Z', 'opplysninger-id-3');
            const profileringForOpplysninger3 = createProfileringHendelse(
                '2025-01-20T10:01:00Z',
                'profilering-id-2',
                'opplysninger-id-3',
            );
            const egenvurdering1 = createEgenvurderingHendelse(
                '2025-01-20T11:00:00Z',
                'profilering-id-2',
                'ANTATT_GODE_MULIGHETER',
                'egenvurdering-id-1',
            );
            const bekreftelse = createBekreftelseHendelse('2025-01-21T10:00:00Z');

            renderPeriode([
                periodeStartet,
                opplysninger1UtenEgenvurdering,
                profileringForOpplysninger1,
                opplysninger2UtenEgenvurdering,
                opplysninger3,
                profileringForOpplysninger3,
                egenvurdering1,
                bekreftelse,
            ]);

            // Finn og verifiser at opplysninger 3 er tilstede
            const _opplysninger3 = screen.getByTestId('opplysninger-id-3');
            expect(_opplysninger3).toBeInTheDocument;
            expect(_opplysninger3).toHaveTextContent('opplysninger-id-3');

            // Hent parent wrapper (merged-hendelse)
            const parent = _opplysninger3.parentElement;
            if (!parent) throw new Error('Parent element not found for opplysninger-id-3');
            const _egenvurdering = within(parent).getByText('Egenvurdering');
            expect(_egenvurdering).toBeInTheDocument();
        });

        test('Skal ikke merge eller rendere egenvurdering dersom den ikke finner en tilhørende opplysning', () => {
            const periodeStartet = createPeriodeStartetHendelse('2025-01-10T10:00:00Z');
            const opplysninger1UtenEgenvurdering = createOpplysningerHendelse(
                '2025-01-10T10:01:00Z',
                'opplysninger-id-1',
            );
            const profileringForOpplysninger1 = createProfileringHendelse(
                '2025-01-10T10:02:00Z',
                'profilering-id-1',
                'opplysninger-id-1',
            );
            const opplysninger2UtenEgenvurdering = createOpplysningerHendelse(
                '2025-01-20T10:00:00Z',
                'opplysninger-id-2',
            );
            const opplysninger3 = createOpplysningerHendelse('2025-01-20T10:00:00Z', 'opplysninger-id-3');
            const profileringForOpplysninger3 = createProfileringHendelse(
                '2025-01-20T10:01:00Z',
                'profilering-id-2',
                'opplysninger-id-3',
            );
            const egenvurdering1 = createEgenvurderingHendelse(
                '2025-01-20T11:00:00Z',
                'profilering-id-FINNES-IKKE',
                'ANTATT_GODE_MULIGHETER',
                'egenvurdering-id-1',
            );
            const bekreftelse = createBekreftelseHendelse('2025-01-21T10:00:00Z');

            // Sjekk at ingen teskt "Egenvurdering" finnes i renderet output
            const hendelser = [
                periodeStartet,
                opplysninger1UtenEgenvurdering,
                profileringForOpplysninger1,
                opplysninger2UtenEgenvurdering,
                opplysninger3,
                profileringForOpplysninger3,
                egenvurdering1,
                bekreftelse,
            ];

            renderPeriode(hendelser);

            expect(screen.queryByText('Egenvurdering')).not.toBeInTheDocument();
        });

        test('Skal merge egenvurdering med tilhørende opplysning når opplysning er en del av de to første', () => {
            // Alle disse hendelsene skal merges i en og samme Opplysninger-komponent (profilering er kun brukt for mapping)
            const hendelser = [
                createPeriodeStartetHendelse('2025-01-10T10:00:00Z'),
                createOpplysningerHendelse('2025-01-10T10:01:00Z', 'opplysninger-id-1'),
                createProfileringHendelse('2025-01-10T10:02:00Z', 'profilering-id-1', 'opplysninger-id-1'),
                createEgenvurderingHendelse(
                    '2025-01-20T11:00:00Z',
                    'profilering-id-1',
                    'ANTATT_GODE_MULIGHETER',
                    'egenvurdering-id-1',
                ),
            ];

            renderPeriode(hendelser);

            const forsteHendelse = screen.getByTestId('merged-hendelse-registrert-som-arbeidssøker');
            expect(forsteHendelse).toBeInTheDocument();

            const _opplysninger = within(forsteHendelse).getByTestId('opplysninger-id-1');
            expect(_opplysninger).toBeInTheDocument();
            expect(_opplysninger).toHaveTextContent('opplysninger-id-1');

            const _egenvurdering = within(forsteHendelse).getByText('Egenvurdering');
            expect(_egenvurdering).toBeInTheDocument();
        });
    });

    describe('Fletting av periode startet og opplysninger', () => {
        test('skal IKKE slå sammen når det er færre enn 2 hendelser', () => {
            const hendelser: Hendelse[] = [createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z')];
            renderPeriode(hendelser);
            expect(screen.queryByTestId('opplysninger')).not.toBeInTheDocument();
            const renderedHendelser = screen.getAllByTestId('merged-hendelse-registrert-som-arbeidssøker-av-veileder');
            expect(renderedHendelser).toHaveLength(1);
        });

        test('Skal merge opplysninger med periode startet når begge er blant de to første hendelsene', () => {
            const hendelser = [
                createPeriodeStartetHendelse('2025-01-10T10:00:00Z'),
                createOpplysningerHendelse('2025-01-10T10:01:00Z', 'opplysninger-id-1'),
                createProfileringHendelse('2025-01-10T10:02:00Z', 'profilering-id-1', 'opplysninger-id-1'),
                createEgenvurderingHendelse(
                    '2025-01-20T11:00:00Z',
                    'profilering-id-1',
                    'ANTATT_GODE_MULIGHETER',
                    'egenvurdering-id-1',
                ),
                createBekreftelseHendelse('2025-01-21T10:00:00Z'),
                createBekreftelseHendelse('2025-02-13T10:00:00Z'),
            ];
            renderPeriode(hendelser);

            const forsteHendelse = screen.getByTestId('merged-hendelse-registrert-som-arbeidssøker');
            expect(forsteHendelse).toBeInTheDocument();
            expect(forsteHendelse).toHaveAttribute('data-title', 'Registrert som arbeidssøker');

            const opplysninger = within(forsteHendelse).getByTestId('opplysninger-id-1');
            expect(opplysninger).toBeInTheDocument();
            expect(opplysninger).toHaveTextContent('opplysninger-id-1');
        });
        test('Skal merge opplysninger med periode startet når begge er blant de to første hendelsene (men i motsatt rekkefølge)', () => {
            const hendelser = [
                createOpplysningerHendelse('2025-01-10T10:00:00Z', 'opplysninger-id-1'),
                createPeriodeStartetHendelse('2025-01-10T10:01:00Z'),
                createProfileringHendelse('2025-01-10T10:02:00Z', 'profilering-id-1', 'opplysninger-id-1'),
                createEgenvurderingHendelse(
                    '2025-01-20T11:00:00Z',
                    'profilering-id-1',
                    'ANTATT_GODE_MULIGHETER',
                    'egenvurdering-id-1',
                ),
                createBekreftelseHendelse('2025-01-21T10:00:00Z'),
                createBekreftelseHendelse('2025-02-13T10:00:00Z'),
            ];
            renderPeriode(hendelser);

            const forsteHendelse = screen.getByTestId('merged-hendelse-registrert-som-arbeidssøker');
            expect(forsteHendelse).toBeInTheDocument();
            expect(forsteHendelse).toHaveAttribute('data-title', 'Registrert som arbeidssøker');

            const opplysninger = within(forsteHendelse).getByTestId('opplysninger-id-1');
            expect(opplysninger).toBeInTheDocument();
            expect(opplysninger).toHaveTextContent('opplysninger-id-1');
        });

        test('Skal ikke merge opplysninger med periode startet når opplysninger ikke er blant de to første hendelsene', () => {
            const hendelser = [
                createPeriodeStartetHendelse('2025-01-10T10:00:00Z'),
                createBekreftelseHendelse('2025-01-10T10:01:00Z'),
                createBekreftelseHendelse('2025-01-10T10:02:00Z'),
                createBekreftelseHendelse('2025-01-10T10:03:00Z'),
                createOpplysningerHendelse('2025-01-10T10:04:00Z', 'opplysninger-id-1'),
            ];
            renderPeriode(hendelser);
            // "merged-hendelse-x", merged er lagt på via mock, det betyr ikke at en reel fletting
            const forsteHendelse = screen.getByTestId('merged-hendelse-registrert-som-arbeidssøker-av-veileder');
            expect(forsteHendelse).toBeInTheDocument();

            // Sjekk at forsteHendelse ikke inneholder opplysninger
            expect(within(forsteHendelse).queryByTestId('opplysninger-id-1')).not.toBeInTheDocument();
        });
    });

    describe('Sortering av hendelser', () => {
        test('Hendelser som kommer med nyeste først skal snus', () => {
            const hendelser = [
                createBekreftelseHendelse('2025-02-13T10:00:00Z'),
                createEgenvurderingHendelse(
                    '2025-01-20T11:00:00Z',
                    'profilering-id-1',
                    'ANTATT_GODE_MULIGHETER',
                    'egenvurdering-id-1',
                ),
                createBekreftelseHendelse('2025-01-21T10:00:00Z'),
                createProfileringHendelse('2025-01-10T10:02:00Z', 'profilering-id-1', 'opplysninger-id-1'),
                createOpplysningerHendelse('2025-01-10T10:01:00Z', 'opplysninger-id-1'),
                createPeriodeStartetHendelse('2025-01-10T10:00:00Z'),
            ];
            renderPeriode(hendelser);

            const hendelseElements = screen.getAllByTestId(/merged-hendelse-/);
            expect(hendelseElements.length).toBe(3);

            // Sjekk at den første hendelsen er den eldste (Periode startet)
            expect(hendelseElements[0]).toHaveAttribute('data-title', 'Registrert som arbeidssøker');

            // Sjekk at den siste hendelsen er den nyeste (Bekreftelse)
            expect(hendelseElements[2]).toHaveAttribute('data-title', 'Bekreftelse levert');
        });

        test('Hendelser som kommer i helt tilfeldig rekkefølge skal sorteres korrekt', () => {
            const hendelser = [
                createBekreftelseHendelse('2025-01-15T10:00:00Z'),
                createEgenvurderingHendelse(
                    '2025-01-03T11:00:00Z',
                    'profilering-id-1',
                    'ANTATT_GODE_MULIGHETER',
                    'egenvurdering-id-1',
                ),
                createOpplysningerHendelse('2025-01-02T10:01:00Z', 'opplysninger-id-1'),
                createBekreftelseHendelse('2025-02-21T10:00:00Z'),
                createProfileringHendelse('2025-03-10T10:02:00Z', 'profilering-id-1', 'opplysninger-id-1'),
                createPeriodeStartetHendelse('2025-01-01T10:00:00Z'),
            ];
            renderPeriode(hendelser);
        });
    });
    describe('Komponenter som ikke skal renderes', () => {
        test('Skal ikke rendere Profilering hendelser', () => {
            const hendelser = [
                createProfileringHendelse('2025-03-10T10:02:00Z', 'profilering-id-1', 'opplysninger-id-1'),
            ];
            const { container } = render(<HendelseRenderer hendelse={hendelser[0]} sprak={sprak} />);
            expect(container.firstChild).toBeNull();
        });
        test('Skal ikke rendere pa-vegne-av-start hendelse', () => {
            const hendelser = [createPaaVegneAvStartet()];
            const { container } = render(<HendelseRenderer hendelse={hendelser[0]} sprak={sprak} />);
            expect(container.firstChild).toBeNull();
        });
        test('Skal ikke rendere pa-vegne-av-stopp hendelse', () => {
            const hendelser = [createPaaVegneAvStoppet()];
            const { container } = render(<HendelseRenderer hendelse={hendelser[0]} sprak={sprak} />);
            expect(container.firstChild).toBeNull();
        });
    });
});
