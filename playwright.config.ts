import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

const CHANNELS = [
  'chrome',
  'msedge',
  'chrome-beta',
  'chrome-dev',
  'chrome-canary',
] as const;

function selectedBrowsers(): string[] {
  const raw = process.env.LAPUS_BROWSERS?.trim();
  if (!raw || raw.toLowerCase() === 'all') {
    return ['chromium', 'firefox', 'webkit'];
  }
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

const browsers = selectedBrowsers();
const channelRaw = process.env.LAPUS_BROWSER_CHANNEL?.trim();
const channel =
  channelRaw && (CHANNELS as readonly string[]).includes(channelRaw)
    ? (channelRaw as (typeof CHANNELS)[number])
    : undefined;

const chromiumUse = {
  ...devices['Desktop Chrome'],
  ...(channel ? { channel } : {}),
};

const allProjects = [
  { name: 'chromium', use: chromiumUse },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
];

const projects = allProjects.filter((p) => browsers.includes(p.name));
const effectiveProjects = projects.length ? projects : allProjects;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  globalSetup: path.join(__dirname, 'global-setup.ts'),
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['./reporters/browser-module-reporter.ts'],
  ],
  use: {
    baseURL: 'https://htmlpage.cn',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: effectiveProjects,
});
