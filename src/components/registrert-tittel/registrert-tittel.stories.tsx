import { Meta, StoryObj } from "@storybook/react";
import RegistrertTittel from "./registrert-tittel";
import { samletInformasjonMockData } from "@/app/mockdata";

const { arbeidssoekerperioder, opplysningerOmArbeidssoeker } = samletInformasjonMockData
const permittertOpplysninger = JSON.parse(JSON.stringify(opplysningerOmArbeidssoeker))
const avsluttetPeriode = JSON.parse(JSON.stringify(arbeidssoekerperioder))

// Legger til permittert situasjon
permittertOpplysninger[0].jobbsituasjon = [{beskrivelse: 'ER_PERMITTERT'}]

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
  title: "Komponenter/RegistrertTittel",
  component: RegistrertTittel,
  decorators: [],
  args: {},
  tags: ["autodocs"],
} satisfies Meta<typeof RegistrertTittel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Registrert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: arbeidssoekerperioder as any,
    opplysningerOmArbeidssoeker: opplysningerOmArbeidssoeker as any
  },
};

export const RegistrertPermittert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: arbeidssoekerperioder as any,
    opplysningerOmArbeidssoeker: permittertOpplysninger as any
  },
};

export const IkkeLengerRegistrert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: avsluttetPeriode as any,
    opplysningerOmArbeidssoeker: [] as any
  },
};

export const IkkeRegistrert: Story = {
  args: {
    sprak: 'nb',
    arbeidssoekerperioder: [] as any,
    opplysningerOmArbeidssoeker: [] as any
  },
};