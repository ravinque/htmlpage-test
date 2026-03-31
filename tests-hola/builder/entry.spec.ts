import { test, expect } from '@playwright/test';
import { PATHS } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Hola 构建器 — 入口', { tag: '@module-builder' }, () => {
  test('构建器入口可打开', async ({ page }, testInfo) => {
    await page.goto(PATHS.builder);
    await expect(page).toHaveTitle(/HTMLPAGE|Hola|构建|Builder/i);
    await expect(page.locator('body')).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-builder-entry');
  });
});
