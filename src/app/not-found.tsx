import { BodyShort, Box, Heading, List, VStack } from '@navikt/ds-react';
import { Link } from '@navikt/ds-react/Link';
import { ListItem } from '@navikt/ds-react/List';
import { PageBlock } from '@navikt/ds-react/Page';
import NextLink from 'next/link';

export default async function NotFound() {
    return (
        <Box asChild paddingInline="space-16" marginBlock="space-0 space-32">
            <PageBlock width="md">
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
                                    <Link as={NextLink} href="/">
                                        Gå til arbeidssøkerregisterets forside
                                    </Link>
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
                                <Link as={NextLink} href="/en" inlineText>
                                    job seeker front page
                                </Link>
                                , or use one of the links in the menu.
                            </BodyShort>
                        </div>
                    </VStack>
                </Box>
            </PageBlock>
        </Box>
    );
}
