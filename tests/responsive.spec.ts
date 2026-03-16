import { test, expect } from '@playwright/test';

test.describe('HTMLPAGE 响应式布局（移动端）', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('移动端首页仍能看到核心标题和 CTA', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();

    const startCtas = page.locator('text=/开始使用|立即开始制作|免费开始使用/');
    await expect(startCtas.first()).toBeAttached();
  });

  test('移动端底部合规信息正常展示', async ({ page }) => {
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
  });
});

