import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS, TOP_NAV } from '../routes';

test.describe('HTMLPAGE 首页 — 主导航', { tag: '@module-home' }, () => {
  test('顶栏：功能、模板、手机模板、工具、专题、文章、联系我们、开始使用', async ({
    page,
  }, testInfo) => {
    await page.goto(PATHS.home);
    const scope = page.locator('header, [role="banner"], nav').first();

    for (const item of TOP_NAV) {
      if (item.key === 'home') continue;
      if (item.key === 'builder') {
        await expect(
          scope.locator('a[href*="/builder"]').first(),
          '导航/顶栏区域应包含「开始使用」构建器入口（href 含 /builder）'
        ).toBeVisible();
        continue;
      }
      const selectors = item.hrefs.map((h) => `a[href="${h}"]`);
      const loc = scope.locator(selectors.join(', ')).first();
      await expect(loc, `导航应包含「${item.label}」(${item.hrefs.join(', ')})`).toBeVisible();
    }

    await expect(
      scope
        .locator(
          'a[href="/"], a[href="https://www.htmlpage.cn/"], a[href="https://htmlpage.cn/"]'
        )
        .first()
    ).toBeVisible();

    await attachFullPageScreenshot(page, testInfo, 'home-nav');
  });
});
