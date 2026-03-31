import { test } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 性能 — 首屏加载', { tag: '@module-performance' }, () => {
  test('networkidle 总耗时（软预算告警）', async ({ page }, testInfo) => {
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
});
