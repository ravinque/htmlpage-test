import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：工具箱', { tag: '@module-home' }, () => {
  test('顶栏 / 导航 → /tools', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/tools"], nav a[href="/tools"]').first().click();
    await expect(page).toHaveURL(/\/tools/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-tools');
  });
});
