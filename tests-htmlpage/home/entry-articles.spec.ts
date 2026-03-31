import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 首页 — 入口：文章', { tag: '@module-home' }, () => {
  test('业务区：阅读博客文章 → /articles', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /阅读博客文章/ }).click();
    await expect(page).toHaveURL(/\/articles/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-articles');
  });
});
