import { test } from '@playwright/test';

test.describe('Hola 构建器 — 登录后深度', { tag: '@module-builder' }, () => {
  test('登录后完整教学/编辑工作流（待测试账号）', () => {
    test.skip(
      true,
      '需提供 Hola 测试账号或使用 storageState 后启用：画布、班级、作业等深度场景'
    );
  });
});
