import { test, expect } from '@playwright/test';
import { attachFullPageScreenshot } from '../../utils/screenshots';
import { PATHS } from '../routes';

test.describe('HTMLPAGE 专题 — 落地', { tag: '@module-topics' }, () => {
  test('专题知识库主标题', async ({ page }, testInfo) => {
    await page.goto(PATHS.topics);
    await expect(
      page.getByRole('heading', { name: /专题知识库|深度学习/ })
    ).toBeVisible();
    await attachFullPageScreenshot(page, testInfo, 'topics-landing');
  });
});
