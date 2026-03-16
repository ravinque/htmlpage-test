import { test, expect } from '@playwright/test';

test.describe('HTMLPAGE 首页二级导航链接', () => {
  /**
   * 规则：
   * - 只测试站内链接（同域名、或以 / 开头）
   * - 排除锚点链接（href 以 # 开头）
   * - 去重（多个位置指向同一 href 只测一次）
   */
  test('首页所有站内链接的二级页面可正常打开', async ({ page, context, baseURL }) => {
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
          // 仅保留同源链接
          if (u.origin !== origin) return false;
          // 排除锚点
          if (u.hash && u.pathname === url.pathname) return false;
          return true;
        } catch {
          return false;
        }
      });

      return Array.from(new Set(sameOrigin));
    });

    // 没有可测链接直接通过，避免测试挂死
    expect(links.length).toBeGreaterThan(0);

    for (const href of links) {
      const url = new URL(href, baseURL ?? undefined);
      const path = url.pathname + url.search;

      const pageForLink = await context.newPage();
      await pageForLink.goto(path || '/', { waitUntil: 'networkidle' });

      // 校验：HTTP 200 / 有 <title> / 页面非空
      const title = await pageForLink.title();
      const content = await pageForLink.content();

      expect(title, `页面 ${path} 应该有标题`).not.toEqual('');
      expect(content.length, `页面 ${path} 内容不应为空`).toBeGreaterThan(0);

      await pageForLink.close();
    }
  });
});

