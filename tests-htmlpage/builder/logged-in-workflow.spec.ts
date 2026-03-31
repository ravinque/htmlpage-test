import { test } from '@playwright/test';

test.describe('HTMLPAGE 构建器 — 登录后深度', { tag: '@module-builder' }, () => {
  test('登录后工作流与深度验收（待测试账号）', () => {
    test.skip(
      true,
      '需要登录：请提供专用测试账号后，使用 storageState 或页内登录步骤启用本用例'
    );
  });
});
