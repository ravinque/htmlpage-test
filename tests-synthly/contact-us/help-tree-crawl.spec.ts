import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Synthly 联系我们 — /contact 同域浅层浏览', { tag: '@module-contact-us' }, () => {
  test('从联系页出发的受限 BFS', async ({ context, baseURL, page }, testInfo) => {
    test.setTimeout(120_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.helpContact,
      maxDepth: 2,
      maxPages: 15,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/contact'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.helpContact);
    await attachFullPageScreenshot(page, testInfo, 'synthly-contact-crawl-summary');
  });
});
