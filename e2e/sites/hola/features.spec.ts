import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../shared/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('Hola 功能', { tag: '@module-features' }, () => {
  test('功能落地页可访问', async ({ page }, testInfo) => {
    await page.goto(PATHS.features);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/HTMLPAGE|Hola|功能/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-features-landing');
  });

  test('功能模块下同域多层级链接（受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(240_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.features,
      maxDepth: 3,
      maxPages: 32,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/features'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.features);
    await attachFullPageScreenshot(page, testInfo, 'hola-features-crawl-summary');
  });
});
