import type { BrowserContext, Page } from '@playwright/test';

export async function assertPageRenderable(page: Page, pathLabel: string) {
  await page.waitForLoadState('domcontentloaded', { timeout: 45_000 });
  await page.waitForLoadState('load', { timeout: 20_000 }).catch(() => {});
  await page
    .waitForFunction(() => document.title.trim().length > 0, null, {
      timeout: 25_000,
    })
    .catch(() => {});
  const title = (await page.title()).trim();
  const htmlLen = (await page.content()).length;
  if (title.length === 0 && htmlLen <= 500) {
    throw new Error(`${pathLabel}: 页面未正常渲染（无标题且 HTML 过短）`);
  }
}

async function collectSameOriginPaths(page: Page, origin: string): Promise<string[]> {
  return page.evaluate((o) => {
    const originUrl = new URL(o);
    const set = new Set<string>();
    const here = new URL(window.location.href);
    for (const el of document.querySelectorAll('a[href]')) {
      try {
        const u = new URL((el as HTMLAnchorElement).href, originUrl.origin);
        if (u.origin !== originUrl.origin) continue;
        if (u.hash && u.pathname === here.pathname) continue;
        set.add(u.pathname + u.search);
      } catch {
        /* ignore */
      }
    }
    return [...set];
  }, origin);
}

async function settleDynamicLinks(page: Page) {
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
}

export type BoundedCrawlOptions = {
  context: BrowserContext;
  baseURL: string;
  startPath: string;
  maxDepth: number;
  maxPages: number;
  shouldEnqueue: (path: string) => boolean;
};

const MAX_QUEUE = 800;

/**
 * 同域 BFS：从 startPath 出发，按 shouldEnqueue 过滤链接，限制深度与总页数。
 */
export async function boundedSameOriginCrawl(
  opts: BoundedCrawlOptions
): Promise<string[]> {
  const origin = new URL(opts.baseURL).origin;
  const start = opts.startPath.startsWith('/')
    ? opts.startPath
    : `/${opts.startPath}`;

  const visitedOrder: string[] = [];
  const visited = new Set<string>();
  const enqueued = new Set<string>();
  const queue: { path: string; depth: number }[] = [{ path: start, depth: 0 }];
  enqueued.add(start);

  while (queue.length > 0 && visited.size < opts.maxPages) {
    const item = queue.shift()!;
    if (visited.has(item.path)) continue;
    if (item.depth > opts.maxDepth) continue;

    const allowed = item.path === start || opts.shouldEnqueue(item.path);
    if (!allowed) continue;

    const page = await opts.context.newPage();
    try {
      await page.goto(origin + item.path, {
        waitUntil: 'domcontentloaded',
        timeout: 45_000,
      });
      await settleDynamicLinks(page);
      await assertPageRenderable(page, item.path);

      visited.add(item.path);
      visitedOrder.push(item.path);

      if (item.depth < opts.maxDepth && visited.size < opts.maxPages) {
        const links = await collectSameOriginPaths(page, origin);
        for (const p of links) {
          if (queue.length >= MAX_QUEUE) break;
          if (!opts.shouldEnqueue(p) && p !== start) continue;
          if (visited.has(p) || enqueued.has(p)) continue;
          enqueued.add(p);
          queue.push({ path: p, depth: item.depth + 1 });
        }
      }
    } finally {
      await page.close();
    }
  }

  return visitedOrder;
}
