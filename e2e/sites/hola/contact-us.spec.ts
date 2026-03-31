import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../shared/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('Hola 联系我们', { tag: '@module-contact-us' }, () => {
  test('帮助中心联系页落地', async ({ page }, testInfo) => {
    await page.goto(PATHS.helpContact);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/联系|帮助|HTMLPAGE|Hola/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-contact-landing');
  });

  test('联系相关同域浅层链接', async ({ context, baseURL, page }, testInfo) => {
    test.setTimeout(120_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.helpContact,
      maxDepth: 2,
      maxPages: 15,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/help'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.helpContact);
    await attachFullPageScreenshot(page, testInfo, 'hola-contact-crawl-summary');
  });
});
