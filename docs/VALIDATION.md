# 本地验证记录

日期：2026-10-22（Asia/Shanghai）。范围：本地开发成品；没有执行线上部署、DNS 变更、HTTPS 签发或仓库 About 更新。

## 结果

| 检查 | 结果与证据 |
| --- | --- |
| 静态构建 | Node.js v24.19.0 构建成功；无安装依赖 |
| Latest API 实际失败 | 本环境返回 HTTP 403 rate limit exceeded；产物 `dist/release.json` 记录 fallback；两种语言均显示“查看最新发行版”，按钮进入 Releases |
| 正常 API 路径 | 自动测试使用合成正式版元数据验证；按完整 Windows ZIP 文件名选择，不取第一个资产；直达下载使用 Latest 稳定链接 |
| 异常路径 | 10 项测试全通过：缺 Windows ZIP、缺校验文件、无效字段、不可信 URL、draft/prerelease、403/404/429/500、网络错误、超时、坏 JSON、离线构建及请求超时信号 |
| 静态检查 | 两种语言共 74 个链接/资源引用通过；单个 H1、lang、title/description、canonical/hreflang、OG/Twitter、图片 alt/尺寸、本地资源存在、锚点有效 |
| HTTP 访问 | 主页、中文页、两张内容图、分享图、CSS、sitemap、robots、LICENSE、release.json 均 200；未知路径 404。见 `evidence/local-http.json` |
| 外部链接 | Windows ZIP、SHA256SUMS、仓库、Issues、配置文档、中文 README 均 HEAD 200；ZIP 和校验文件跳转到 GitHub 发布资产。见 `evidence/external-links.json` |
| 中英文切换 | 浏览器实际点击切换，双方页面内容完整，语言路由与 lang 正确 |
| 图片查看 | 浏览器实际点击中文“查看完整原图”，到达 `dashboard.png (2880×1658)` 原图页；内容图均完整保留，无裁切或改数 |
| 键盘与无页面脚本 | 英文、中文 FAQ 通过 Enter 展开；焦点轮廓实测薄荷绿 3px。页面 script 数量为 0，本地预览 CSP 的 script-src 与 connect-src 均为 none，限制下图片与原生交互正常 |
| 响应式 | 英文/中文 × 360/768/1440 全部通过。见下表及 `evidence/responsive.json`、六组 JPG 截图 |
| 内容与隔离 | 提供兼容控制器、快照漏计、会话 GB、日志 token、未签名 EXE、未完成长测、独立社区项目等边界。未访问监控数据库、会话日志或本地控制器；原附件图片不作修改 |

## 响应式测量

浏览器垂直滚动条占 15px；无溢出以 `scrollWidth === clientWidth` 判断。

| 语言 | 视口宽度 | 内容宽度 / 滚动宽度 | 横向溢出 |
| --- | --- | --- | --- |
| English | 360 | 345 / 345 | 无 |
| 简体中文 | 360 | 345 / 345 | 无 |
| English | 768 | 753 / 753 | 无 |
| 简体中文 | 768 | 753 / 753 | 无 |
| English | 1440 | 1425 / 1425 | 无 |
| 简体中文 | 1440 | 1425 / 1425 | 无 |

## JavaScript 与隐私

不是依赖客户端脚本渲染的站点：下载、翻译、FAQ、原图均使用原生 HTML，CSS 只负责外观。交付页面没有 script、iframe、表单、远程字体或统计 SDK。预览使用 `script-src 'none'; connect-src 'none'` 验证原生交互。未修改用户全局浏览器的 JavaScript 设置；这里验证的是页面禁止执行脚本时的可用性。

源码及静态检查确认产物中没有 localhost/127.0.0.1 地址，没有运行时 API 调用或代理连接。构建时 GitHub API 请求发生在构建环境；页面访问只加载本站资源，用户点击下载/文档后才跳转 GitHub。

## 图片与素材

`assets/dashboard.png`：2880×1658；`investigation.png`：1280×752；分享图：1200×630。两张界面图使用附件原文件，且异常排查图两种语言均明确标为合成演示。总览图下只保留产品/总览标签及原图链接，没有恢复任务书禁止的旧说明。

## 尚未验证的项目

- 实际域名 HTTPS、线上路由、CDN 缓存、平台安全响应头及线上分享抓取：待后续发布后验证。
- pkqa.top 原首页的部署后只读检查：待发布后执行；本会话没有修改原站。
- 实际 GitHub Latest API 成功读取：本次环境限流；成功路径由测试覆盖，未把模拟版本数据用于成品。
- 应用本身的 24/72 小时稳定性与 Windows 软件运行：不在介绍站开发范围，网站明确不作相关承诺。

## 重复验证

```powershell
node scripts/build.mjs
node --test tests/release.test.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

随后打开预览，按 `docs/DEPLOYMENT.md` 列表检查。`--offline` 可复现无网络构建。版本号不会写死在页面模板里；本次使用的测试版本号仅存在测试夹具中，不进入网页。
