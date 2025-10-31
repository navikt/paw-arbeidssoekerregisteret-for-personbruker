import { Alert, Box, Button, Heading } from '@navikt/ds-react';
import FilterVelger from '@/components/styrkløft/filter-velger';
import { FYLKER } from '@/components/styrkløft/fylker';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { hentAlleYrkeskategorier } from '@/lib/hent-yrkeskategorier';

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

const YRKESKATEGORIER = hentAlleYrkeskategorier();
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
    return (
        <Box>
            <Heading level={kanAvbryte ? '4' : '3'} size={kanAvbryte ? 'small' : 'large'}>
                Velg yrkeskategorier og fylker du vil se stillinger fra
            </Heading>
            <section className={'my-4'}>
                <FilterVelger
                    values={yrkeskategorier}
                    options={YRKESKATEGORIER}
                    heading={'Velg yrkeskategori'}
                    onChange={onChangeYrkeskategorier}
                />
            </section>
            <section className={'my-4'}>
                <FilterVelger values={fylker} options={FYLKER} heading={'Velg fylke'} onChange={onChangeFylker} />
            </section>
            {error && (
                <Alert variant={'error'} className={'my-4'}>
                    Noe gikk dessverre galt
                </Alert>
            )}
            <div className={'flex'}>
                <Button variant={'primary'} onClick={onSubmit} disabled={isDisabled || pending} loading={pending}>
                    Lagre
                </Button>
                {kanAvbryte && (
                    <Button variant={'tertiary-neutral'} onClick={onCancel} className={'ml-4'}>
                        Avbryt
                    </Button>
                )}
            </div>
        </Box>
    );
}
