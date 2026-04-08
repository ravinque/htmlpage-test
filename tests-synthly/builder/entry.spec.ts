import { test, expect } from '@playwright/test';
import { PATHS } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Synthly 应用 — 入口', { tag: '@module-builder' }, () => {
  test('新建应用入口可打开', async ({ page }, testInfo) => {
    await page.goto(PATHS.builder);
    await expect(page).toHaveTitle(/登录|Synthly|工作区/i);
    await expect(page.locator('body')).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'synthly-builder-entry');
  });
});
