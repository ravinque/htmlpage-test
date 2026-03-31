import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：专题', { tag: '@module-home' }, () => {
  test('顶栏 / 导航 → /topics', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/topics"], nav a[href="/topics"]').first().click();
    await expect(page).toHaveURL(/\/topics/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-topics');
  });
});
