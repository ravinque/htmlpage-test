import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 首页 — 跳转：文档', { tag: '@module-home' }, () => {
  test('顶栏进入 /docs', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/docs"], nav a[href="/docs"]').first().click();
    await expect(page).toHaveURL(/\/docs/);
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-to-docs');
  });
});
