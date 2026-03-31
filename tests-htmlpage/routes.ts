/**
 * www.htmlpage.cn — 路由与导航约定（仅本目录 specs 引用）。
 * 模块 tag：@module-home | features | templates | …
 */
export const PATHS = {
  home: '/',
  features: '/features',
  templates: '/templates',
  mobileTemplates: '/mobile-templates',
  tools: '/tools',
  topics: '/topics',
  articles: '/articles',
  contact: '/contact',
  builder: '/builder',
} as const;

export const TOP_NAV = [
  {
    key: 'home',
    label: '首页',
    hrefs: [
      '/',
      'https://www.htmlpage.cn/',
      'https://www.htmlpage.cn',
      'https://htmlpage.cn/',
      'https://htmlpage.cn',
    ],
  },
  { key: 'features', label: '功能', hrefs: ['/features'] },
  { key: 'templates', label: '模板', hrefs: ['/templates'] },
  { key: 'mobile-templates', label: '手机模板', hrefs: ['/mobile-templates'] },
  { key: 'tools', label: '工具', hrefs: ['/tools'] },
  { key: 'topics', label: '专题', hrefs: ['/topics'] },
  { key: 'articles', label: '文章', hrefs: ['/articles'] },
  { key: 'contact-us', label: '联系我们', hrefs: ['/contact'] },
  { key: 'builder', label: '开始使用', hrefs: ['/builder', '/builder/'] },
] as const;

export const TOOL_PATH_PREFIXES = [
  '/tools',
  '/web-design-safe-colors',
  '/color-picker',
  '/drawio',
  '/json-formatter',
  '/base64',
] as const;

export function pathMatchesToolArea(path: string): boolean {
  const p = path.split('?')[0] ?? path;
  return TOOL_PATH_PREFIXES.some(
    (prefix) => p === prefix || p.startsWith(`${prefix}/`)
  );
}

export function pathUnderPrefix(path: string, prefix: string): boolean {
  const base = path.split('?')[0] ?? '';
  return base === prefix || base.startsWith(`${prefix}/`);
}
