import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../shared/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('HTMLPAGE 专题', { tag: '@module-topics' }, () => {
  test('专题知识库落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.topics);
    await expect(
      page.getByRole('heading', { name: /专题知识库|深度学习/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'topics-landing');
  });

  test('专题下同域多层级链接可访问（受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.topics,
      maxDepth: 3,
      maxPages: 48,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/topics'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.topics);
    await attachFullPageScreenshot(page, testInfo, 'topics-crawl-summary');
  });
});
