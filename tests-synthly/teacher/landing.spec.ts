import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Synthly 场景探索 — 落地', { tag: '@module-teacher' }, () => {
  test('探索页 body 与标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.teacher);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/探索|场景|Synthly|模板/i);
    await attachFullPageScreenshot(page, testInfo, 'synthly-teacher-landing');
  });
});
