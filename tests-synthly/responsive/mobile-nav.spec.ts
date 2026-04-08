import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Synthly 响应式 — 移动端导航', { tag: '@module-responsive' }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('header/nav 内至少一条链接', async ({ page }, testInfo) => {
    await page.goto('/');
    const n = await page.locator('header a, nav a').count();
    expect(n).toBeGreaterThan(0);
    await attachFullPageScreenshot(page, testInfo, 'synthly-responsive-nav');
  });
});
