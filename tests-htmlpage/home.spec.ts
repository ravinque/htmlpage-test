import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../utils/screenshots';
import { PATHS, TOP_NAV } from './routes';

test.describe('HTMLPAGE 首页', { tag: '@module-home' }, () => {
  test('站点身份与首屏主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await expect(page).toHaveTitle(/HTMLPAGE/i);
    await expect(
      page.getByRole('heading', { name: /HTMLPAGE.*网页构建器/i })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'home-hero');
  });

  test('主导航覆盖：功能、模板、手机模板、工具、专题、文章、联系我们、开始使用', async ({
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

  test('首页业务入口：功能全景', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /查看功能全景/ }).click();
    await expect(page).toHaveURL(/\/features/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-features');
  });

  test('首页业务入口：模板市场', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /浏览全部模板/ }).click();
    await expect(page).toHaveURL(/\/templates/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-templates');
  });

  test('首页业务入口：企业模板分类', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href*="category=enterprise"]').first().click();
    await expect(page).toHaveURL(/\/templates/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-templates-enterprise');
  });

  test('首页业务入口：手机模板', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    const m = page
      .locator('header a[href="/mobile-templates"], nav a[href="/mobile-templates"]')
      .first();
    await m.click();
    await expect(page).toHaveURL(/\/mobile-templates/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-mobile-templates');
  });

  test('首页业务入口：工具箱', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/tools"], nav a[href="/tools"]').first().click();
    await expect(page).toHaveURL(/\/tools/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-tools');
  });

  test('首页业务入口：专题', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/topics"], nav a[href="/topics"]').first().click();
    await expect(page).toHaveURL(/\/topics/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-topics');
  });

  test('首页业务入口：文章', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /阅读博客文章/ }).click();
    await expect(page).toHaveURL(/\/articles/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-articles');
  });

  test('首页业务入口：联系我们（页脚）', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByRole('contentinfo').getByRole('link', { name: /联系我们/ }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-contact');
  });

  test('首页业务入口：开始使用 / 构建器', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.getByRole('link', { name: /立即开始制作|免费开始使用/ }).first().click();
    await expect(page).toHaveURL(/\/builder/);
    await attachFullPageScreenshot(page, testInfo, 'home-to-builder');
  });

  test('首页底部合规与品牌信息', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('link', { name: /隐私政策/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Cookies政策/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /服务与条款/ })).toBeVisible();
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText(/help@lapus\.cn/i).first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'home-footer');
  });
});
