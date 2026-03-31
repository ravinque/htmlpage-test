import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../helpers/screenshots';

test.describe('HTMLPAGE 全站导航（深度链接）', { tag: '@module-navigation' }, () => {
  /**
   * 规则：
   * - 只测试站内链接（同域名、或以 / 开头）
   * - 排除锚点链接（href 以 # 开头）
   * - 去重（多个位置指向同一 href 只测一次）
   */
  test('首页所有站内链接的二级页面可正常打开', async (
    { page, context, baseURL },
    testInfo
  ) => {
    test.setTimeout(180_000);

    await page.goto('/');

    const links = await page.$$eval('a[href]', (elements) => {
      const hrefs = elements
        .map((el) => (el as HTMLAnchorElement).href)
        .filter(Boolean);

      const url = new URL(window.location.href);
      const origin = url.origin;

      const sameOrigin = hrefs.filter((href) => {
        try {
          const u = new URL(href, origin);
          if (u.origin !== origin) return false;
          if (u.hash && u.pathname === url.pathname) return false;
          return true;
        } catch {
          return false;
        }
      });

      return Array.from(new Set(sameOrigin));
    });

    expect(links.length).toBeGreaterThan(0);

    for (const href of links) {
      const url = new URL(href, baseURL ?? undefined);
      const path = url.pathname + url.search;

      const pageForLink = await context.newPage();
      await pageForLink.goto(path || '/', {
        waitUntil: 'domcontentloaded',
        timeout: 45_000,
      });
      await pageForLink.waitForLoadState('load', { timeout: 20_000 }).catch(() => {});
      await pageForLink
        .waitForFunction(() => document.title.trim().length > 0, null, {
          timeout: 25_000,
        })
        .catch(() => {});

      const title = await pageForLink.title();
      const content = await pageForLink.content();

      expect(
        title.trim().length > 0 || content.length > 500,
        `页面 ${path} 应有标题或可辨识的 HTML 内容（兼容 WebKit 等延后写 title 的页面）`
      ).toBeTruthy();

      await pageForLink.close();
    }

    await page.goto('/');
    await attachFullPageScreenshot(page, testInfo, 'navigation-deep-pass');
  });
});
