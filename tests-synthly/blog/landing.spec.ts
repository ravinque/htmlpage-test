import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 文章 — 列表落地', { tag: '@module-blog' }, () => {
  test('文章列表 body 与标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.blog);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/文章|Synthly|专题/i);
    await attachFullPageScreenshot(page, testInfo, 'synthly-blog-landing');
  });
});
