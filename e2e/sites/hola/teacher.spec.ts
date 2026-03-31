import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../shared/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../../shared/screenshots';

test.describe('Hola 教师端', { tag: '@module-teacher' }, () => {
  test('教师入口落地页', async ({ page }, testInfo) => {
    await page.goto(PATHS.teacher);
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/HTMLPAGE|Hola|教师|Teacher/i);
    await attachFullPageScreenshot(page, testInfo, 'hola-teacher-landing');
  });

  test('教师端下同域多层级链接（受限浏览）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(240_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.teacher,
      maxDepth: 3,
      maxPages: 35,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/teacher'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.teacher);
    await attachFullPageScreenshot(page, testInfo, 'hola-teacher-crawl-summary');
  });
});
