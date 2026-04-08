import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 首页 — 品牌与主标题', { tag: '@module-home' }, () => {
  test('落地页品牌与主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await expect(page).toHaveTitle(/Synthly/i);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/应用|全栈|Synthly|自然语言/i);
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-hero');
  });
});
