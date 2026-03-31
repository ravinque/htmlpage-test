import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../shared/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('HTMLPAGE 功能', { tag: '@module-features' }, () => {
  test('功能落地页核心信息', async ({ page }, testInfo) => {
    await page.goto(PATHS.features);
    await expect(
      page.getByRole('heading', { name: /探索强大功能/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'features-landing');
  });

  test('功能模块下同域多层级链接可访问（受限浏览）', async ({
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
      maxPages: 28,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/features'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.features);
    await attachFullPageScreenshot(page, testInfo, 'features-crawl-summary');
  });
});
