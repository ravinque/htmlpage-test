import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 品牌与首屏', { tag: '@module-home' }, () => {
  test('站点身份与首屏主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await expect(page).toHaveTitle(/HTMLPAGE/i);
    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'home-hero');
  });
});
