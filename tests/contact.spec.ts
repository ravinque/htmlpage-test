import { test, expect } from '@playwright/test';

test.describe('HTMLPAGE 联系方式与支持信息', () => {
  test('底部联系方式包含电话和邮箱', async ({ page }) => {
    await page.goto('/');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.getByRole('contentinfo');

    await expect(footer.getByText(/联系我们/).first()).toBeVisible();

    await expect(
      footer.getByText(/137\s*9926\s*4013/)
    ).toBeVisible();

    await expect(
      footer.getByText(/help@lapus\.cn/i).first()
    ).toBeVisible();
  });
});

