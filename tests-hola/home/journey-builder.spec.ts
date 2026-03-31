import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 跳转：构建器', { tag: '@module-home' }, () => {
  test('顶栏进入 /builder', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/builder"], nav a[href="/builder"]').first().click();
    await expect(page).toHaveURL(/\/builder/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-builder');
  });
});
