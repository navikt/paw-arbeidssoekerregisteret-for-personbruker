import { Box, Button, Heading } from '@navikt/ds-react';
import { yrkeskategorier } from '@/components/styrkløft/yrkeskategorier';
import { fylker } from '@/components/styrkløft/fylker';
import FilterVelger3 from '@/components/styrkløft/filter-velger3';

interface Props {}

function Kvittering(props: Props) {
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <Heading level="3" size="large">
                Velg yrkeskategori og fylke du vil se stillinger fra
            </Heading>
            <section className={'my-4'}>
                <FilterVelger3
                    values={['IT', 'Bygg og anlegg']}
                    options={yrkeskategorier}
                    heading={'Velg yrkeskategori'}
                    onChange={(val) => console.log('yrkeskategori valgt', val)}
                />
            </section>
            <section className={'my-4'}>
                <FilterVelger3
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

export default Kvittering;
