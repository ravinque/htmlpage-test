/** Declarative site entry — add a folder under e2e/sites/<id> and register in e2e/sites/registry.ts */
export type SiteDefinition = {
  /** Stable id; becomes Playwright project prefix `{id}-{browser}` */
  id: string;
  baseURL: string;
};
