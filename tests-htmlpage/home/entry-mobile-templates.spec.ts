import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：手机模板', { tag: '@module-home' }, () => {
  test('顶栏 / 导航 → /mobile-templates', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    const m = page
      .locator('header a[href="/mobile-templates"], nav a[href="/mobile-templates"]')
      .first();
    await m.click();
    await expect(page).toHaveURL(/\/mobile-templates/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-mobile-templates');
  });
});
