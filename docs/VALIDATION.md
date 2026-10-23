# 网站验证记录

## 2026-10-23：直连与代理定位更新

本轮直接修改已发布网站仓库的现有工作树，未覆盖旧快照。英文仍为默认版本。更新范围为产品文案、FAQ、SEO、旧截图范围说明、中文字体与相关文档；没有修改应用源码、安装目录、DNS、账户、GitHub 设置或现有 Actions 配置。

| 检查 | 本轮实际结果 |
| --- | --- |
| 网站测试 | node --test tests/release.test.mjs：11 通过、0 失败、0 跳过；含精确 Windows ZIP/校验资产、回退和构建 token 不入产物的验证 |
| 正常构建 | 本地无认证 Latest API 返回 HTTP 403，产物按设计为 fallback，不把文档中的产品版本伪装为已验证 Latest。现有 Pages Actions 使用短期构建 token，发布结果需另行核对 |
| 静态检查 | 77 个链接/资源引用通过；双语元信息、锚点、图片尺寸、字体 hash 与汉字覆盖通过 |
| Pages 修复 | meta CSP 与 font-src self 保留，.nojekyll 存在；release/build、现有工作流及 OFL 未覆盖。静态检查补上本地字体 CSP 和 .nojekyll 回归检查 |
| 浏览器尺寸 | English / 简体中文各测 360、768、1440：内容与滚动宽度分别为 345/345、753/753、1425/1425，无横向溢出 |
| 图片与字体 | 六组检查中全部图片加载，字体状态 loaded；中文 533 码位子集，126,460 字节，OFL 继续随资源交付 |
| 原生内容 | Automatic 默认、授权后使用原生、Mihomo 可选、每次采样单来源、缺口不回填、IP 与回环范围均做产品文档交叉核对 |
| 语言与键盘 | 实际点击切换双语；两种语言的原生授权 FAQ 均用 Enter 展开，焦点轮廓为薄荷绿 3px |
| 原图 | 实际点击中文原图，打开 dashboard.zh-CN.jpg（1585×991）；旧图在文案、alt 和图注中明确为旧版 Mihomo 界面 |
| 无客户端脚本 | 六组 DOM 检查的 script 数均为 0；没有表单、遥测、外部字体或本地监控 API 连接 |

手机上另行查看了较长的使用步骤。页面截图保留为旧版界面说明，不作为原生直连的实测证据。提供的新图片没有展开设置，未用于证明授权按钮或采集结果。

这次只验证网站，不运行或授权产品的 ETW 助手，不重跑应用 CI 的 89 项测试，也不宣称完成应用 24/72 小时稳定性验证。发布完成与线上版本以本次会话最终报告为准。

## 历史记录（2026-10-22，非本轮结果）

以下原交接记录为历史材料。旧的引用数量、代理范围、图片说明、限流状态及未部署状态不能当作当前产品或本轮发布结论。

### 初次本地验证

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
