import { Meta, StoryObj } from "@storybook/react";

import PeriodeInfo from "./periode-info";
import { samletInformasjonMockData } from "@/app/mockdata";

const { arbeidssoekerperioder, bekreftelser } = samletInformasjonMockData
const avsluttetPeriode = JSON.parse(JSON.stringify(arbeidssoekerperioder))

// Avslutter arbeidssøkerperioden
avsluttetPeriode[0].avsluttet = {
  "tidspunkt": "2021-10-31T11:22:33.444Z",
  "utfoertAv": {
    "type": "UKJENT_VERDI",
    "id": "12345678910"
  },
  "kilde": "string",
  "aarsak": "string",
  "tidspunktFraKilde": {
    "tidspunkt": "2021-10-31T11:20:33.444Z",
    "avviksType": "UKJENT_VERDI"
  }
}

const meta = {
  title: "Komponenter/PeriodeInfo",
  component: PeriodeInfo,
  decorators: [],
  args: {},
  tags: ["autodocs"],
} satisfies Meta<typeof PeriodeInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Registrert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: arbeidssoekerperioder as any,
    bekreftelser: [] as any
  },
};

export const IkkeLengerRegistrert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: avsluttetPeriode as any,
    bekreftelser: [] as any
  },
};

export const IkkeRegistrert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: [] as any,
    bekreftelser: [] as any
  },
};