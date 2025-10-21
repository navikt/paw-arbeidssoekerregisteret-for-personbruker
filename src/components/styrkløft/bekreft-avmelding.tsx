import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import React from 'react';

const TEKSTER = {
    nb: {
        heading: 'Bekreft avmelding',
        tekst: 'Dersom du ikke lengre ønsker å se forslag til jobbstillinger kan du melde deg av her',
        avbryt: 'Avbryt',
        bekreft: 'Meld meg av',
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
};

const BekreftAvmelding: React.FC<BekreftAvmeldingProps> = (props) => {
    const { open, onConfirm, onClose, sprak } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Modal open={open} onClose={onClose} header={{ heading: tekst('heading') }}>
            <Modal.Body>
                <BodyLong>{tekst('tekst')}</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="primary" onClick={onConfirm}>
                    {tekst('bekreft')}
                </Button>
                <Button type="button" variant="secondary" onClick={onClose}>
                    {tekst('avbryt')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { BekreftAvmelding };
