import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../shared/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('HTMLPAGE 手机模板', { tag: '@module-mobile-templates' }, () => {
  test('手机模板列表落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.mobileTemplates);
    await expect(page).toHaveTitle(/手机|移动|模板|HTMLPAGE/i);
    await expect(page.getByRole('heading').first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'mobile-templates-landing');
  });

  test('手机模板下同域多层级链接可访问（受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.mobileTemplates,
      maxDepth: 3,
      maxPages: 48,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/mobile-templates'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.mobileTemplates);
    await attachFullPageScreenshot(page, testInfo, 'mobile-templates-crawl-summary');
  });
});
