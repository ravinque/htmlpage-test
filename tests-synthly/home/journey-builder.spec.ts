import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 首页 — 跳转：应用', { tag: '@module-home' }, () => {
  test('全页首个 /apps 或 /apps/new 链接', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href="/apps"], a[href="/apps/new"]').first().click();
    await expect(page).toHaveURL(/\/(apps|login)/);
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-to-apps');
  });
});
