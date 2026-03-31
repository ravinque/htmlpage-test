import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('Hola 帮助中心', { tag: '@module-help' }, () => {
  test('帮助中心落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.help);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/帮助|HTMLPAGE|Hola/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-help-landing');
  });

  test('帮助中心下同域多层级链接（含联系子路径，受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.help,
      maxDepth: 3,
      maxPages: 45,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/help'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.help);
    await attachFullPageScreenshot(page, testInfo, 'hola-help-crawl-summary');
  });
});
