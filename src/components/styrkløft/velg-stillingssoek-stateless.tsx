import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { Alert, Box, Button, Heading } from '@navikt/ds-react';
import StillingerUtenKravToggler from '@/components/styrkløft/stillinger-uten-krav-toggler';
import UnderkategoriVelger from '@/components/styrkløft/underkategori-velger';
import type { VelgStillingssoekState } from '@/components/styrkløft/velg-stillingssoek-reducer';
import byggFylkerOgKommunerUnderkategoriStruktur from '@/lib/bygg-fylker-og-kommuner-underkategori-struktur';
import { byggYrkeskoderTilStyrkMap } from '@/lib/bygg-yrkeskoder-med-styrk-map';

interface Props {
    onSubmit(data: any): Promise<void>;

    onCancel?: () => void;
    skjemaState: VelgStillingssoekState;
    sprak: Sprak;
    pending?: boolean;
    error?: string | null;
    onChangeYrkeskategorier: (val: string[]) => void;
    onChangeFylker: (val: string[]) => void;
    onChangeVisStillingerUtenKrav: (val: boolean) => void;
}

const YRKESKATEGORIER = byggYrkeskoderTilStyrkMap();
const FYLKER_OG_KOMMUNER = byggFylkerOgKommunerUnderkategoriStruktur();

const TEKSTER = {
    nb: {
        heading: 'Velg yrkeskategorier og områder du vil se stillinger fra',
        velgYrkeskategori: 'Velg yrkeskategori',
        velgFylke: 'Velg område',
        feilMelding: 'Noe gikk dessverre galt',
        lagre: 'Lagre og vis stillinger',
        avbryt: 'Avbryt',
        stillingerUtenKrav: 'Vis kun stillinger uten krav til utdanning eller erfaring',
        valideringsFeilmelding: 'må fylles ut',
    },
    nn: {
        heading: 'Vel yrkeskategoriar og område du vil sjå stillingar frå',
        velgYrkeskategori: 'Vel yrkeskategori',
        velgFylke: 'Vel område',
        feilMelding: 'Noko gjekk dessverre gale',
        lagre: 'Lagre og vis stillingar',
        avbryt: 'Avbryt',
    },
    en: {
        heading: 'Select job categories and regions you want to see job offers from',
        velgYrkeskategori: 'Select job category',
        velgFylke: 'Select region',
        feilMelding: 'Something went wrong',
        lagre: 'Save and view job offers',
        avbryt: 'Cancel',
    },
};
export default function VelgStillingssoekStateless(props: Props) {
    const {
        onSubmit,
        skjemaState,
        sprak,
        pending,
        error,
        onChangeYrkeskategorier,
        onChangeFylker,
        onChangeVisStillingerUtenKrav,
        onCancel,
    } = props;

    const kanAvbryte = Boolean(onCancel);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Box>
            <Heading level={'4'} size={'small'}>
                {tekst('heading')}
            </Heading>
            <section className={'my-4'}>
                <UnderkategoriVelger
                    triggerText={tekst('velgYrkeskategori')}
                    options={YRKESKATEGORIER}
                    values={skjemaState.yrkeskategorier.verdi}
                    showError={skjemaState.yrkeskategorier.visFeilmelding}
                    errorMessage={tekst('valideringsFeilmelding')}
                    onChange={onChangeYrkeskategorier}
                    sprak={sprak}
                />
            </section>
            <section>
                <UnderkategoriVelger
                    triggerText={tekst('velgFylke')}
                    options={FYLKER_OG_KOMMUNER}
                    values={skjemaState.fylker.verdi}
                    showError={skjemaState.fylker.visFeilmelding}
                    errorMessage={tekst('valideringsFeilmelding')}
                    onChange={onChangeFylker}
                    sprak={sprak}
                />
            </section>
            <section className={'mb-4'}>
                <StillingerUtenKravToggler
                    checked={skjemaState.visStillingerUtenKrav}
                    onChange={onChangeVisStillingerUtenKrav}
                    tekst={tekst('stillingerUtenKrav')}
                />
            </section>
            {error && (
                <Alert variant={'error'} className={'my-4'}>
                    {tekst('feilMelding')}
                </Alert>
            )}
            <div className={'flex'}>
                <Button variant={'primary'} onClick={onSubmit} disabled={pending} loading={pending}>
                    {tekst('lagre')}
                </Button>
                {kanAvbryte && (
                    <Button data-color="neutral" variant={'tertiary'} onClick={onCancel} className={'ml-4'}>
                        {tekst('avbryt')}
                    </Button>
                )}
            </div>
        </Box>
    );
}
