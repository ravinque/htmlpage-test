import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：模板市场', { tag: '@module-home' }, () => {
  test('业务区：浏览全部模板 → /templates', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /浏览全部模板/ }).click();
    await expect(page).toHaveURL(/\/templates/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-templates');
  });
});
