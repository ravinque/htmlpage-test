import { test } from '@playwright/test';

test.describe('Synthly 应用 — 登录后深度', { tag: '@module-builder' }, () => {
  test('登录后完整编排/发布工作流（待测试账号）', () => {
    test.skip(
      true,
      '需提供 Synthly 测试账号或使用 storageState 后启用：应用列表、编辑、发布等深度场景'
    );
  });
});
