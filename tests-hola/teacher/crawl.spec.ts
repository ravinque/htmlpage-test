import { test, expect } from '@playwright/test';
import { boundedSameOriginCrawl } from '../../utils/crawl';
import { PATHS, pathUnderPrefix } from '../routes';
import { attachFullPageScreenshot } from '../../utils/screenshots';

test.describe('Hola 教师端 — 同域深度浏览', { tag: '@module-teacher' }, () => {
  test('/teacher 下多层级链接（受限 BFS）', async ({
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
