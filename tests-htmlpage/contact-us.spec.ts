import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('HTMLPAGE 联系我们', { tag: '@module-contact-us' }, () => {
  test('联系我们落地页与主要联络方式', async ({ page }, testInfo) => {
    await page.goto(PATHS.contact);
    await expect(
      page.getByRole('heading', { name: /联系我们/ }).first()
    ).toBeVisible();
    await expect(page.getByText(/help@lapus\.cn/i).first()).toBeVisible();
    await expect(page.getByText(/137\s*9926\s*4013/).first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'contact-landing');
  });

  test('联系页同域链接可访问（浅层）', async ({ context, baseURL, page }, testInfo) => {
    test.setTimeout(120_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.contact,
      maxDepth: 2,
      maxPages: 12,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/contact'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.contact);
    await attachFullPageScreenshot(page, testInfo, 'contact-crawl-summary');
  });
});
