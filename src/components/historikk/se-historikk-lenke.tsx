import { Box, Link } from "@navikt/ds-react";
import { lagHentTekstForSprak, Sprak } from '@navikt/arbeidssokerregisteret-utils';

export interface HistorikkLenkeProps {
  sprak: Sprak;
}

const TEKSTER = {
  nb: {
      lenkeTekst: 'Se tidligere registreringer og opplysninger',
  }
};

export function SeHistorikkLenke (props: HistorikkLenkeProps) {
  const { sprak } = props;

  const tekst = lagHentTekstForSprak(TEKSTER, sprak);

  return (
    <Box className="text-right mb-8">
      <Link href="/arbeidssoekerregisteret/historikk">{tekst('lenkeTekst')}</Link>
    </Box>
  )
}