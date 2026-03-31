import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：构建器', { tag: '@module-home' }, () => {
  test('主 CTA：立即开始 / 免费开始 → /builder', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /立即开始制作|免费开始使用/ }).first().click();
    await expect(page).toHaveURL(/\/builder/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-builder');
  });
});
