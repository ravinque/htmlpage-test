import { test, expect } from '@playwright/test';
import { PATHS } from './routes';
import { attachFullPageScreenshot } from '../utils/screenshots';

test.describe('HTMLPAGE 开始使用 / 构建器', { tag: '@module-builder' }, () => {
  test('构建器入口可打开并呈现编辑器加载流程', async ({ page }, testInfo) => {
    await page.goto(PATHS.builder);
    await expect(page).toHaveTitle(/构建器|Builder|HTMLPAGE/i);
    await expect(
      page
        .getByRole('heading', { name: /在线 HTML 网页构建器|网页构建器/i })
        .or(page.getByText(/正在加载编辑器/))
        .first()
    ).toBeVisible({ timeout: 90_000 });
    await attachFullPageScreenshot(page, testInfo, 'builder-entry');
  });

  test('登录后工作流与深度验收（待测试账号）', () => {
    test.skip(
      true,
      '需要登录：请提供专用测试账号后，使用 storageState 或页内登录步骤启用本用例'
    );
  });
});
