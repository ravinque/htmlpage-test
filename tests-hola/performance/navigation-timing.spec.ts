import { test } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Hola 性能 — Navigation Timing', { tag: '@module-performance' }, () => {
  test('DOM Content Loaded', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const timing = await page.evaluate(() => {
      const t = performance.timing;
      return {
        domContentLoaded: t.domContentLoadedEventEnd - t.navigationStart,
        load: t.loadEventEnd - t.navigationStart,
      };
    });
    console.log(`Hola DOM Ready: ${timing.domContentLoaded}ms`);
    await attachFullPageScreenshot(page, testInfo, 'hola-performance-timing');
  });
});
