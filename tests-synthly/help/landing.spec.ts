import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 帮助中心 — 落地', { tag: '@module-help' }, () => {
  test('帮助首页 body 与标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.help);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/帮助|Synthly/i);
    await attachFullPageScreenshot(page, testInfo, 'synthly-help-landing');
  });
});
