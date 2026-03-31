import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 页脚合规', { tag: '@module-home' }, () => {
  test('主站隐私政策与 HTMLPAGE 外链', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(
      page.locator('a[href*="htmlpage.cn/site-privacy-policy"]').first()
    ).toBeVisible();
    await expect(page.locator('a[href="https://htmlpage.cn"]').first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-home-footer');
  });
});
