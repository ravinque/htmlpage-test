import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('Hola 博客', { tag: '@module-blog' }, () => {
  test('博客列表落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.blog);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/博客|HTMLPAGE|Hola/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-blog-landing');
  });

  test('博客下同域多层级链接（受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.blog,
      maxDepth: 3,
      maxPages: 50,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/blog'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.blog);
    await attachFullPageScreenshot(page, testInfo, 'hola-blog-crawl-summary');
  });
});
