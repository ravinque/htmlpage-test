import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 首页 — 跳转：场景探索', { tag: '@module-home' }, () => {
  test('顶栏进入 /explore', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/explore"], nav a[href="/explore"]').first().click();
    await expect(page).toHaveURL(/\/explore/);
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-to-explore');
  });
});
