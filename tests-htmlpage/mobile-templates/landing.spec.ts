import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 手机模板 — 列表落地', { tag: '@module-mobile-templates' }, () => {
  test('列表页标题与可见性', async ({ page }, testInfo) => {
    await page.goto(PATHS.mobileTemplates);
    await expect(page).toHaveTitle(/手机|移动|模板|HTMLPAGE/i);
    await expect(page.getByRole('heading').first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'mobile-templates-landing');
  });
});
