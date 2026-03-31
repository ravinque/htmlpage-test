import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('HTMLPAGE 文章', { tag: '@module-articles' }, () => {
  test('文章列表落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.articles);
    await expect(
      page.getByRole('heading', { name: /发现网页设计|博客文章/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'articles-landing');
  });

  test('文章下同域多层级链接可访问（列表与正文，受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.articles,
      maxDepth: 3,
      maxPages: 55,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/articles'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.articles);
    await attachFullPageScreenshot(page, testInfo, 'articles-crawl-summary');
  });
});
