import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：功能', { tag: '@module-home' }, () => {
  test('业务区：查看功能全景 → /features', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /查看功能全景/ }).click();
    await expect(page).toHaveURL(/\/features/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-features');
  });
});
