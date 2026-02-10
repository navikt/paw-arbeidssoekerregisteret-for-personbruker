import { Alert, Box, Button, Heading } from '@navikt/ds-react';
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';
import UnderkategoriVelger from '@/components/styrkløft/underkategori-velger';
import { byggYrkeskoderTilStyrkMap } from '@/lib/bygg-yrkeskoder-med-styrk-map';
import byggFylkerOgKommunerUnderkategoriStruktur from '@/lib/bygg-fylker-og-kommuner-underkategori-struktur';

interface Props {
    onSubmit(data: any): Promise<void>;
    onCancel?: () => void;
    fylker: string[];
    yrkeskategorier: string[];
    sprak: Sprak;
    pending?: boolean;
    error?: string | null;
    onChangeYrkeskategorier: (val: string[]) => void;
    onChangeFylker: (val: string[]) => void;
}

const YRKESKATEGORIER = byggYrkeskoderTilStyrkMap();
const FYLKER_OG_KOMMUNER = byggFylkerOgKommunerUnderkategoriStruktur();

const TEKSTER = {
    nb: {
        heading: 'Velg yrkeskategorier og fylker du vil se stillinger fra',
        velgYrkeskategori: 'Velg yrkeskategori',
        velgFylke: 'Velg fylke',
        feilMelding: 'Noe gikk dessverre galt',
        lagre: 'Lagre og vis stillinger',
        avbryt: 'Avbryt',
    },
    nn: {
        heading: 'Vel yrkeskategoriar og fylke du vil sjå stillingar frå',
        velgYrkeskategori: 'Vel yrkeskategori',
        velgFylke: 'Vel fylke',
        feilMelding: 'Noko gjekk dessverre gale',
        lagre: 'Lagre og vis stillingar',
        avbryt: 'Avbryt',
    },
    en: {
        heading: 'Select job categories and counties you want to see job offers from',
        velgYrkeskategori: 'Select job category',
        velgFylke: 'Select county',
        feilMelding: 'Something went wrong',
        lagre: 'Save and view job offers',
        avbryt: 'Cancel',
    },
};
export default function VelgStillingssoekStateless(props: Props) {
    const {
        onSubmit,
        fylker,
        yrkeskategorier,
        sprak,
        pending,
        error,
        onChangeYrkeskategorier,
        onChangeFylker,
        onCancel,
    } = props;
    const isDisabled = fylker.length === 0 || yrkeskategorier.length === 0;
    const kanAvbryte = Boolean(onCancel);
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    return (
        <Box>
            <Heading level={kanAvbryte ? '4' : '3'} size={kanAvbryte ? 'small' : 'large'}>
                {tekst('heading')}
            </Heading>
            <section className={'my-4'}>
                <UnderkategoriVelger
                    triggerText={tekst('velgYrkeskategori')}
                    options={YRKESKATEGORIER}
                    values={yrkeskategorier}
                    onChange={onChangeYrkeskategorier}
                    sprak={sprak}
                />
            </section>
            <section className={'my-4'}>
                {/*<FilterVelger values={fylker} options={FYLKER} heading={tekst('velgFylke')} onChange={onChangeFylker} />*/}
                <UnderkategoriVelger
                    triggerText={tekst('velgFylke')}
                    options={FYLKER_OG_KOMMUNER}
                    values={fylker}
                    onChange={onChangeFylker}
                    sprak={sprak}
                />
            </section>
            {error && (
                <Alert variant={'error'} className={'my-4'}>
                    {tekst('feilMelding')}
                </Alert>
            )}
            <div className={'flex'}>
                <Button variant={'primary'} onClick={onSubmit} disabled={isDisabled || pending} loading={pending}>
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
