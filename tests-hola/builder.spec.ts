import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../utils/crawl';
import { PATHS, pathUnderPrefix } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('Hola 构建器 / 开始使用', { tag: '@module-builder' }, () => {
  test('构建器入口可打开', async ({ page }, testInfo) => {
    await page.goto(PATHS.builder);
    await expect(page).toHaveTitle(/HTMLPAGE|Hola|构建|Builder/i);
    await expect(page.locator('body')).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'hola-builder-entry');
  });

  test('构建器同域路由可访问（受限浏览，不含登录后编辑深度）', async ({
    context,
    baseURL,
    page,
  }, testInfo) => {
    test.setTimeout(300_000);
    if (!baseURL) throw new Error('baseURL 未配置');

    const visited = await boundedSameOriginCrawl({
      context,
      baseURL,
      startPath: PATHS.builder,
      maxDepth: 2,
      maxPages: 22,
      shouldEnqueue: (p) => pathUnderPrefix(p, '/builder'),
    });
    expect(visited.length).toBeGreaterThan(0);

    await page.goto(PATHS.builder);
    await attachFullPageScreenshot(page, testInfo, 'hola-builder-crawl-summary');
  });

  test('登录后完整教学/编辑工作流（待测试账号）', async () => {
    test.skip(
      true,
      '需提供 Hola 测试账号或使用 storageState 后启用：画布、班级、作业等深度场景'
    );
  });
});
