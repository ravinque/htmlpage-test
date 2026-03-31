import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 首页 — 跳转：教师', { tag: '@module-home' }, () => {
  test('全页首个 /teacher 链接', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href="/teacher"]').first().click();
    await expect(page).toHaveURL(/\/teacher/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-teacher');
  });
});
