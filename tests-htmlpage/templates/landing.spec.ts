import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 模板市场 — 落地', { tag: '@module-templates' }, () => {
  test('模板市场列表页标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.templates);
    await expect(page).toHaveTitle(/模板/);
    await attachFullPageScreenshot(page, testInfo, 'templates-landing');
  });
});
