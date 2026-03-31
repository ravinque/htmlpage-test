import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：企业模板', { tag: '@module-home' }, () => {
  test('企业模板分类链接 → 模板列表（含 category）', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href*="category=enterprise"]').first().click();
    await expect(page).toHaveURL(/\/templates/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-templates-enterprise');
  });
});
