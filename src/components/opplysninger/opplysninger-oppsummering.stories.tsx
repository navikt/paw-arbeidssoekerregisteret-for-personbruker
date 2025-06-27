import { Meta, StoryObj } from '@storybook/react';
import { aggregertePerioderMockData } from '@/app/mockdata';
import { OpplysningerOppsummering } from '@/components/opplysninger/opplysninger-oppsummering';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils/dist/models/profilering';

const opplysningerOmArbeidssoker = aggregertePerioderMockData[0].opplysningerOmArbeidssoeker;

const meta = {
    title: 'Komponenter/OpplysningerOppsummering',
    component: OpplysningerOppsummering,
    decorators: [],
    tags: ['autodocs'],
    args: {},
} satisfies Meta<typeof OpplysningerOppsummering>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpplysningerOmArbeidssoker: Story = {
    args: {
        visEndreLink: true,
        opplysninger: opplysningerOmArbeidssoker[0] as any,
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
};

export const UtenEndreLenke: Story = {
    args: {
        visEndreLink: false,
        opplysninger: opplysningerOmArbeidssoker[0] as any,
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
};

export const MedEgenvurderingGodeMuligheter: Story = {
    args: {
        visEndreLink: true,
        opplysninger: {
            ...opplysningerOmArbeidssoker[0],
            profilering: {
                egenvurdering: {
                    egenvurdering: ProfilertTil.ANTATT_GODE_MULIGHETER
                }
            }
        } as any,
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
}

export const MedEgenvurderingBehov: Story = {
    args: {
        visEndreLink: true,
        opplysninger: {
            ...opplysningerOmArbeidssoker[0],
            profilering: {
                egenvurdering: {
                    egenvurdering: ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING
                }
            }
        } as any,
        sprak: 'nb',
        oppdaterOpplysningerUrl: process.env.OPPDATER_OPPLYSNINGER_URL!,
    },
}
