import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS, TOP_NAV } from '../routes';

test.describe('Hola 首页 — 主导航与关键入口', { tag: '@module-home' }, () => {
  test('功能、开始使用、博客、帮助、联系我们、教师', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    const top = page.locator('header, nav, [role="banner"]').first();

    for (const item of TOP_NAV) {
      if (item.key === 'home') continue;
      if (item.key === 'builder') {
        await expect(
          top.locator('a[href*="/builder"]').first(),
          '应有构建器/开始使用入口'
        ).toBeVisible();
        continue;
      }
      if (item.key === 'contact-us') {
        await expect(
          page.locator('a[href="/help/contact"]').first(),
          '应有联系我们（帮助中心联系页）'
        ).toBeVisible();
        continue;
      }
      if (item.key === 'help') {
        await expect(
          page.locator('a[href="/help"]').first(),
          '页面应含帮助中心入口（可能在页脚或正文）'
        ).toBeVisible();
        continue;
      }
      if (item.key === 'teacher') {
        await expect(
          page.locator('a[href="/teacher"]').first(),
          '页面应含教师入口（可能在 CTA 区而非顶栏）'
        ).toBeVisible();
        continue;
      }
      const selectors = item.hrefs.map((h) => `a[href="${h}"]`);
      await expect(
        page.locator(`header, nav`).locator(selectors.join(', ')).first(),
        `导航应含「${item.label}」`
      ).toBeVisible();
    }

    await expect(top.locator('a[href="/"]').first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-home-nav');
  });
});
