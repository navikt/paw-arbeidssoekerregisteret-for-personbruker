import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyShort, Box, Button, Heading, HStack, LocalAlert } from '@navikt/ds-react';
import StillingerUtenKravToggler from '@/components/styrkloft/stillinger-uten-krav-toggler';
import UnderkategoriVelger from '@/components/styrkloft/underkategori-velger';
import type { VelgStillingssoekState } from '@/components/styrkloft/velg-stillingssoek-reducer';
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
        valideringsFeilmelding: 'Må fylles ut',
        infoTekst:
            'Vil du bare se jobber uten krav til utdanning eller erfaring, kan du velge om du også vil filtrere på kategori og område.',
    },
    nn: {
        heading: 'Vel yrkeskategoriar og område du vil sjå stillingar frå',
        velgYrkeskategori: 'Vel yrkeskategori',
        velgFylke: 'Vel område',
        feilMelding: 'Noko gjekk dessverre gale',
        lagre: 'Lagre og vis stillingar',
        avbryt: 'Avbryt',
        stillingerUtenKrav: 'Vis berre stillingar utan krav til utdanning eller erfaring',
        valideringsFeilmelding: 'Må fyllast ut',
        infoTekst:
            'Vil du berre sjå jobbar utan krav til utdanning eller erfaring, kan du velje om du også vil filtrere på kategori og område.',
    },
    en: {
        heading: 'Select job categories and regions you want to see job offers from',
        velgYrkeskategori: 'Select job category',
        velgFylke: 'Select region',
        feilMelding: 'Something went wrong',
        lagre: 'Save and view job offers',
        avbryt: 'Cancel',
        stillingerUtenKrav: 'Show only positions with no requirements for education or experience',
        valideringsFeilmelding: 'Required',
        infoTekst:
            'If you only want to see jobs with no requirements for education or experience, you can choose whether to also filter by category and location.',
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
            <Box asChild marginBlock="space-16">
                <BodyShort>{tekst('infoTekst')}</BodyShort>
            </Box>
            <Box as="section" marginBlock="space-16">
                <UnderkategoriVelger
                    triggerText={tekst('velgYrkeskategori')}
                    options={YRKESKATEGORIER}
                    values={skjemaState.yrkeskategorier.verdi}
                    showError={skjemaState.yrkeskategorier.visFeilmelding}
                    errorMessage={tekst('valideringsFeilmelding')}
                    onChange={onChangeYrkeskategorier}
                    sprak={sprak}
                />
            </Box>
            <Box as="section">
                <UnderkategoriVelger
                    triggerText={tekst('velgFylke')}
                    options={FYLKER_OG_KOMMUNER}
                    values={skjemaState.fylker.verdi}
                    showError={skjemaState.fylker.visFeilmelding}
                    errorMessage={tekst('valideringsFeilmelding')}
                    onChange={onChangeFylker}
                    sprak={sprak}
                />
            </Box>
            <Box as="section" marginBlock="space-0 space-16">
                <StillingerUtenKravToggler
                    checked={skjemaState.visStillingerUtenKrav}
                    onChange={onChangeVisStillingerUtenKrav}
                    tekst={tekst('stillingerUtenKrav')}
                />
            </Box>
            {error && (
                <Box marginBlock="space-16">
                    <LocalAlert status="error" as="div">
                        <LocalAlert.Header>
                            <LocalAlert.Title as="div">{tekst('feilMelding')}</LocalAlert.Title>
                        </LocalAlert.Header>
                    </LocalAlert>
                </Box>
            )}
            <HStack gap="space-16" wrap>
                <Button variant={'primary'} onClick={onSubmit} disabled={pending} loading={pending}>
                    {tekst('lagre')}
                </Button>
                {kanAvbryte && (
                    <Button data-color="neutral" variant={'tertiary'} onClick={onCancel}>
                        {tekst('avbryt')}
                    </Button>
                )}
            </HStack>
        </Box>
    );
}
