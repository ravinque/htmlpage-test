import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('Hola 教师端 — 落地', { tag: '@module-teacher' }, () => {
  test('教师入口页 body 与标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.teacher);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/HTMLPAGE|Hola|教师|Teacher/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-teacher-landing');
  });
});
