import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 响应式 — 移动端首屏', { tag: '@module-responsive' }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('核心标题与主 CTA 可见', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();

    const startCtas = page.locator('text=/开始使用|立即开始制作|免费开始使用/');
    await expect(startCtas.first()).toBeAttached();

    await attachFullPageScreenshot(page, testInfo, 'responsive-hero-pass');
  });
});
