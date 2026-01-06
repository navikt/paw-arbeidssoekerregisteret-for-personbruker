import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, BodyLong, Button, Dialog } from '@navikt/ds-react';
import React from 'react';

const TEKSTER = {
    nb: {
        heading: 'Bekreft avmelding',
        tekst: 'Dersom du ikke lengre ønsker å se forslag til jobbstillinger kan du melde deg av her',
        avbryt: 'Avbryt',
        bekreft: 'Meld meg av',
        feilmelding: 'Noe gikk desverre galt. Prøv igjen',
    },
    nn: {
        heading: 'Bekreft avmelding',
        tekst: 'Dersom du ikkje lenger ønskjer å sjå forslag til jobbstillingar, kan du melde deg av her',
        avbryt: 'Avbryt',
        bekreft: 'Meld meg av',
        feilmelding: 'Noko gjekk desverre gale. Prøv igjen',
    },
    en: {
        heading: 'Confirm Unsubscribe',
        tekst: 'If you no longer want to see job suggestions, you can unsubscribe here',
        avbryt: 'Cancel',
        bekreft: 'Unsubscribe',
        feilmelding: 'Sorry, something went wrong. Please try again.',
    },
};

type BekreftAvmeldingProps = {
    open: boolean;
    onConfirm: () => void;
    onClose: () => void;
    sprak: Sprak;
    error?: boolean;
    pending?: boolean;
};

const BekreftAvmelding: React.FC<BekreftAvmeldingProps> = (props) => {
    const { open, onConfirm, onClose, sprak, pending, error } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                    onClose();
                }
            }}
        >
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>{tekst('heading')}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>{tekst('tekst')}</BodyLong>
                    {error && (
                        <Alert variant={'error'} className={'my-2'}>
                            {tekst('feilmelding')}
                        </Alert>
                    )}
                </Dialog.Body>
                <Dialog.Footer>
                    <Button type="button" variant="primary" onClick={onConfirm} disabled={pending} loading={pending}>
                        {tekst('bekreft')}
                    </Button>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary" disabled={pending}>
                            {tekst('avbryt')}
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};

export { BekreftAvmelding };
