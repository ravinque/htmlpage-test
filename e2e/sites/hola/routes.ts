/**
 * hola.htmlpage.cn — 教育站路由（与主站不同）。
 */
export const PATHS = {
  home: '/',
  features: '/features',
  builder: '/builder',
  blog: '/blog',
  help: '/help',
  helpContact: '/help/contact',
  teacher: '/teacher',
} as const;

export const TOP_NAV = [
  { key: 'home', label: '首页', hrefs: ['/'] },
  { key: 'features', label: '功能', hrefs: ['/features'] },
  { key: 'builder', label: '开始使用', hrefs: ['/builder'] },
  { key: 'blog', label: '博客', hrefs: ['/blog'] },
  { key: 'help', label: '帮助', hrefs: ['/help'] },
  { key: 'contact-us', label: '联系我们', hrefs: ['/help/contact'] },
  { key: 'teacher', label: '教师', hrefs: ['/teacher'] },
] as const;

export function pathUnderPrefix(path: string, prefix: string): boolean {
  const base = path.split('?')[0] ?? '';
  return base === prefix || base.startsWith(`${prefix}/`);
}
