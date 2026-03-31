import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 联系我们 — 首屏与标题', { tag: '@module-contact-us' }, () => {
  test('落地页主标题「联系我们」可见', async ({ page }, testInfo) => {
    await page.goto(PATHS.contact);
    await expect(
      page.getByRole('heading', { name: /联系我们/ }).first()
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'contact-hero-heading');
  });
});
