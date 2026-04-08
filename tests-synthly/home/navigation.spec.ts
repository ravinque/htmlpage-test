import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS, TOP_NAV } from '../routes';

test.describe('Synthly 首页 — 主导航与关键入口', { tag: '@module-home' }, () => {
  test('功能、应用、文章、文档、联系、场景探索', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    const top = page.locator('header, nav, [role="banner"]').first();

    for (const item of TOP_NAV) {
      if (item.key === 'home') continue;
      if (item.key === 'builder') {
        await expect(
          page.locator('a[href="/apps"], a[href="/apps/new"]').first(),
          '应有应用/新建入口'
        ).toBeVisible();
        continue;
      }
      if (item.key === 'contact-us') {
        await expect(
          page.locator('a[href="/contact"]').first(),
          '应有联系我们入口'
        ).toBeVisible();
        continue;
      }
      if (item.key === 'help') {
        await expect(
          page.locator('header a[href="/docs"], nav a[href="/docs"]').first(),
          '顶栏或主导航应有文档入口'
        ).toBeVisible();
        continue;
      }
      if (item.key === 'teacher') {
        await expect(
          page.locator('header a[href="/explore"], nav a[href="/explore"]').first(),
          '顶栏或主导航应有场景探索入口'
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
    await attachFullPageScreenshot(page, testInfo, 'synthly-home-nav');
  });
});
