import { test } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Hola 性能 — 首屏加载', { tag: '@module-performance' }, () => {
  test('networkidle 总耗时（软预算告警）', async ({ page }, testInfo) => {
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
});
