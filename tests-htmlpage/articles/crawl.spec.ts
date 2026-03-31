import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 文章 — 同域深度浏览', { tag: '@module-articles' }, () => {
  test('列表与正文路径下多层级链接（受限 BFS）', async ({
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
