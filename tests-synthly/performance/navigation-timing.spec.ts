import { test } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Synthly 性能 — Navigation Timing', { tag: '@module-performance' }, () => {
  test('DOM Content Loaded', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const timing = await page.evaluate(() => {
      const t = performance.timing;
      return {
        domContentLoaded: t.domContentLoadedEventEnd - t.navigationStart,
        load: t.loadEventEnd - t.navigationStart,
      };
    });
    console.log(`Synthly DOM Ready: ${timing.domContentLoaded}ms`);
    await attachFullPageScreenshot(page, testInfo, 'synthly-performance-timing');
  });
});
