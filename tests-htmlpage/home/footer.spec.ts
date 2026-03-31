import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 页脚合规', { tag: '@module-home' }, () => {
  test('政策链接与品牌联络信息', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('link', { name: /隐私政策/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Cookies政策/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /服务与条款/ })).toBeVisible();
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText(/help@lapus\.cn/i).first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'home-footer');
  });
});
