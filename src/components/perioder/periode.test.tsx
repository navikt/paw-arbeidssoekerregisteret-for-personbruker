import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Periode } from './periode';
import { Hendelse } from '@navikt/arbeidssokerregisteret-utils/oppslag/v3';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

vi.mock('./hendelse', () => ({
    Hendelse: ({ children, title, timestamp }: any) => (
        <div data-testid="merged-hendelse-wrapper" data-title={title} data-timestamp={timestamp}>
            {children}
        </div>
    ),
}));

vi.mock('./opplysninger', () => ({
    Opplysninger: ({ opplysninger }: any) => (
        <div data-testid="opplysninger" data-id={opplysninger.id}>
            Opplysninger
        </div>
    ),
}));

vi.mock('./hendelse-renderer', () => ({
    HendelseRenderer: ({ hendelse }: any) => (
        <div data-testid="individual-hendelse" data-type={hendelse.type} data-timestamp={hendelse.tidspunkt}>
            {hendelse.type}
        </div>
    ),
}));

vi.mock('@navikt/ds-react', () => ({
    Accordion: {
        Content: ({ children }: any) => <div data-testid="accordion-content">{children}</div>,
    },
    Process: ({ children }: any) => <div data-testid="process">{children}</div>,
}));

const createPeriodeStartetHendelse = (tidspunkt: string): Hendelse => ({
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'VEILEDER',
            id: 'Z123456',
        },
        kilde: 'test',
        aarsak: 'Test årsak',
    },
    tidspunkt,
    type: 'PERIODE_STARTET_V1',
});

const createOpplysningerHendelse = (tidspunkt: string, id = 'test-id'): Hendelse => ({
    id,
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'VEILEDER',
            id: 'Z123456',
        },
        kilde: 'test',
        aarsak: 'Test årsak',
    },
    utdanning: {
        nus: '3',
        bestaatt: 'JA',
        godkjent: 'JA',
    },
    helse: {
        helsetilstandHindrerArbeid: 'NEI',
    },
    jobbsituasjon: {
        beskrivelser: [],
    },
    annet: {
        andreForholdHindrerArbeid: 'NEI',
    },
    tidspunkt,
    type: 'OPPLYSNINGER_V4',
});

const createProfileringHendelse = (tidspunkt: string): Hendelse => ({
    id: 'profilering-id',
    opplysningerOmArbeidssokerId: 'opplysninger-id',
    sendtInnAv: {
        tidspunkt,
        utfoertAv: {
            type: 'SYSTEM',
            id: 'system',
        },
        kilde: 'test',
        aarsak: 'Test',
    },
    profilertTil: 'ANTATT_GODE_MULIGHETER',
    jobbetSammenhengendeSeksAvTolvSisteMnd: true,
    alder: 35,
    tidspunkt,
    type: 'PROFILERING_V1',
});

const createBekreftelseHendelse = (tidspunkt: string): Hendelse => ({
    id: 'bekreftelse-id',
    bekreftelsesloesning: 'ARBEIDSSOEKERREGISTERET',
    status: 'GYLDIG',
    svar: {
        sendtInnAv: {
            tidspunkt,
            utfoertAv: {
                type: 'SLUTTBRUKER',
                id: 'test-user',
            },
            kilde: 'test',
            aarsak: 'Test bekreftelse',
        },
        gjelderFra: '2025-01-13T00:00:00Z',
        gjelderTil: '2025-01-20T00:00:00Z',
        harJobbetIDennePerioden: false,
        vilFortsetteSomArbeidssoeker: true,
    },
    tidspunkt,
    type: 'BEKREFTELSE_V1',
});

