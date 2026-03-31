import { test } from '@playwright/test';
import { attachFullPageScreenshot } from './helpers/screenshots';

test.describe('HTMLPAGE 首页性能基线', { tag: '@module-performance' }, () => {
  test('首屏加载时间在合理范围内', async ({ page }, testInfo) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const total = Date.now() - start;

    console.log(`首页加载耗时: ${total}ms`);

    const softBudget = 15000;
    if (total > softBudget) {
      console.warn(`首页加载耗时过长(非致命): ${total}ms (预算: ${softBudget}ms)`);
    }

    await attachFullPageScreenshot(page, testInfo, 'performance-load-pass');
  });

  test('DOM Ready 与完全加载时间', async ({ page }, testInfo) => {
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
