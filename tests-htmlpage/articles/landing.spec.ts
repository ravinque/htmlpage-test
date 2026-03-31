import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 文章 — 列表落地', { tag: '@module-articles' }, () => {
  test('文章列表页主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.articles);
    await expect(
      page.getByRole('heading', { name: /发现网页设计|博客文章/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'articles-landing');
  });
});
