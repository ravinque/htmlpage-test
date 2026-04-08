import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Synthly 应用 — 同域浅层（未登录）', { tag: '@module-builder' }, () => {
  test('/apps 前缀受限 BFS（不含登录后编辑深度）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.builder,
      maxDepth: 2,
      maxPages: 22,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/apps'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.builder);
    await attachFullPageScreenshot(page, testInfo, 'synthly-builder-crawl-summary');
  });
});
