import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../shared/screenshots';
import { PATHS, TOP_NAV } from './routes';

test.describe('Hola 首页', { tag: '@module-home' }, () => {
  test('落地页品牌与主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await expect(page).toHaveTitle(/HTMLPAGE|Hola/i);
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/HTMLPAGE/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-hero');
  });

  test('主导航：功能、开始使用、博客、帮助、联系我们、教师', async ({
    page,
  }, testInfo) => {
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

  test('从首页进入功能页', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/features"], nav a[href="/features"]').first().click();
    await expect(page).toHaveURL(/\/features/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-features');
  });

  test('从首页进入构建器', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/builder"], nav a[href="/builder"]').first().click();
    await expect(page).toHaveURL(/\/builder/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-builder');
  });

  test('从首页进入博客', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('header a[href="/blog"], nav a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-blog');
  });

  test('从首页进入帮助中心', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href="/help"]').first().click();
    await expect(page).toHaveURL(/\/help/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-help');
  });

  test('从首页进入教师入口', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.locator('a[href="/teacher"]').first().click();
    await expect(page).toHaveURL(/\/teacher/);
    await attachFullPageScreenshot(page, testInfo, 'hola-home-to-teacher');
  });

  test('页脚存在主站合规与政策外链', async ({ page }, testInfo) => {
    await page.goto(PATHS.home);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(
      page.locator('a[href*="htmlpage.cn/site-privacy-policy"]').first()
    ).toBeVisible();
    await expect(page.locator('a[href="https://htmlpage.cn"]').first()).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-home-footer');
  });
});
