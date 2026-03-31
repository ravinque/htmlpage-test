import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 手机模板 — 同域深度浏览', { tag: '@module-mobile-templates' }, () => {
  test('/mobile-templates 下多层级链接（受限 BFS）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.mobileTemplates,
      maxDepth: 3,
      maxPages: 48,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/mobile-templates'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.mobileTemplates);
    await attachFullPageScreenshot(page, testInfo, 'mobile-templates-crawl-summary');
  });
});
