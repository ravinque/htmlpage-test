import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 博客 — 列表落地', { tag: '@module-blog' }, () => {
  test('博客列表 body 与标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.blog);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/博客|HTMLPAGE|Hola/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-blog-landing');
  });
});
