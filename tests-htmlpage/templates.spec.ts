import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('HTMLPAGE 模板', { tag: '@module-templates' }, () => {
  test('模板市场落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.templates);
    await expect(page).toHaveTitle(/模板/);
    await attachFullPageScreenshot(page, testInfo, 'templates-landing');
  });

  test('模板市场同域多层级链接可访问（受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.templates,
      maxDepth: 3,
      maxPages: 45,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/templates'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.templates);
    await attachFullPageScreenshot(page, testInfo, 'templates-crawl-summary');
  });
});
