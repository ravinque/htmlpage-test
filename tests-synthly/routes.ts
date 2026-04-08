/**
 * synthly.cn — 营销站与产品路由（与 Hola/主站不同）。
 */
export const PATHS = {
  home: '/',
  features: '/features',
  builder: '/apps/new',
  blog: '/articles',
  help: '/help',
  helpContact: '/contact',
  teacher: '/explore',
} as const;

export const TOP_NAV = [
  { key: 'home', label: '首页', hrefs: ['/'] },
  { key: 'features', label: '功能', hrefs: ['/features'] },
  { key: 'builder', label: '应用', hrefs: ['/apps', '/apps/new'] },
  { key: 'blog', label: '文章', hrefs: ['/articles'] },
  { key: 'help', label: '文档', hrefs: ['/docs'] },
  { key: 'contact-us', label: '联系我们', hrefs: ['/contact'] },
  { key: 'teacher', label: '场景探索', hrefs: ['/explore'] },
] as const;

export function pathUnderPrefix(path: string, prefix: string): boolean {
  const base = path.split('?')[0] ?? '';
  return base === prefix || base.startsWith(`${prefix}/`);
}
