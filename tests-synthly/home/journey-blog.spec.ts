import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 首页 — 跳转：文章', { tag: '@module-home' }, () => {
  test('顶栏进入 /articles', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/articles"], nav a[href="/articles"]').first().click();
    await expect(page).toHaveURL(/\/articles/);
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-to-articles');
  });
});
