export enum ForeslattInnsatsgruppe {
  STANDARD_INNSATS = 'STANDARD_INNSATS',
  SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
  BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BEHOV_FOR_ARBEIDSEVNEVURDERING',
}

export type BehovsvurderingResponse = {
  dato?: string;
  oppfolging: ForeslattInnsatsgruppe;
  dialogId?: string;
  profileringId?: string;
} | null;