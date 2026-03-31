import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 跳转：博客', { tag: '@module-home' }, () => {
  test('顶栏进入 /blog', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/blog"], nav a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-blog');
  });
});
