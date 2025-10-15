import { Box, Button, Heading } from '@navikt/ds-react';
import FilterVelger from '@/components/styrkløft/filter-velger';
import { yrkeskategorier } from '@/components/styrkløft/yrkeskategorier';
import { fylker } from '@/components/styrkløft/fylker';
import FilterVelger2 from '@/components/styrkløft/filter-velger2';

interface Props {}

function Kvittering(props: Props) {
    return (
        <Box padding="space-16" borderRadius="large" shadow="xsmall">
            <Heading level="3" size="large">
                Velg yrkeskategori og fylke du vil se stillinger fra
            </Heading>
            <section className={'my-4'}>
                <FilterVelger
                    tekst={'Velg yrkeskategori'}
                    options={yrkeskategorier}
                    heading={'Velg yrkeskategori'}
                    onChange={(val) => console.log('yrkeskategori valgt', val)}
                />
            </section>
            <section className={'my-4'}>
                <FilterVelger2
                    tekst={'Velg fylke'}
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
