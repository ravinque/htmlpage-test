import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 跳转：功能', { tag: '@module-home' }, () => {
  test('顶栏进入 /features', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/features"], nav a[href="/features"]').first().click();
    await expect(page).toHaveURL(/\/features/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-features');
  });
});
