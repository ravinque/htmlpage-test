import type { Page, TestInfo } from '@playwright/test';

/**
 * Full-page screenshot after assertions pass; attached to Playwright HTML report and stored under test-results.
 */
export async function attachFullPageScreenshot(
  page: Page,
  testInfo: TestInfo,
  attachName = 'screenshot-pass-fullpage'
) {
  const path = testInfo.outputPath('pass-fullpage.png');
  await page.screenshot({
    path,
    fullPage: true,
    animations: 'disabled',
  });
  await testInfo.attach(attachName, {
    path,
    contentType: 'image/png',
  });
}
