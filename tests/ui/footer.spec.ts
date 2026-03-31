import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../helpers/screenshots';

test.describe('HTMLPAGE 底部栏', { tag: '@module-footer' }, () => {
  test('合规链接与站点外链展示', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await expect(page.getByRole('link', { name: /隐私政策/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Cookies政策/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /服务与条款/ })).toBeVisible();

    const footer = page.getByRole('contentinfo');
    await expect(
      footer.getByRole('link', { name: /联系我们/ }).first()
    ).toBeVisible();
    await expect(
      footer.getByRole('link', { name: /htmlpage\.cn/i }).first()
    ).toBeVisible();

    await attachFullPageScreenshot(page, testInfo, 'footer-legal-pass');
  });

  test('联系方式（电话与邮箱）', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText(/联系我们/).first()).toBeVisible();
    await expect(footer.getByText(/137\s*9926\s*4013/)).toBeVisible();
    await expect(
      footer.getByText(/help@lapus\.cn/i).first()
    ).toBeVisible();

    await attachFullPageScreenshot(page, testInfo, 'footer-contact-pass');
  });
});
