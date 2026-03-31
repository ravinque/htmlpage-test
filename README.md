# lapus-tests

基于 Playwright 的多站点端到端测试。**单一配置** `playwright.config.ts`；各站点在根目录 **`tests-<站点id>/`**（如 `tests-htmlpage`、`tests-hola`），共享逻辑集中在 **`utils/`**。

---

## 1. 环境与前置条件

| 要求 | 说明 |
|------|------|
| Node.js | 建议使用当前 LTS（与 Playwright 1.x 兼容） |
| npm | 随 Node 安装即可 |

首次克隆后：

```bash
npm install
npx playwright install
```

仅安装 Chromium 可加快下载：

```bash
npx playwright install chromium
```

---

## 2. 仓库结构说明

| 路径 | 作用 |
|------|------|
| `playwright.config.ts` | 根据注册表生成 `{站点id}-{chromium\|firefox\|webkit}` 项目，`testDir` 为 `tests-{id}` |
| `global-setup.ts` | 写入本次运行的 manifest，并探测浏览器版本信息 |
| `utils/registry.ts` | **在此注册站点**：`import` 各站 `site.config` 并加入 `allSites` |
| `utils/site.ts` | `SiteDefinition` 类型 + 从 project 名解析站点 / 浏览器 |
| `utils/crawl.ts` | 同域受限爬取、页面可渲染断言 |
| `utils/screenshots.ts` | 通过后整页截图并挂到报告 |
| `utils/site-module-reporter.ts` | 生成 `reports/<站点id>/latest/` 与汇总 `reports/_all/` |
| `tests-<id>/site.config.ts` | 仅含 `id` 与 `baseURL` |
| `tests-<id>/routes.ts` | 路径、主导航、同域爬取前缀等（站点专属） |
| `tests-<id>/*.spec.ts` | 该站点的用例 |
| `scripts/` | 可选脚本（例如 `tag:run` 打 git 标签） |

站点 `id` 必须为**单个 token**（如 `htmlpage`、`hola`），以便项目名 `{id}-{browser}` 与 reporter 解析一致；目录名约定为 **`tests-{id}`**。

---

## 3. 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `LAPUS_SITES` | 逗号分隔，只跑指定站点；未设置则跑注册表内全部激活站点 | `htmlpage` 或 `htmlpage,hola` |
| `LAPUS_BROWSERS` | 逗号分隔或 `all`；合法值：`chromium`、`firefox`、`webkit` | `chromium` |
| `LAPUS_BROWSER_CHANNEL` | 仅 Chromium：使用已安装的渠道浏览器 | `chrome`、`msedge`、`chrome-beta` 等 |
| `LAPUS_RUN_VERSION` | 可选，写入报告/ manifest 的运行版本标识 | 任意字符串 |
| `LAPUS_HEADED` | 设为 `1` / `true` / `yes` 时**有界面**跑浏览器（等价于 CLI `--headed`） | `1` |
| `LAPUS_WORKERS` | 并发 worker 数；设为 `1` 时**逐个用例**执行（适合本地盯浏览器） | `1` |
| `LAPUS_TERMINAL_REPORTER` | 终端进度样式：`list`（逐条打印，默认）、`line`（单行刷新）、`dot` | `list` |

Playwright CLI 仍可直接传 `--headed`、`--workers=1`；与上述环境变量二选一或组合均可（CLI 一般会覆盖 headed 等部分行为，以 Playwright 文档为准）。

Windows 下推荐通过 npm 脚本或 `cross-env` 设置变量（本仓库脚本已内置 `cross-env`）。

---

## 4. 常用命令

```bash
# 默认：registry 中所有站点 × 所选浏览器（见 LAPUS_BROWSERS）
npm test

# 只跑单站
npm run test:htmlpage
npm run test:hola

# htmlpage：有界面 + 单 worker + 终端逐条进度（等价：chromium + LAPUS_HEADED + LAPUS_WORKERS=1 + list）
npm run test:htmlpage:manual

# 只跑 Chromium（三引擎里最快、本地调试最稳）
npm run test:chromium

# Playwright UI 模式（挑选用例、调试）
npm run test:ui

# 打开最近一次生成的 Playwright HTML 报告（默认目录 ./playwright-report）
npm run report
```

**有界面 + 逐个用例 + 终端列出进度（参数可自行组合）**：

```bash
# 推荐：环境变量（跨平台）
npx cross-env LAPUS_SITES=htmlpage LAPUS_BROWSERS=chromium LAPUS_HEADED=1 LAPUS_WORKERS=1 LAPUS_TERMINAL_REPORTER=list playwright test

# 或 CLI（与上式等价 headed/workers）
npx cross-env LAPUS_SITES=htmlpage LAPUS_BROWSERS=chromium playwright test --headed --workers=1
```

只跑某一个文件 / 用例名时，在命令末尾追加 Playwright 参数，例如：

```bash
npm run test:htmlpage:manual -- tests-htmlpage/home.spec.ts
npm run test:htmlpage:manual -- --grep "首页"
```

**说明**：`cross-env` 之后只写**一个** `playwright` 子命令；不要把 `playwright` 写在 `cross-env` 前面。

---

## 5. 报告与产物

| 类型 | 位置 | 说明 |
|------|------|------|
| Playwright HTML | `playwright-report/` | `npm run report` 打开；**不应提交仓库** |
| 运行截图与 trace | `test-results/<站点id>/...` | 失败/附件等；**不应提交** |
| 按站点模块汇总 | `reports/<站点id>/latest/index.html` | 自定义 reporter 生成；**不应提交** |
| 全站汇总 | `reports/_all/` | 同上 |

每次运行的上下文摘要见 `test-results/run-manifest.json`（若 global setup 成功写入）。

---

## 6. 新增一个站点

1. 复制 `tests-htmlpage/`（或相近站点）为 `tests-<新id>/`。
2. 修改 `site.config.ts`（`id`、`baseURL`）与 `routes.ts`（路径与爬取范围）。
3. 按需增删改 `*.spec.ts`。
4. 在 `utils/registry.ts` 中 `import` 新站的 `site.config` 并把该配置对象加入 `allSites`。

---

## 7. 故障排查简要说明

- **大量超时 / 爬取用例失败**：先尝试 `LAPUS_BROWSERS=chromium` 与 `--workers=1`；确认本机网络可访问 `baseURL`。
- **Firefox / WebKit 与 Chromium 结果不一致**：部分站点对引擎或 TLS 行为不同，属预期差异时需在用例或路由上收窄断言范围。
- **Chromium 渠道**：设置 `LAPUS_BROWSER_CHANNEL` 前需已在系统中安装对应浏览器；非法值会被忽略，回退默认 Chromium。

---

## 8. 可选：运行版本标签

```bash
npm run tag:run
```

具体行为见 `scripts/tag-run.cjs`（用于给当前提交打与运行相关的 git 标签等）。

---

## 9. Git 与忽略项

以下目录/文件已在 `.gitignore` 中，**不要加入版本库**：`node_modules/`、`test-results/`、`playwright-report/`、`reports/`、`blob-report/`、`.env` 等。

提交时请只包含源码与配置（如 `utils/`、`tests-htmlpage/`、`tests-hola/`、`playwright.config.ts`、`package.json`、`README.md` 等），不包含上述生成物。
