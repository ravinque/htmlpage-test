import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('HTMLPAGE 响应式布局（移动端）', { tag: '@module-responsive' }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('移动端主内容：核心标题与 CTA', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();

    const startCtas = page.locator('text=/开始使用|立即开始制作|免费开始使用/');
    await expect(startCtas.first()).toBeAttached();

    await attachFullPageScreenshot(page, testInfo, 'responsive-hero-pass');
  });

  test('移动端底部栏合规信息', async ({ page }, testInfo) => {
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