describe('Periode-komponent', () => {
    const sprak: Sprak = 'nb';

    describe('Sorteringslogikk', () => {
        test('skal sortere hendelser etter tidspunkt i stigende rekkefølge', () => {
            const hendelser: Hendelse[] = [
                createBekreftelseHendelse('2025-01-13T12:00:00.000Z'),
                createBekreftelseHendelse('2025-01-13T11:00:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser[0]).toHaveAttribute('data-timestamp', '2025-01-13T10:00:00.000Z');
            expect(renderedHendelser[1]).toHaveAttribute('data-timestamp', '2025-01-13T11:00:00.000Z');
            expect(renderedHendelser[2]).toHaveAttribute('data-timestamp', '2025-01-13T12:00:00.000Z');
        });

        test('skal opprettholde rekkefølge for hendelser med samme tidspunkt', () => {
            const timestamp = '2025-01-13T10:00:00.000Z';
            const hendelser: Hendelse[] = [createOpplysningerHendelse(timestamp), createBekreftelseHendelse(timestamp)];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(2);
        });
    });

    describe('Sammenslåingslogikk - shouldMergeFirstTwoHendelser', () => {
        test('skal IKKE slå sammen når det er færre enn 2 hendelser', () => {
            const hendelser: Hendelse[] = [createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z')];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.queryByTestId('opplysninger')).not.toBeInTheDocument();
            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(1);
        });

        test('skal IKKE slå sammen når det er nøyaktig 0 hendelser', () => {
            const hendelser: Hendelse[] = [];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.queryByTestId('opplysninger')).not.toBeInTheDocument();
            expect(screen.queryByTestId('individual-hendelse')).not.toBeInTheDocument();
        });

        test('skal slå sammen PERIODE_STARTET_V1 og OPPLYSNINGER_V4 når de er de to første (i den rekkefølgen)', () => {
            const hendelser: Hendelse[] = [
                createProfileringHendelse('2025-01-13T10:02:00.000Z'),
                createOpplysningerHendelse('2025-01-13T10:01:00.000Z', 'opplysninger-1'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.getByTestId('merged-hendelse-wrapper')).toBeInTheDocument();
            expect(screen.getByTestId('opplysninger')).toHaveAttribute('data-id', 'opplysninger-1');
            expect(screen.getByTestId('merged-hendelse-wrapper')).toHaveAttribute(
                'data-title',
                'Registrert som arbeidssøker',
            );

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(1);
            expect(renderedHendelser[0]).toHaveAttribute('data-type', 'PROFILERING_V1');
        });

        test('skal slå sammen OPPLYSNINGER_V4 og PERIODE_STARTET_V1 når de er de to første (omvendt rekkefølge)', () => {
            const hendelser: Hendelse[] = [
                createProfileringHendelse('2025-01-13T10:02:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:01:00.000Z'),
                createOpplysningerHendelse('2025-01-13T10:00:00.000Z', 'opplysninger-2'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.getByTestId('merged-hendelse-wrapper')).toBeInTheDocument();
            expect(screen.getByTestId('opplysninger')).toHaveAttribute('data-id', 'opplysninger-2');

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(1);
        });

        test('skal IKKE slå sammen når de to første er PERIODE_STARTET_V1 og PROFILERING_V1', () => {
            const hendelser: Hendelse[] = [
                createProfileringHendelse('2025-01-13T10:01:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.queryByTestId('opplysninger')).not.toBeInTheDocument();
            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(2);
        });

        test('skal IKKE slå sammen når de to første er BEKREFTELSE_V1 og PROFILERING_V1', () => {
            const hendelser: Hendelse[] = [
                createProfileringHendelse('2025-01-13T10:02:00.000Z'),
                createBekreftelseHendelse('2025-01-13T10:01:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:03:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.queryByTestId('opplysninger')).not.toBeInTheDocument();
            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(3);
        });

        test('skal IKKE slå sammen når OPPLYSNINGER_V4 IKKE er i de to første posisjonene', () => {
            const hendelser: Hendelse[] = [
                createOpplysningerHendelse('2025-01-13T10:03:00.000Z'),
                createProfileringHendelse('2025-01-13T10:02:00.000Z'),
                createBekreftelseHendelse('2025-01-13T10:01:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.queryByTestId('opplysninger')).not.toBeInTheDocument();
            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(4);
        });

        test('skal slå sammen selv når det bare er nøyaktig 2 hendelser (PERIODE_STARTET_V1 og OPPLYSNINGER_V4)', () => {
            const hendelser: Hendelse[] = [
                createOpplysningerHendelse('2025-01-13T10:01:00.000Z', 'only-two'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.getByTestId('merged-hendelse-wrapper')).toBeInTheDocument();
            expect(screen.getByTestId('opplysninger')).toHaveAttribute('data-id', 'only-two');

            expect(screen.queryByTestId('individual-hendelse')).not.toBeInTheDocument();
        });

        test('skal håndtere usortert input korrekt - slå sammen etter sortering', () => {
            const hendelser: Hendelse[] = [
                createProfileringHendelse('2025-01-13T10:03:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:01:00.000Z'),
                createOpplysningerHendelse('2025-01-13T10:00:00.000Z', 'unsorted'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.getByTestId('merged-hendelse-wrapper')).toBeInTheDocument();
            expect(screen.getByTestId('opplysninger')).toHaveAttribute('data-id', 'unsorted');

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(1);
            expect(renderedHendelser[0]).toHaveAttribute('data-type', 'PROFILERING_V1');
        });
    });

    describe('Renderingslogikk', () => {
        test('skal bruke PERIODE_STARTET_V1 tidspunkt for sammenslått hendelse', () => {
            const hendelser: Hendelse[] = [
                createOpplysningerHendelse('2025-01-13T10:01:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const hendelse = screen.getByTestId('merged-hendelse-wrapper');
            expect(hendelse).toHaveAttribute('data-timestamp', '2025-01-13T10:00:00.000Z');
        });

        test('skal rendere alle hendelser når de ikke slås sammen', () => {
            const hendelser: Hendelse[] = [
                createBekreftelseHendelse('2025-01-13T10:02:00.000Z'),
                createProfileringHendelse('2025-01-13T10:01:00.000Z'),
                createOpplysningerHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(3);
        });

        test('skal rendere hendelser i riktig rekkefølge etter sammenslåing', () => {
            const hendelser: Hendelse[] = [
                createBekreftelseHendelse('2025-01-13T10:03:00.000Z'),
                createProfileringHendelse('2025-01-13T10:02:00.000Z'),
                createOpplysningerHendelse('2025-01-13T10:01:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const mergedHendelse = screen.getByTestId('merged-hendelse-wrapper');
            expect(mergedHendelse).toBeInTheDocument();

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(2);
            expect(renderedHendelser[0]).toHaveAttribute('data-type', 'PROFILERING_V1');
            expect(renderedHendelser[1]).toHaveAttribute('data-type', 'BEKREFTELSE_V1');
        });
    });

    describe('Spesialtilfeller med komplekse perioder', () => {
        test('skal håndtere flere OPPLYSNINGER_V4 hendelser - slå kun sammen første forekomst', () => {
            const hendelser: Hendelse[] = [
                createOpplysningerHendelse('2025-01-13T10:04:00.000Z', 'third-opplysninger'),
                createOpplysningerHendelse('2025-01-13T10:03:00.000Z', 'second-opplysninger'),
                createProfileringHendelse('2025-01-13T10:02:00.000Z'),
                createOpplysningerHendelse('2025-01-13T10:01:00.000Z', 'first-opplysninger'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            expect(screen.getByTestId('opplysninger')).toHaveAttribute('data-id', 'first-opplysninger');

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(3);
            const opplysningerRenderer = renderedHendelser.find(
                (el) => el.getAttribute('data-type') === 'OPPLYSNINGER_V4',
            );
            expect(opplysningerRenderer).toBeInTheDocument();
        });

        test('skal håndtere periode med bare PERIODE_STARTET_V1', () => {
            const hendelser: Hendelse[] = [createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z')];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(1);
            expect(renderedHendelser[0]).toHaveAttribute('data-type', 'PERIODE_STARTET_V1');
        });

        test('skal håndtere periode med bare OPPLYSNINGER_V4', () => {
            const hendelser: Hendelse[] = [createOpplysningerHendelse('2025-01-13T10:00:00.000Z')];

            render(<Periode hendelser={hendelser} sprak={sprak} />);

            const renderedHendelser = screen.getAllByTestId('individual-hendelse');
            expect(renderedHendelser).toHaveLength(1);
            expect(renderedHendelser[0]).toHaveAttribute('data-type', 'OPPLYSNINGER_V4');
        });

        test('skal sende riktig språk til underkomponenter ved sammenslåing', () => {
            const hendelser: Hendelse[] = [
                createOpplysningerHendelse('2025-01-13T10:01:00.000Z'),
                createPeriodeStartetHendelse('2025-01-13T10:00:00.000Z'),
            ];

            render(<Periode hendelser={hendelser} sprak="en" />);

            expect(screen.getByTestId('merged-hendelse-wrapper')).toBeInTheDocument();
            expect(screen.getByTestId('opplysninger')).toBeInTheDocument();
        });
    });
});
