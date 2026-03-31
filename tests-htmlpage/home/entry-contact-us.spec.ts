import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：联系我们', { tag: '@module-home' }, () => {
  test('页脚 contentinfo：联系我们 → /contact', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole('contentinfo').getByRole('link', { name: /联系我们/ }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-contact');
  });
});
