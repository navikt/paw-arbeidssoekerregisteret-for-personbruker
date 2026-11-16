import { lagHentTekstForSprak, type Sprak } from '@navikt/arbeidssokerregisteret-utils';
import { BodyLong, Box, Button, Heading, InfoCard, Link, LocalAlert } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';
import StyrkloftSkyra from '@/components/skyra/styrkloft-skyra';
import StyrkWidget from '@/components/styrkloft/styrk-widget';
import { leggSprakTilEksternUrl } from '@/lib/sprak-avhengig-url';
import { loggAktivitet } from '@/lib/tracking';
import type { Brukerprofil } from '@/model/brukerprofil';

interface Props {
    sprak: Sprak;
    erUtmeldt: boolean;
    harFlereBekreftelser: boolean;
    brukerprofil?: Brukerprofil;
    onClick(): void;
    isStorybook?: boolean;
}

const TEKSTER = {
    nb: {
        headingUtmeldt: 'Du er ikke lenger registrert som arbeidssøker',
        heading: 'Du har bekreftet at du fortsatt vil være registrert som arbeidssøker',
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Du har bekreftet status som arbeidssøker hos Nav',
        alertHeadingUtmeldt: 'Fra og med idag vil du ikke lenger være registrert som arbeidssøker',
        alertBodyUtmeldt: 'Hvis du vil være arbeidssøker igjen må du registrere deg på nytt',
        linkText: 'Gå tilbake til min side',
        buttonText: 'Bekreft neste periode',
    },
    nn: {
        headingUtmeldt: 'Du er ikkje lenger registrert som arbeidssøkjar',
        heading: 'Du har stadfesta at du fortsatt vil være registrert som arbeidssøkjar',
        alertHeading: 'Vi har registrert svaret ditt',
        alertBody: 'Du har stadfesta status som arbeidssøkjar hos Nav',
        alertHeadingUtmeldt: 'Fra og med idag vil du ikkje lenger være registrert som arbeidssøkjar',
        alertBodyUtmeldt: 'Om du vil være arbeidssøkjer igjen må du registrere deg på nytt',
        linkText: 'Gå tilbake til min side',
        buttonText: 'Stadfest neste periode',
    },
    en: {
        headingUtmeldt: 'You are not registered as a jobseeker',
        heading: 'You have confirmed that you still wish to be registered as a jobseeker',
        alertHeading: 'We have received your answer',
        alertBody: 'You are still registered as a jobseeker within Nav',
        alertHeadingUtmeldt: 'From today you will no longer be registered as a jobseeker',
        alertBodyUtmeldt: 'If you wish to registered as a jobseeker again, you must do a new registration',
        linkText: 'Go back to min side',
        buttonText: 'Confirm next period',
    },
};

const Kvittering = (props: Props) => {
    const { sprak, erUtmeldt, harFlereBekreftelser, onClick, brukerprofil } = props;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        headingRef.current?.focus();
    }, []);

    const loggKlikk = () => {
        loggAktivitet({ aktivitet: 'Trykker på "Gå tilbake til min side" fra bekreftelse-kvittering' });
    };

    const visStyrkKomponent = !harFlereBekreftelser && brukerprofil;

    return (
        <>
            {erUtmeldt ? (
                <>
                    <Box asChild marginBlock="space-0 space-16">
                        <Heading ref={headingRef} tabIndex={-1} size={'xlarge'} level={'1'}>
                            {tekst('headingUtmeldt')}
                        </Heading>
                    </Box>
                    <Box asChild marginBlock="space-0 space-16">
                        <InfoCard data-color="info">
                            <InfoCard.Header>
                                <InfoCard.Title as="h2">{tekst('alertHeadingUtmeldt')}</InfoCard.Title>
                            </InfoCard.Header>
                            <InfoCard.Content>
                                <BodyLong>{tekst('alertBodyUtmeldt')}</BodyLong>
                            </InfoCard.Content>
                        </InfoCard>
                    </Box>
                </>
            ) : (
                <>
                    <Box asChild marginBlock="space-0 space-16">
                        <Heading ref={headingRef} tabIndex={-1} size={'xlarge'} level={'1'}>
                            {tekst('heading')}
                        </Heading>
                    </Box>
                    <Box asChild marginBlock="space-0 space-16">
                        {/* biome-ignore lint/a11y/useValidAriaRole: Aksel tillater å fjerne standardrollen når fokus allerede flyttes til overskriften. */}
                        <LocalAlert status="success" role={undefined}>
                            <LocalAlert.Header>
                                <LocalAlert.Title as="h2">{tekst('alertHeading')}</LocalAlert.Title>
                            </LocalAlert.Header>
                            <LocalAlert.Content>
                                <BodyLong>{tekst('alertBody')}</BodyLong>
                            </LocalAlert.Content>
                        </LocalAlert>
                    </Box>
                    {visStyrkKomponent && (
                        <>
                            <StyrkloftSkyra
                                brukerprofil={brukerprofil}
                                slug={'arbeids-og-velferdsetaten-nav/styrkeloft-eksperimentavslutning'}
                            />
                            <Box marginBlock="space-16">
                                <StyrkWidget sprak={sprak} brukerprofil={brukerprofil} />
                            </Box>
                        </>
                    )}
                </>
            )}
            {harFlereBekreftelser ? (
                <Button variant={'secondary'} onClick={onClick}>
                    {tekst('buttonText')}
                </Button>
            ) : (
                <Link href={leggSprakTilEksternUrl('/minside', sprak)} onClick={loggKlikk}>
                    {tekst('linkText')}
                </Link>
            )}
        </>
    );
};

export { Kvittering };
