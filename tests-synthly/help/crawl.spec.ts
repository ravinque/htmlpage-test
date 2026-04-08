import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Synthly 帮助中心 — 同域深度', { tag: '@module-help' }, () => {
  test('/help 下多层级链接（受限 BFS）', async ({
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
    await attachFullPageScreenshot(page, testInfo, 'synthly-help-crawl-summary');
  });
});
