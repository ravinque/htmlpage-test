import * as fs from 'fs';
import * as path from 'path';
import { chromium, firefox, webkit } from 'playwright';
import { activeSites } from './e2e/sites/registry';

function pickBrowsers(): string[] {
  const raw = process.env.LAPUS_BROWSERS?.trim();
  if (!raw || raw.toLowerCase() === 'all') {
    return ['chromium', 'firefox', 'webkit'];
  }
  return raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export default async function globalSetup() {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
  ) as { version: string };

  const sites = activeSites();
  const startedAt = new Date().toISOString();
  const runId =
    process.env.LAPUS_RUN_VERSION?.trim() ||
    `${pkg.version}-${startedAt.replace(/:/g, '-')}`;

  process.env.LAPUS_RUN_VERSION = runId;
  process.env.LAPUS_RUN_STARTED_AT = startedAt;

  const browsers = pickBrowsers();
  const channel = process.env.LAPUS_BROWSER_CHANNEL?.trim() || '';
  const browserVersions: Record<string, string> = {};

  const launchers = { chromium, firefox, webkit } as const;

  for (const name of browsers) {
    const launcher = launchers[name as keyof typeof launchers];
    if (!launcher) continue;
    try {
      const opts =
        name === 'chromium' && channel
          ? { channel: channel as 'chrome' | 'msedge' | 'chrome-beta' }
          : {};
      const browser = await launcher.launch(opts);
      browserVersions[name] = await browser.version();
      await browser.close();
    } catch {
      browserVersions[name] = 'unknown (launch failed)';
    }
  }

  const dir = path.join(__dirname, 'test-results');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'run-manifest.json'),
    JSON.stringify(
      {
        runId,
        packageVersion: pkg.version,
        siteIds: sites.map((s) => s.id),
        startedAt,
        finishedAt: null as string | null,
        browsersRequested: browsers,
        browserChannel: channel || null,
        browserVersions,
      },
      null,
      2
    ),
    'utf8'
  );
}
