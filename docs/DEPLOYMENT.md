# 独立部署与回滚

## 当前 GitHub Pages 发布方式

网站单独位于 `GloryPkqa/codex-netwatch-site`，推送 main 或手动触发 Deploy website 后，Actions 测试、构建并发布 dist/。将 Pages 来源设为 GitHub Actions，并在此仓库单独绑定 `netwatch.pkqa.top`。只添加 `netwatch` CNAME → `glorypkqa.github.io`（DNS only），保留原站所有其他记录。先绑定 Pages 自定义域，再添加 DNS；证书批准后开启 Enforce HTTPS。

构建使用短期工作流 GITHUB_TOKEN 读取公开 Latest，凭据不会进入网页。没有新增定时任务。GitHub Pages 不支持 `_headers` 自定义 HTTP 响应头，网页包含额外的 meta CSP；不得把本地预览服务器的所有安全响应头当成 Pages 线上行为。此站使用根路径资源，账号原 Pages 自定义域名可能影响默认项目路径，因此最终应验证独立子域名。

下面保留交接时的通用托管参考；GitHub Pages 以本节和实际工作流为准。

站点没有服务端、数据库或安装依赖；生产环境只需静态文件服务。

## 通用静态托管

建立一个单独的 `codex-netwatch-site` 项目，站点根目录指向 `dist/`。不要把它放入 pkqa.top 原项目的路由或发布目录。

- 构建命令：`node scripts/build.mjs`。
- 输出目录：`dist`。
- 运行环境：Node.js 22+（推荐 24 LTS）；无依赖安装步骤。也可直接上传已构建的 `dist/`。
- 默认入口：`index.html`，目录索引 `/zh-CN/` → `zh-CN/index.html`。
- **不要启用 SPA 全路径回写**。未知路径应返回真正的 404，提供 `404.html`。
- 支持 `_headers` 的托管环境可直接使用附带安全响应头。其他平台需按 `dist/_headers` 手动配置等价响应头。
- 本站根路径部署，不能直接挂在 `/tools/netwatch`。`SITE_URL` 控制 canonical、hreflang、Open Graph 与 sitemap 的 HTTPS 域名。
- 平台临时地址 QA 时请开启平台提供的隐私/禁止索引配置；正式域名使用成品 robots。临时地址仅用于部署检查，不要当成正式 canonical。
- 可缓存静态资源，但更新后应让 HTML、CSS 和 release.json 同时生效；建议 HTML 和 release.json 使用 `Cache-Control: no-cache`，当前素材也避免不可变长缓存，因为文件名不带内容 hash。

上传前保存上一个可用的构建包。在平台预览地址确认两种语言、图片与链接后再绑定正式子域。

## DNS 与 HTTPS

先查看 `netwatch.pkqa.top` 的现有记录，若存在则确认归属；新增/更新同名记录可能影响已有服务，不能未经检查覆盖。

| 部署环境 | 记录类型 | 主机名 | 记录值 |
| --- | --- | --- | --- |
| 平台静态托管 | CNAME | netwatch | 平台为这个独立项目实际分配的目标 |
| 独立服务器 | A（及有需要时 AAAA） | netwatch | 该独立虚拟主机所在服务器的实际公网 IP |

二选一，以托管商的自定义域名绑定说明为准；不要给同名主机同时放冲突的 CNAME 和 A。DNS 验证记录若由平台要求，应只添加它明确要求的验证记录。不要批量替换 DNS 区域，也不要更改 `@`、`www`、原站路由、重定向和默认站点。

在托管端绑定且只绑定 `netwatch.pkqa.top`，等待证书生效，确认 HTTPS 链与 HTTP 到 HTTPS 跳转。若原站环境不能隔离，改用独立静态托管项目，仍只给该子域增加一条目标记录。

## 独立服务器方案

`nginx.conf.example` 仅为可审阅模板，尚未安装或执行。将成品放在独立目录，例如 `/var/www/codex-netwatch/releases/<release-id>/`，让 `/var/www/codex-netwatch/current` 指向此次产物根目录（其中直接有 index.html）。在单独配置文件中建立精确 `server_name netwatch.pkqa.top`，补齐证书路径后检查配置，再重载服务。

禁止替换 `nginx.conf` 全局文件、默认站点配置或原站 server 块。不要为该站加入代理转发、本地控制器访问、数据库或登录组件。现有原站证书也不应被替换；为子域单独签发或使用现有明确覆盖此子域的证书。

## 发布后的实际验收

1. `https://netwatch.pkqa.top/` 与 `/zh-CN/` 返回 200，语言切换正确，title/description/canonical/hreflang 匹配。
2. HTTPS 有效，HTTP 正确跳转；未知路径返回 404；`sitemap.xml`、`robots.txt`、`assets/social-preview.png`、图标与 CSS 返回 200。
3. 在 360、768、1440 宽度检查无横向溢出，图片可点开原图，FAQ 可用键盘展开。
4. 开发者工具确认没有外部脚本、字体、统计、应用 API 或本地控制接口请求。该站无需 JavaScript。
5. 下载最终指向 GitHub Windows ZIP，非 Source code ZIP；SHA256SUMS 返回正确文件。若 release.json 是 fallback，按钮应进入 Releases 并显示回退文字，不能显示 undefined 或旧的固定版本号。
6. 分别检查仓库、Issues、中文说明、配置文档和许可证链接。
7. 只读访问 `https://pkqa.top/`，确认原首页仍正常；检查 DNS 变更记录只包含本子域。
8. 全部通过后，交回实际 URL；产品仓库 About Website 可指向此独立子域名。

## 更新版本信息

维护者每次正式发布后手动运行构建，发布新 `dist/`。Latest API 返回值缓存在生成页面与 `release.json` 中，每个访客不会调用 API；API 超时 10 秒。资产按完整文件名匹配，检查 HTTPS 和所属仓库。

API 失败不阻止页面构建，回退到 GitHub Releases 且版本显示“查看最新发行版”。不使用旧缓存伪装为当前最新版；网络恢复后重新构建即可自动恢复版本文字和直达下载。当前交付是否回退以 `dist/release.json` 为准。

已配置推送 main 和手动触发的 GitHub Actions。没有定时重建或跨仓库触发器。以后如增加定时任务，需单独说明调度、失败告警及取消方法。

## 回滚

- 托管平台：在此**独立项目**的部署历史中恢复上一个验证通过的版本，或重新上传保留的旧 `dist/`。确认英文、中文和下载入口。
- 服务器：将独立 `current` 指针切回之前的完整产物目录，执行该服务器的配置检查/必要重载；不要回滚整个服务器配置。
- 若需撤销上线：先撤销此站域名绑定和独立部署，只撤销本次新增且确认不再使用的 `netwatch` 记录及相关验证记录。保持根域、www 和原站完好。
