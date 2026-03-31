import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('HTMLPAGE 响应式 — 移动端页脚', { tag: '@module-responsive' }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('合规政策链接可见', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.getByRole('contentinfo');

    await expect(
      footer.getByRole('link', { name: /隐私政策/ })
    ).toBeVisible();
    await expect(
      footer.getByRole('link', { name: /Cookies政策/ })
    ).toBeVisible();
    await expect(
      footer.getByRole('link', { name: /服务与条款/ })
    ).toBeVisible();

    await attachFullPageScreenshot(page, testInfo, 'responsive-footer-pass');
  });
});
