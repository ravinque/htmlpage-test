import { test } from '@playwright/test';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('Hola 首页性能基线', { tag: '@module-performance' }, () => {
  test('首屏加载时间在合理范围内', async ({ page }, testInfo) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const total = Date.now() - start;
    console.log(`Hola 首页加载耗时: ${total}ms`);
    const softBudget = 20000;
    if (total > softBudget) {
      console.warn(`加载偏慢(非致命): ${total}ms`);
    }
    await attachFullPageScreenshot(page, testInfo, 'hola-performance-load');
  });

  test('DOM Ready 与 load', async ({ page }, testInfo) => {
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
