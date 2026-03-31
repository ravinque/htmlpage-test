import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 联系我们 — 联络渠道', { tag: '@module-contact-us' }, () => {
  test('页面展示官方邮箱 help@lapus.cn', async ({ page }, testInfo) => {
    await page.goto(PATHS.contact);
    await expect(page.getByText(/help@lapus\.cn/i).first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'contact-channel-email');
  });

  test('页面展示联系电话', async ({ page }, testInfo) => {
    await page.goto(PATHS.contact);
    await expect(page.getByText(/137\s*9926\s*4013/).first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'contact-channel-phone');
  });
});
