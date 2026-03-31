import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathMatchesToolArea } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('HTMLPAGE 工具', { tag: '@module-tools' }, () => {
  test('工具箱落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.tools);
    await expect(
      page.getByRole('heading', { name: /实用工具箱/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'tools-landing');
  });

  test('工具箱及同域子工具多层级可访问（不含外链）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.tools,
      maxDepth: 2,
      maxPages: 28,
      shouldEnqueue: (p) => pathMatchesToolArea(p),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.tools);
    await attachFullPageScreenshot(page, testInfo, 'tools-crawl-summary');
  });
});
