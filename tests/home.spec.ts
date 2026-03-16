import { test, expect } from '@playwright/test';

test.describe('HTMLPAGE 首页与导航', () => {
  test('首页核心信息与主行动按钮', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/HTMLPAGE/i);
    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();

    const startCtas = page.locator('text=/开始使用|立即开始制作/');
    await expect(startCtas.first()).toBeVisible();

    await expect(page.getByText(/为什么\s*选择\s*HTMLPAGE/).first()).toBeVisible();
  });

  test('点击开始使用可以跳转到构建器/注册流程', async ({ page }) => {
    await page.goto('/');
    const urlBefore = page.url();

    await page.locator('text=/开始使用|立即开始制作/').first().click();
    await page.waitForLoadState('networkidle');

    await expect(page).not.toHaveURL(urlBefore);
  });

  test('底部合规与联系方式信息展示', async ({ page }) => {
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
  });
});

