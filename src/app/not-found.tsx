import { BodyShort, Box, Heading, Link, List, VStack } from '@navikt/ds-react';
import { ListItem } from '@navikt/ds-react/List';
import NextLink from 'next/link';

export default async function NotFound() {
    return (
        <main className="flex flex-col max-w-3xl mx-auto px-4 mb-8">
            <Box data-aksel-template="404-v3">
                <VStack gap="space-64">
                    <VStack gap="space-16">
                        <Heading level="1" size="large">
                            Beklager, vi fant ikke siden
                        </Heading>
                        <BodyShort>
                            Denne siden kan være slettet eller flyttet, eller det er en feil i lenken.
                        </BodyShort>
                        <List>
                            <ListItem>Bruk gjerne søket eller menyen</ListItem>
                            <ListItem>
                                <NextLink className={'aksel-link'} href={'/'}>
                                    Gå til arbeidssøkerregisterets forside
                                </NextLink>
                            </ListItem>
                        </List>
                    </VStack>
                    <div>
                        <Heading level="2" size="large" spacing>
                            Page not found
                        </Heading>
                        <BodyShort spacing>The page you requested cannot be found.</BodyShort>
                        <BodyShort>
                            Go to the{' '}
                            <NextLink className={'aksel-link'} href={'/en'}>
                                job seeker front page
                            </NextLink>
                            , or use one of the links in the menu.
                        </BodyShort>
                    </div>
                </VStack>
            </Box>
        </main>
    );
}
