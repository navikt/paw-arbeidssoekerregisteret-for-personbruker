import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong, Button, Modal, Alert } from '@navikt/ds-react';
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
    },
    en: {
        heading: 'Confirm Unsubscribe',
        tekst: 'If you no longer want to see job suggestions, you can unsubscribe here',
        avbryt: 'Cancel',
        bekreft: 'Unsubscribe',
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
        <Modal open={open} onClose={onClose} header={{ heading: tekst('heading') }}>
            <Modal.Body>
                <BodyLong>{tekst('tekst')}</BodyLong>
                {error && (
                    <Alert variant={'error'} className={'my-2'}>
                        {tekst('feilmelding')}
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="primary" onClick={onConfirm} disabled={pending} loading={pending}>
                    {tekst('bekreft')}
                </Button>
                <Button type="button" variant="secondary" onClick={onClose} disabled={pending}>
                    {tekst('avbryt')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { BekreftAvmelding };
