# htmlpage-playwright-tests

基于 Playwright 的 `https://htmlpage.cn` 自动化测试项目（功能测试 + 轻量性能基线）。

## 安装

```bash
cd htmlpage-playwright-tests
npm install
npx playwright install
```

或使用 `pnpm`：

```bash
cd htmlpage-playwright-tests
pnpm install
pnpm exec playwright install
```

## 运行测试

```bash
npm test
# 或
pnpm test
```

## 查看现代化 HTML 报告

```bash
npm run report
# 或
pnpm run report
```

执行后会打开 Playwright 自带的交互式测试报告，包含：

- 用例分组视图（按浏览器、测试文件）
- 失败用例的 trace / 截图 / 视频
- 控制台中输出的性能指标（首页加载时间、DOM Ready 等）

