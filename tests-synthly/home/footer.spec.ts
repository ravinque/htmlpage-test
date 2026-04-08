import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 首页 — 页脚合规', { tag: '@module-home' }, () => {
  test('HTMLPAGE 品牌外链与备案信息', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('a[href="https://htmlpage.cn"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://beian.miit.gov.cn/"]').first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-footer');
  });
});
