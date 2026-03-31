import { test } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 性能 — Navigation Timing', { tag: '@module-performance' }, () => {
  test('DOM Ready 与 load 事件间隔（软预算告警）', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const timing = await page.evaluate(() => {
      const t = performance.timing;
      return {
        domContentLoaded: t.domContentLoadedEventEnd - t.navigationStart,
        load: t.loadEventEnd - t.navigationStart,
      };
    });

    console.log(`DOM Ready: ${timing.domContentLoaded}ms, Load: ${timing.load}ms`);

    const domReadyBudget = 10000;
    if (timing.domContentLoaded > domReadyBudget) {
      console.warn(
        `DOM Ready 过慢(非致命): ${timing.domContentLoaded}ms (预算: ${domReadyBudget}ms)`
      );
    }

    await attachFullPageScreenshot(page, testInfo, 'performance-timing-pass');
  });
});
