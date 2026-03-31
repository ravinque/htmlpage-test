import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Hola 响应式 — 移动端首页', { tag: '@module-responsive' }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('主内容 h1 与 body 可见', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-responsive-home');
  });
});
