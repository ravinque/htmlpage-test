import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 联系我们 — 页面壳层', { tag: '@module-contact-us' }, () => {
  test('联系页 body 可见', async ({ page }, testInfo) => {
    await page.goto(PATHS.helpContact);
    await expect(page.locator('body')).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'synthly-contact-body');
  });

  test('文档标题含联系语义', async ({ page }, testInfo) => {
    await page.goto(PATHS.helpContact);
    await expect(page).toHaveTitle(/联系|Synthly|合作/i);
    await attachFullPageScreenshot(page, testInfo, 'synthly-contact-title');
  });
});
