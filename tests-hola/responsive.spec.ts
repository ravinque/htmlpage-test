import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('Hola 响应式（移动端）', { tag: '@module-responsive' }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('移动端首页主内容可见', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-responsive-home');
  });

  test('移动端导航或菜单入口存在', async ({ page }, testInfo) => {
    await page.goto('/');
    const n = await page.locator('header a, nav a').count();
    expect(n).toBeGreaterThan(0);
    await attachFullPageScreenshot(page, testInfo, 'hola-responsive-nav');
  });
});
