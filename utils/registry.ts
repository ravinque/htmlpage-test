import type { SiteDefinition } from './site';
import { htmlpageSite } from '../tests-htmlpage/site.config';
import { holaSite } from '../tests-hola/site.config';
import { synthlySite } from '../tests-synthly/site.config';

/**
 * 注册表：新站点
 * 1. 复制 `tests-htmlpage/` 为 `tests-<id>/`（site.config + routes + specs）
 * 2. 在此 `import` 并加入 `allSites`
 */
export const allSites: SiteDefinition[] = [htmlpageSite, holaSite, synthlySite];

export function activeSites(): SiteDefinition[] {
  const raw = process.env.LAPUS_SITES?.trim();
  if (!raw) return allSites;
  const allow = new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  );
  return allSites.filter((s) => allow.has(s.id));
}
