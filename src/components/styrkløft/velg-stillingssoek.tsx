import { Box, Button, Heading } from '@navikt/ds-react';
import { yrkeskategorier } from '@/components/styrkløft/yrkeskategorier';
import { fylker } from '@/components/styrkløft/fylker';
import FilterVelger from '@/components/styrkløft/filter-velger';
import { Sprak } from '@navikt/arbeidssokerregisteret-utils';

interface Props {
    onSubmit(data: any): Promise<void>;
    sprak: Sprak;
}

function VelgStillingssoek(props: Props) {
    // const { onSubmit } = props;

    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <Heading level="3" size="large">
                Velg yrkeskategorier og fylker du vil se stillinger fra
            </Heading>
            <section className={'my-4'}>
                <FilterVelger
                    values={['IT', 'Bygg og anlegg']}
                    options={yrkeskategorier}
                    heading={'Velg yrkeskategori'}
                    onChange={(val) => console.log('yrkeskategori valgt', val)}
                />
            </section>
            <section className={'my-4'}>
                <FilterVelger
                    values={['Østfold', 'Oslo']}
                    options={fylker}
                    heading={'Velg fylke'}
                    onChange={(val) => console.log('fylke valgt', val)}
                />
            </section>
            <Button variant={'primary'} onClick={() => console.log('submit!')}>
                Lagre
            </Button>
        </Box>
    );
}

export default VelgStillingssoek;
