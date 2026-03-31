import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 品牌与主标题', { tag: '@module-home' }, () => {
  test('落地页品牌与主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await expect(page).toHaveTitle(/HTMLPAGE|Hola/i);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/HTMLPAGE/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-hero');
  });
});
