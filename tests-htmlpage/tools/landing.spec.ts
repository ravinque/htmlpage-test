import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 工具箱 — 落地', { tag: '@module-tools' }, () => {
  test('工具箱主标题「实用工具箱」', async ({ page }, testInfo) => {
    await page.goto(PATHS.tools);
    await expect(
      page.getByRole('heading', { name: /实用工具箱/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'tools-landing');
  });
});
