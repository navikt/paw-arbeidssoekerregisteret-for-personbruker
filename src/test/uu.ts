import { expect } from 'storybook/test';

const OVERFLOW_TOLERANCE_PX = 1;

function getNavigationName(nav: HTMLElement, root: HTMLElement): string {
    const ariaLabel = nav.getAttribute('aria-label')?.trim();
    if (ariaLabel) return ariaLabel;

    const labelledBy = nav.getAttribute('aria-labelledby');
    if (labelledBy) {
        return labelledBy
            .split(/\s+/)
            .map((id) => {
                const label = [...root.querySelectorAll<HTMLElement>('[id]')].find((element) => element.id === id);
                return label?.textContent?.trim() ?? '';
            })
            .filter(Boolean)
            .join(' ');
    }

    return nav.getAttribute('title')?.trim() ?? '';
}

function assertPageStructure(root: HTMLElement): HTMLElement {
    const mains = root.querySelectorAll('main');
    expect(mains, 'A helside must contain exactly one main landmark').toHaveLength(1);

    const main = mains[0];
    expect(main.querySelector('main'), 'A main landmark must not contain another main landmark').toBeNull();

    const headings = [...root.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    expect(
        headings.filter((heading) => heading.tagName === 'H1'),
        'A helside must contain exactly one h1',
    ).toHaveLength(1);

    let previousLevel = 0;
    for (const heading of headings) {
        const level = Number(heading.tagName.slice(1));
        expect(
            level,
            `Heading level jumped from h${previousLevel} to ${heading.tagName.toLowerCase()}`,
        ).toBeLessThanOrEqual(previousLevel + 1);
        previousLevel = level;
    }

    const placeholderTitles = [...root.querySelectorAll('svg title')].filter(
        (title) => title.textContent?.trim() === 'a11y-title',
    );
    expect(placeholderTitles, 'SVG titles must not use the a11y-title placeholder').toHaveLength(0);

    const navigations = [...root.querySelectorAll('nav')];
    if (navigations.length > 1) {
        const names = navigations.map((nav) => getNavigationName(nav, root));
        expect(names.every(Boolean), 'Multiple navigation landmarks must each have an accessible name').toBe(true);
        expect(new Set(names).size, 'Navigation landmarks must have distinct accessible names').toBe(names.length);
    }

    return main;
}

function assertNoHorizontalOverflow(root: HTMLElement, main: HTMLElement, phase: string): void {
    const rootWidth = root.clientWidth;
    expect(rootWidth, `The ${phase} Storybook canvas must have a measurable client width`).toBeGreaterThan(0);
    expect(
        root.scrollWidth - rootWidth,
        `The ${phase} Storybook canvas must not overflow its test viewport by more than 1px`,
    ).toBeLessThanOrEqual(OVERFLOW_TOLERANCE_PX);
    expect(
        main.scrollWidth - main.clientWidth,
        `The ${phase} main landmark must not overflow its client width by more than 1px`,
    ).toBeLessThanOrEqual(OVERFLOW_TOLERANCE_PX);

    const rootBounds = root.getBoundingClientRect();
    let leftmost = rootBounds.left;
    let rightmost = rootBounds.right;
    for (const element of [main, ...main.querySelectorAll<HTMLElement>('*')]) {
        const bounds = element.getBoundingClientRect();
        leftmost = Math.min(leftmost, bounds.left);
        rightmost = Math.max(rightmost, bounds.right);
    }
    const descendantOverflow = Math.max(rootBounds.left - leftmost, rightmost - rootBounds.right, 0);
    expect(
        descendantOverflow,
        `The ${phase} main content must fit within the Storybook test viewport by more than 1px`,
    ).toBeLessThanOrEqual(OVERFLOW_TOLERANCE_PX);
}

export function assertHelSideUu(root: HTMLElement): void {
    const main = assertPageStructure(root);
    assertNoHorizontalOverflow(root, main, 'baseline');

    const doc = root.ownerDocument;
    const style = doc.createElement('style');
    const attributeName = 'data-uu-reflow-check';
    const existingAttribute = main.getAttribute(attributeName);
    const marker = 'hel-side';
    const markedMain = `main:is(#maincontent, [${attributeName}="${marker}"])[${attributeName}="${marker}"]`;

    style.textContent = `
        @layer base {
            ${markedMain},
            ${markedMain} * {
                line-height: 1.5 !important;
                letter-spacing: .12em !important;
                word-spacing: .16em !important;
            }
            ${markedMain} p {
                margin-bottom: 2em !important;
                margin-block-end: 2em !important;
            }
        }
    `;

    try {
        main.setAttribute(attributeName, marker);
        doc.head.append(style);

        // Read layout and computed styles to ensure the test CSS has been applied before measuring.
        void root.getBoundingClientRect().width;
        for (const element of [main, ...main.querySelectorAll<HTMLElement>('*')]) {
            const computed = doc.defaultView?.getComputedStyle(element);
            expect(computed, 'WCAG reflow styles must be measurable for main content').not.toBeNull();
            const fontSize = Number.parseFloat(computed?.fontSize ?? '');
            expect(fontSize, 'WCAG reflow font size must be measurable').toBeGreaterThan(0);
            expect(
                Number.parseFloat(computed?.lineHeight ?? ''),
                'WCAG reflow line-height must be applied',
            ).toBeCloseTo(fontSize * 1.5);
            expect(
                Number.parseFloat(computed?.letterSpacing ?? ''),
                'WCAG reflow letter-spacing must be applied',
            ).toBeCloseTo(fontSize * 0.12);
            expect(
                Number.parseFloat(computed?.wordSpacing ?? ''),
                'WCAG reflow word-spacing must be applied',
            ).toBeCloseTo(fontSize * 0.16);
        }

        for (const paragraph of main.querySelectorAll('p')) {
            const fontSize = Number.parseFloat(doc.defaultView?.getComputedStyle(paragraph).fontSize ?? '');
            expect(
                Number.parseFloat(doc.defaultView?.getComputedStyle(paragraph).marginBottom ?? ''),
                'WCAG reflow paragraph spacing must be applied',
            ).toBeCloseTo(fontSize * 2);
        }

        assertNoHorizontalOverflow(root, main, 'WCAG text-spacing');
    } finally {
        style.remove();
        if (existingAttribute === null) {
            main.removeAttribute(attributeName);
        } else {
            main.setAttribute(attributeName, existingAttribute);
        }
    }
}
