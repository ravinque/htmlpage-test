import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 功能 — 落地', { tag: '@module-features' }, () => {
  test('功能页 body 与标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.features);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/功能|Synthly/i);
    await attachFullPageScreenshot(page, testInfo, 'synthly-features-landing');
  });
});
