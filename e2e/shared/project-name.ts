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
