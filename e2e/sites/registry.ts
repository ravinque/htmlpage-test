import type { SiteDefinition } from '../shared/types';
import { htmlpageSite } from './htmlpage/site.config';
import { holaSite } from './hola/site.config';

/**
 * 注册表：新增站点时
 * 1. 新建 e2e/sites/<id>/（site.config.ts + routes.ts + *.spec.ts）
 * 2. 在此处追加一行 import + 数组项
 */
export const allSites: SiteDefinition[] = [htmlpageSite, holaSite];

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
