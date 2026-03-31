/** 站点声明：在 `tests-<id>/` 下放用例，并在 `utils/registry.ts` 注册 */
export type SiteDefinition = {
  /** 稳定 id；Playwright 项目名为 `{id}-{browser}`，目录名为 `tests-{id}` */
  id: string;
  baseURL: string;
};

const BROWSER_SUFFIXES = ['chromium', 'firefox', 'webkit'] as const;

/** Project name format: `{siteId}-{browser}` */
export function siteIdFromProject(projectName: string): string {
  for (const b of BROWSER_SUFFIXES) {
    const suf = `-${b}`;
    if (projectName.endsWith(suf)) {
      return projectName.slice(0, -suf.length);
    }
  }
  return 'unknown';
}

export function browserFromProject(projectName: string): string {
  for (const b of BROWSER_SUFFIXES) {
    if (projectName.endsWith(`-${b}`)) return b;
  }
  return projectName;
}
