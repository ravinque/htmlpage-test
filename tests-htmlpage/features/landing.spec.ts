import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 功能 — 落地页', { tag: '@module-features' }, () => {
  test('功能页主标题「探索强大功能」', async ({ page }, testInfo) => {
    await page.goto(PATHS.features);
    await expect(
      page.getByRole('heading', { name: /探索强大功能/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'features-landing');
  });
});
