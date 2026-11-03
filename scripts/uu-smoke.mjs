import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const smokeUrl = process.env.UU_SMOKE_URL;
if (!smokeUrl) {
    console.error('UU_SMOKE_URL is required. Set it to the HTTP(S) URL of a running app.');
    process.exit(1);
}

let parsedSmokeUrl;
try {
    parsedSmokeUrl = new URL(smokeUrl);
} catch {
    console.error('UU_SMOKE_URL must be a valid HTTP(S) app URL.');
    process.exit(1);
}

if (!['http:', 'https:'].includes(parsedSmokeUrl.protocol)) {
    console.error('UU_SMOKE_URL must use HTTP or HTTPS.');
    process.exit(1);
}

const storageState = process.env.UU_SMOKE_STORAGE_STATE;
const viewports = [
    { name: 'desktop', width: 1280, height: 900 },
    { name: 'mobile', width: 320, height: 900 },
];

function routeWithoutLocale(pathname) {
    return pathname
        .split('/')
        .filter((segment) => !['nb', 'nn', 'en'].includes(segment))
        .join('/')
        .replace(/\/$/, '');
}

async function assertRenderedDecorator(page, viewportName) {
    const header = page.locator('#decorator-header');
    const footer = page.locator('#decorator-footer');

    try {
        await header.waitFor({ state: 'visible', timeout: 45_000 });
        await footer.waitFor({ state: 'visible', timeout: 45_000 });
    } catch {
        throw new Error(
            `${viewportName}: the real decorator header/footer did not render. Check the running app and, if needed, provide a valid local test-user state with UU_SMOKE_STORAGE_STATE.`,
        );
    }

    assert.ok(
        (await header.locator('nav a').count()) > 0,
        `${viewportName}: decorator header has no rendered navigation links.`,
    );
    assert.ok(
        (await footer.locator('footer a').count()) > 0,
        `${viewportName}: decorator footer has no rendered footer links.`,
    );
}

async function assertMainContent(page, viewportName) {
    const main = page.locator('main#maincontent');
    await main.waitFor({ state: 'visible', timeout: 45_000 });
    await main.locator('h1').first().waitFor({ state: 'visible', timeout: 45_000 });
    assert.equal(await page.locator('main').count(), 1, `${viewportName}: expected exactly one main element.`);
    assert.equal(await main.count(), 1, `${viewportName}: app main#maincontent is missing or duplicated.`);
    assert.equal(await main.locator('h1').count(), 1, `${viewportName}: expected exactly one h1 inside app main.`);

    const noHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );
    assert.ok(noHorizontalOverflow, `${viewportName}: the page has horizontal overflow.`);
}

async function assertSkipLink(page, viewportName) {
    const skipLink = page.locator('a[href="#maincontent"]');
    assert.equal(await skipLink.count(), 1, `${viewportName}: the decorator skip link is missing.`);

    await page.keyboard.press('Tab');
    assert.equal(
        await page.evaluate(() => document.activeElement?.getAttribute('href')),
        '#maincontent',
        `${viewportName}: the skip link is not the first keyboard focus target.`,
    );

    await page.keyboard.press('Enter');
    const main = page.locator('main#maincontent');
    await page.waitForFunction(() => {
        const target = document.querySelector('main#maincontent');
        return target !== null && (document.activeElement === target || target.contains(document.activeElement));
    });

    const focusPosition = await page.evaluate(() => {
        const target = document.activeElement;
        const header = document.querySelector('#decorator-header');
        if (!(target instanceof HTMLElement) || !(header instanceof HTMLElement)) return null;
        return {
            focusTop: target.getBoundingClientRect().top,
            headerBottom: header.getBoundingClientRect().bottom,
        };
    });
    assert.ok(focusPosition, `${viewportName}: could not measure focused app content.`);
    assert.ok(
        focusPosition.focusTop >= focusPosition.headerBottom - 1,
        `${viewportName}: focused app content is behind the decorator header.`,
    );
    assert.equal(
        await main.evaluate((element) => element.tabIndex),
        -1,
        `${viewportName}: main is not programmatically focusable.`,
    );
}

async function assertLanguageSwitch(page) {
    const initialUrl = new URL(page.url());
    const initialRoute = routeWithoutLocale(initialUrl.pathname);
    const languageButton = page.getByRole('button', { name: /språk\s*\/\s*language/i });

    await languageButton.click();
    await page.getByRole('button', { name: 'English' }).click();
    await page.waitForFunction(() => document.documentElement.lang === 'en');
    assert.equal(
        routeWithoutLocale(new URL(page.url()).pathname),
        initialRoute,
        'Switching to English changed the app route.',
    );

    await languageButton.click();
    await page.getByRole('button', { name: 'Norsk (bokmål)' }).click();
    await page.waitForFunction(() => document.documentElement.lang === 'nb');
    assert.equal(
        routeWithoutLocale(new URL(page.url()).pathname),
        initialRoute,
        'Switching back to Bokmål changed the app route.',
    );
}

let browser;
let activeStep = 'launching Chromium';
let safeFailureHint;
try {
    browser = await chromium.launch({ headless: true });

    for (const viewport of viewports) {
        activeStep = `${viewport.name}: opening the app`;
        const context = await browser.newContext({
            viewport: { width: viewport.width, height: viewport.height },
            ...(storageState ? { storageState } : {}),
        });

        try {
            const page = await context.newPage();
            const response = await page.goto(smokeUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 });
            const status = response?.status();
            if (!response || !response.ok() || status === 404) {
                safeFailureHint = `The app route returned ${status ? `HTTP ${status}` : 'no HTTP response'}. Check that UU_SMOKE_URL points to a valid local app route.`;
                throw new Error('App route response failed.');
            }

            const title = await page.title();
            if (!title.trim()) {
                safeFailureHint = 'The app document has no title.';
                throw new Error('App document title is missing.');
            }

            activeStep = `${viewport.name}: checking the real decorator`;
            await assertRenderedDecorator(page, viewport.name);

            activeStep = `${viewport.name}: checking app content and viewport overflow`;
            await assertMainContent(page, viewport.name);

            activeStep = `${viewport.name}: checking keyboard skip-link focus`;
            await assertSkipLink(page, viewport.name);

            if (viewport.name === 'desktop') {
                activeStep = 'desktop: checking decorator language switching';
                await assertLanguageSwitch(page);
            }
        } finally {
            await context.close();
        }
    }

    console.log('UU smoke passed for desktop (1280x900) and mobile (320x900).');
} catch {
    console.error(
        `UU smoke failed while ${activeStep}. ${safeFailureHint ?? 'Check that the app is running and accessible.'} Browser details, app URL, and authentication state are omitted.`,
    );
    if (storageState) {
        console.error('For a protected local app, provide a valid test-user state with UU_SMOKE_STORAGE_STATE.');
    }
    process.exitCode = 1;
} finally {
    await browser?.close();
}
