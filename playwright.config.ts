import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import { activeSites } from './utils/registry';

const CHANNELS = [
  'chrome',
  'msedge',
  'chrome-beta',
  'chrome-dev',
  'chrome-canary',
] as const;

const BROWSER_ORDER = ['chromium', 'firefox', 'webkit'] as const;
type BrowserName = (typeof BROWSER_ORDER)[number];

function pickBrowsers(): BrowserName[] {
  const raw = process.env.LAPUS_BROWSERS?.trim().toLowerCase();
  if (!raw || raw === 'all') return [...BROWSER_ORDER];
  const requested = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean) as BrowserName[];
  const valid = requested.filter((b): b is BrowserName =>
    (BROWSER_ORDER as readonly string[]).includes(b)
  );
  return valid.length ? valid : [...BROWSER_ORDER];
}

const channelRaw = process.env.LAPUS_BROWSER_CHANNEL?.trim();
const channel =
  channelRaw && (CHANNELS as readonly string[]).includes(channelRaw)
    ? (channelRaw as (typeof CHANNELS)[number])
    : undefined;

function deviceOptions(browser: BrowserName) {
  if (browser === 'chromium') {
    return {
      ...devices['Desktop Chrome'],
      ...(channel ? { channel } : {}),
    };
  }
  if (browser === 'firefox') return { ...devices['Desktop Firefox'] };
  return { ...devices['Desktop Safari'] };
}

function parseHeaded(): boolean {
  const v = process.env.LAPUS_HEADED?.trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

function parseWorkers(): number | undefined {
  const raw = process.env.LAPUS_WORKERS?.trim();
  if (raw === undefined || raw === '') return undefined;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}

function terminalReporterName(): 'list' | 'line' | 'dot' {
  const r = (process.env.LAPUS_TERMINAL_REPORTER || 'list')
    .trim()
    .toLowerCase();
  if (r === 'line' || r === 'dot') return r;
  return 'list';
}

const sites = activeSites();
const browsers = pickBrowsers();
const headed = parseHeaded();
const workers = parseWorkers();

const projects = sites.flatMap((site) =>
  browsers.map((browser) => ({
    name: `${site.id}-${browser}`,
    testDir: path.join(__dirname, `tests-${site.id}`),
    outputDir: `test-results/${site.id}`,
    use: {
      baseURL: site.baseURL,
      ...(headed ? { headless: false as const } : {}),
      trace: 'on-first-retry' as const,
      screenshot: 'only-on-failure' as const,
      video: 'retain-on-failure' as const,
      ...deviceOptions(browser),
    },
  }))
);

export default defineConfig({
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  ...(workers !== undefined ? { workers } : {}),
  globalSetup: path.join(__dirname, 'global-setup.ts'),
  reporter: [
    [terminalReporterName()],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['./utils/site-module-reporter.ts'],
  ],
  projects,
});
