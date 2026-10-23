# Codex Netwatch 独立介绍站

独立网站仓库：`GloryPkqa/codex-netwatch-site`。目标域名 `https://netwatch.pkqa.top/`，使用 GitHub Pages 单独部署；访问状态以实际 DNS、证书和部署结果为准。原站 pkqa.top 的源码、导航与部署保持独立。

默认英文 `/`，完整中文 `/zh-CN/`。独立静态介绍与下载站，与 pkqa.top 原站的导航、登录、数据和后端没有集成。

## 当前产品定位

Codex Netwatch 是 Codex 的本地网络活动监控，同时支持直连与代理。Windows 原生采集通过经用户授权的 ETW 助手记录 TCP/UDP、IPv4/IPv6 及采样间关闭的短连接；Mihomo / Clash 兼容控制器是另一种可选来源，并非必需。

默认 Automatic 使用可用且已授权的原生助手，否则尝试 Mihomo；也可手动固定 Windows native 或 Mihomo。只有助手通过正常 UAC 提升，整个应用不提权。退出采集程序后授权结束，下次运行可再次授权；开机自启不会自动弹 UAC，不安装服务、驱动或计划任务。

同一采样不叠加 ETW 与代理计数。原生包括回环进程活动，目标显示 IP，不主动查询域名或收集通信正文。切换和丢事件留下缺口，历史可能包含不同统计口径，不补算离线流量。会话 GB、日志 token、网卡总流量和账单仍需区分。文案边界与依据见 [docs/NATIVE-CAPTURE.md](docs/NATIVE-CAPTURE.md)。


## 本地运行

需要 Node.js 22+，建议 Node.js 24 LTS。**没有第三方依赖，不需要安装步骤或 npm。**

```powershell
node scripts/build.mjs
node --test tests/release.test.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

打开 `http://127.0.0.1:4173/` 或 `http://127.0.0.1:4173/zh-CN/`。停止预览按 Ctrl+C。预览服务只监听本机，不是公开托管服务。因为使用站点根路径，请通过预览服务访问，不要双击 HTML 文件。

构建时访问 GitHub 公开 Latest API，10 秒超时。禁止访问网络的环境可用：

```powershell
node scripts/build.mjs --offline
```

API 限流、超时、无网络、数据无效、缺少 Windows ZIP 或校验文件时，生成完整页面，版本显示“View latest release / 查看最新版本”，下载和校验入口退回 Releases。不会复用旧版本号冒充 Latest。正常响应严格按文件名选择资产，下载使用稳定 `/releases/latest/download/codex-netwatch-windows-x64.zip`。

## 目录

- `src/page.mjs`：完整双语文案、HTML 模板、元信息。
- `src/style.css`：响应式样式、本地中文字体、键盘焦点与减少动态效果支持。
- `assets/`：英文原图、中文产品演示截图、图标和本地字体。
- `scripts/`：无依赖构建、发行信息解析、静态检查、本地预览。
- `tests/`：Latest 资产选择和异常回退测试。
- `dist/`：可以直接部署的静态成品，含双语页面、资源、SEO 文件、安全响应头与发行快照。
- `.github/workflows/deploy-pages.yml`：测试、构建和 GitHub Pages 发布。
- `docs/DEPLOYMENT.md`：独立项目部署、DNS、验证和回滚说明。
- `docs/nginx.conf.example`：仅针对子域名的虚拟主机示例。
- `docs/VALIDATION.md`：本轮原生采集定位更新的实际验证结果与历史记录。
- `docs/FONTS.md`：中文字体来源、许可证与子集维护方法。
- `docs/CHINESE-COPY.md`：中文页面的表达习惯、信息层次与润色边界。
- `docs/ENGLISH-COPY.md`：英文页面的表达习惯与润色边界。
- `docs/CHINESE-SCREENSHOTS.md`：中文演示截图的来源与采集模式。

## 更新与迁移

重新运行构建并替换部署产物即可更新版本标记。只在构建时读取 GitHub；浏览器没有 JS、API 请求、遥测、远程字体、Cookie 或本地控制接口连接。FAQ 使用原生 `<details>`，语言切换和原图查看均为普通链接。

推送 main 后，GitHub Actions 自动测试、构建并发布 dist/；也可手动触发 Deploy website。没有定时任务。构建步骤可使用短期 GITHUB_TOKEN 读取公开发行信息，凭据不会进入页面或产物。维护者发布新版本后可重新触发构建；稳定 Latest 下载链接会跟随 GitHub，但页面版本文字是构建时快照。

GitHub Pages 不会把 `_headers` 转成自定义 HTTP 响应头；网页额外包含 meta CSP，限制脚本、连接和外部资源。不要仅因存在 `_headers` 就声称线上具有全部自定义安全响应头。GitHub 基础设施可能保留自身安全访问日志。

变更域名时设置环境变量后构建：

```powershell
$env:SITE_URL = 'https://your-new-domain.example'
node scripts/build.mjs
```

仅接受 HTTPS origin，不能包含子路径、查询或认证信息。页面设计为独立域名根路径部署。

项目许可证见 `LICENSE`。本地 Noto Sans SC 字体遵循 SIL Open Font License 1.1，完整许可证随 `assets/fonts/OFL.txt` 交付。
