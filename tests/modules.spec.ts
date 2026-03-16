import { test, expect } from '@playwright/test';

test.describe('HTMLPAGE 功能模块与模板区块', () => {
  test('功能模块-为什么选择 HTMLPAGE 与统计数据', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByText(/为什么\s*选择\s*HTMLPAGE/).first()
    ).toBeVisible();

    await expect(
      page.getByText(/服务用户，覆盖多行业建站需求/)
    ).toBeVisible();
    await expect(
      page.getByText(/生成 HTML5 页面，高效交付/)
    ).toBeVisible();
    await expect(
      page.getByText(/累计访问，稳定在线服务/)
    ).toBeVisible();

    await expect(page.getByText(/AI 多智能体协作/)).toBeVisible();
    await expect(page.getByText(/0 代码拖拽编辑/)).toBeVisible();
    await expect(page.getByText(/300\+ 精选模板/)).toBeVisible();
    await expect(page.getByText(/企业级安全/)).toBeVisible();
  });

  test('模板区块展示企业/个人/电商模板', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/精选网页模板/)).toBeVisible();
    await expect(page.getByText(/企业官网模板/)).toBeVisible();
    await expect(page.getByText(/作品集/).first()).toBeVisible();
    await expect(page.getByText(/电商落地页模板/)).toBeVisible();
  });

  test('企业级定制服务模块展示完整流程', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText(/企业级定制服务/).first()).toBeVisible();

    await expect(page.getByText(/需求沟通/)).toBeVisible();
    await expect(page.getByText(/方案制定/)).toBeVisible();
    await expect(page.getByText('定制开发', { exact: true })).toBeVisible();
    await expect(page.getByText(/测试验收/)).toBeVisible();
    await expect(page.getByText(/交付部署/)).toBeVisible();
  });
});

