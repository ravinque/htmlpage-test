import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 专题 — 同域深度浏览', { tag: '@module-topics' }, () => {
  test('/topics 下多层级链接（受限 BFS）', async ({
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
