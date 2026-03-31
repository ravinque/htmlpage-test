import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../helpers/screenshots';

test.describe('HTMLPAGE 面包屑', { tag: '@module-breadcrumb' }, () => {
  test('内页若存在面包屑区域则应对用户可见', async ({ page }, testInfo) => {
    await page.goto('/');

    const innerPath = await page.evaluate(() => {
      const origin = window.location.origin;
      const links = [...document.querySelectorAll('a[href]')] as HTMLAnchorElement[];
      for (const el of links) {
        try {
          const u = new URL(el.href, origin);
          if (u.origin !== window.location.origin) continue;
          if (u.hash && u.pathname === window.location.pathname) continue;
          if (u.pathname && u.pathname !== '/') return u.pathname + u.search;
        } catch {
          /* ignore */
        }
      }
      return null as string | null;
    });

    if (!innerPath) {
      test.skip(true, '首页未找到可用的站内非根路径链接');
      return;
    }

    await page.goto(innerPath);
    await page.waitForLoadState('networkidle');

    const bc = page.locator(
      '[aria-label*="breadcrumb" i], [aria-label*="面包屑" i], nav.breadcrumb, [class*="Breadcrumb"], ol[class*="breadcrumb" i]'
    );
    const count = await bc.count();
    if (count > 0) {
      await expect(bc.first()).toBeVisible();
    }

    test.info().annotations.push({
      type: 'breadcrumb',
      description: count > 0 ? 'present' : 'not-present-on-page',
    });

    await attachFullPageScreenshot(page, testInfo, 'breadcrumb-pass');
  });
});
