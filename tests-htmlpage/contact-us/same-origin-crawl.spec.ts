import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 联系我们 — 同域浏览', { tag: '@module-contact-us' }, () => {
  test('联系子路径下浅层链接可访问（BFS 受限）', async ({ context, baseURL, page }, testInfo) => {
    test.setTimeout(120_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.contact,
      maxDepth: 2,
      maxPages: 12,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/contact'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.contact);
    await attachFullPageScreenshot(page, testInfo, 'contact-crawl-summary');
  });
});
