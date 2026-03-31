import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathMatchesToolArea } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 工具箱 — 子工具同域浏览', { tag: '@module-tools' }, () => {
  test('工具区路径多层级可访问（不含外链）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.tools,
      maxDepth: 2,
      maxPages: 28,
      shouldEnqueue: (p) => pathMatchesToolArea(p),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.tools);
    await attachFullPageScreenshot(page, testInfo, 'tools-crawl-summary');
  });
});
