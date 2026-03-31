import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';
import { browserFromProject, siteIdFromProject } from './site';

type Row = {
  project: string;
  siteId: string;
  browser: string;
  module: string;
  title: string;
  file: string;
  status: TestResult['status'];
  duration: number;
  attachments: Array<{ name: string; path?: string }>;
};

function projectName(test: TestCase): string {
  let s: Suite | undefined = test.parent;
  while (s) {
    if (s.type === 'project') return s.title;
    s = s.parent;
  }
  return 'unknown';
}

function moduleFromTest(test: TestCase): string {
  const tag = test.tags.find((t) => t.startsWith('@module-'));
  if (tag) return tag.replace(/^@module-/, '');
  return 'uncategorized';
}

function safeSegment(s: string) {
  return s.replace(/[/\\?%*:|"<>]/g, '-');
}

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function workspaceRoot(config: FullConfig): string {
  if (config.configFile) return path.dirname(config.configFile);
  return path.resolve(config.rootDir, '..');
}

type Counts = {
  passed: number;
  failed: number;
  skipped: number;
  timedOut: number;
  interrupted: number;
};

function emptyCounts(): Counts {
  return {
    passed: 0,
    failed: 0,
    skipped: 0,
    timedOut: 0,
    interrupted: 0,
  };
}

function bump(bucket: Counts, status: TestResult['status']) {
  if (status === 'passed') bucket.passed += 1;
  else if (status === 'failed') bucket.failed += 1;
  else if (status === 'skipped') bucket.skipped += 1;
  else if (status === 'timedOut') bucket.timedOut += 1;
  else if (status === 'interrupted') bucket.interrupted += 1;
}

export default class SiteModuleReporter implements Reporter {
  private projectRoot = '';
  private rows: Row[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    void suite;
    this.projectRoot = workspaceRoot(config);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const proj = projectName(test);
    const siteId = siteIdFromProject(proj);
    const browser = browserFromProject(proj);
    this.rows.push({
      project: proj,
      siteId,
      browser,
      module: moduleFromTest(test),
      title: test.title,
      file: test.location.file,
      status: result.status,
      duration: result.duration,
      attachments: result.attachments.map((a) => ({
        name: a.name,
        path: a.path,
      })),
    });
  }

  onEnd(result: FullResult) {
    const manifestPath = path.join(this.projectRoot, 'test-results', 'run-manifest.json');
    let manifest: {
      runId?: string;
      packageVersion?: string;
      startedAt?: string;
      browserVersions?: Record<string, string>;
      siteIds?: string[];
    } = {};

    if (fs.existsSync(manifestPath)) {
      try {
        manifest = JSON.parse(
          fs.readFileSync(manifestPath, 'utf8')
        ) as typeof manifest;
      } catch {
        /* ignore */
      }
    }

    const runId =
      process.env.LAPUS_RUN_VERSION || manifest.runId || `run-${Date.now()}`;
    const dirName = safeSegment(runId);
    const finishedAt = new Date().toISOString();

    if (fs.existsSync(manifestPath)) {
      try {
        const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<
          string,
          unknown
        >;
        m.finishedAt = finishedAt;
        fs.writeFileSync(manifestPath, JSON.stringify(m, null, 2), 'utf8');
      } catch {
        /* ignore */
      }
    }

    const siteIds = [...new Set(this.rows.map((r) => r.siteId))].sort();

    const fullSummary = {
      runId,
      packageVersion: manifest.packageVersion,
      startedAt: manifest.startedAt || process.env.LAPUS_RUN_STARTED_AT,
      finishedAt,
      status: result.status,
      browserVersions: manifest.browserVersions || {},
      siteIds,
      bySite: {} as Record<
        string,
        {
          browsersInRun: string[];
          byBrowser: Record<string, Record<string, Counts>>;
          tests: Row[];
        }
      >,
    };

    for (const siteId of siteIds) {
      const siteRows = this.rows.filter((r) => r.siteId === siteId);
      const browsersInRun = [...new Set(siteRows.map((r) => r.browser))].sort();
      const byBrowser: Record<string, Record<string, Counts>> = {};

      for (const r of siteRows) {
        byBrowser[r.browser] ??= {};
        byBrowser[r.browser][r.module] ??= emptyCounts();
        bump(byBrowser[r.browser][r.module], r.status);
      }

      fullSummary.bySite[siteId] = {
        browsersInRun,
        byBrowser,
        tests: siteRows,
      };

      const outDir = path.join(this.projectRoot, 'reports', siteId, dirName);
      fs.mkdirSync(outDir, { recursive: true });
      const siteSummary = {
        site: siteId,
        runId,
        packageVersion: fullSummary.packageVersion,
        startedAt: fullSummary.startedAt,
        finishedAt: fullSummary.finishedAt,
        status: fullSummary.status,
        browserVersions: fullSummary.browserVersions,
        browsersInRun,
        byBrowser,
        tests: siteRows,
      };
      fs.writeFileSync(
        path.join(outDir, 'summary.json'),
        JSON.stringify(siteSummary, null, 2),
        'utf8'
      );

      const latestDir = path.join(this.projectRoot, 'reports', siteId, 'latest');
      fs.mkdirSync(latestDir, { recursive: true });
      fs.writeFileSync(
        path.join(latestDir, 'summary.json'),
        JSON.stringify(siteSummary, null, 2),
        'utf8'
      );

      let html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8"/>
<title>${esc(siteId)} — ${esc(runId)}</title>
<style>
body{font-family:system-ui,sans-serif;margin:24px;background:#0f1419;color:#e6edf3}
h1{font-size:1.25rem} h2{font-size:1rem;margin-top:1.5rem;color:#8b949e}
table{border-collapse:collapse;width:100%;max-width:960px;margin-top:8px}
th,td{border:1px solid #30363d;padding:8px 10px;text-align:left}
th{background:#161b22}
.pass{color:#3fb950}.fail{color:#f85149}.skip{color:#d29922}
.meta{color:#8b949e;font-size:0.9rem;margin-bottom:16px}
</style></head><body>`;
      html += `<h1>Site: ${esc(siteId)}</h1>`;
      html += `<div class="meta">Run ID: <strong>${esc(runId)}</strong><br/>`;
      html += `Started: ${esc(String(siteSummary.startedAt || ''))}<br/>`;
      html += `Finished: ${esc(finishedAt)}<br/>`;
      html += `Overall: ${esc(result.status)}</div>`;

      if (manifest.browserVersions && Object.keys(manifest.browserVersions).length) {
        html += `<h2>Browser versions (launch probe)</h2><ul>`;
        for (const [b, v] of Object.entries(manifest.browserVersions)) {
          html += `<li>${esc(b)}: ${esc(v)}</li>`;
        }
        html += `</ul>`;
      }

      for (const browser of browsersInRun) {
        html += `<h2>Browser: ${esc(browser)}</h2>`;
        html += `<table><thead><tr><th>Module</th><th>Passed</th><th>Failed</th><th>Skipped</th><th>Timed out</th></tr></thead><tbody>`;
        const mods = byBrowser[browser];
        for (const mod of Object.keys(mods).sort()) {
          const m = mods[mod];
          html += `<tr><td>${esc(mod)}</td><td class="pass">${m.passed}</td><td class="fail">${m.failed}</td><td class="skip">${m.skipped}</td><td class="fail">${m.timedOut}</td></tr>`;
        }
        html += `</tbody></table>`;
      }

      html += `</body></html>`;
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
      fs.writeFileSync(path.join(latestDir, 'index.html'), html, 'utf8');
    }

    const aggregateDir = path.join(this.projectRoot, 'reports', '_all', dirName);
    fs.mkdirSync(aggregateDir, { recursive: true });
    fs.writeFileSync(
      path.join(aggregateDir, 'summary.json'),
      JSON.stringify(fullSummary, null, 2),
      'utf8'
    );
  }
}
