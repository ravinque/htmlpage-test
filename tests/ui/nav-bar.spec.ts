import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../helpers/screenshots';

test.describe('HTMLPAGE 导航栏', { tag: '@module-navbar' }, () => {
  test('站点标题、主标题与头部区域主 CTA 可见', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/HTMLPAGE/i);
    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();

    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    const startCtas = page.locator('text=/开始使用|立即开始制作/');
    await expect(startCtas.first()).toBeVisible();

    await attachFullPageScreenshot(page, testInfo, 'navbar-pass');
  });

  test('点击主 CTA 可离开首页进入构建或注册流程', async ({ page }, testInfo) => {
    await page.goto('/');
    const urlBefore = page.url();

    await page.locator('text=/开始使用|立即开始制作/').first().click();
    await page.waitForLoadState('networkidle');

    await expect(page).not.toHaveURL(urlBefore);
    await attachFullPageScreenshot(page, testInfo, 'navbar-cta-pass');
  });
});
