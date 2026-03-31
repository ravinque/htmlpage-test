import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Hola 功能 — 同域深度浏览', { tag: '@module-features' }, () => {
  test('/features 下多层级链接（受限 BFS）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(240_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.features,
      maxDepth: 3,
      maxPages: 32,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/features'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.features);
    await attachFullPageScreenshot(page, testInfo, 'hola-features-crawl-summary');
  });
});
