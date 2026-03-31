import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 跳转：帮助中心', { tag: '@module-home' }, () => {
  test('全页首个 /help 链接', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href="/help"]').first().click();
    await expect(page).toHaveURL(/\/help/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-help');
  });
});
