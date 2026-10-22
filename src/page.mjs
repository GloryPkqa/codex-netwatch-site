import { REPOSITORY, LATEST } from '../scripts/release.mjs';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const downloadIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';
const copy = {
  en: {
    title: 'Codex Netwatch — See where your Codex network traffic goes',
    description: 'A local Windows dashboard for Codex traffic history, process attribution and connection troubleshooting. Requires a Mihomo / Clash-compatible local controller.',
    skip: 'Skip to content', nav: ['Overview', 'Features', 'Get started', 'FAQ'],
    eyebrow: 'LOCAL VISIBILITY. CLEARER ANSWERS.',
    headline: 'See where your Codex<br> network traffic <em>goes.</em>',
    intro: 'A local Windows dashboard for traffic history, process attribution, and connection troubleshooting.',
    download: 'Download for Windows', github: 'View on GitHub',
    requirement: 'Windows 10/11 x64 · Mihomo / Clash-compatible controller required',
    release: 'Latest release', fallback: 'View latest release',
    strip: ['Local-first', 'No app telemetry', 'MIT licensed'],
    previewLabel: '01 / THE OVERVIEW', previewTitle: 'Your network activity,<br>in one clear view.',
    previewText: 'Follow observed uploads and downloads, spot changes over time, and narrow the view to the period you need.',
    full: 'Open full-resolution image', dashboardAlt: 'Codex Netwatch dashboard showing observed traffic, a history chart and process rankings',
    featuresLabel: '02 / FOLLOW THE EVIDENCE', featuresTitle: 'From “how much?”<br>to “what happened?”',
    features: [
      ['Traffic over time', 'See observed upload and download totals, live rates and history. Filter a time range or export a CSV for a closer look.'],
      ['Processes with context', 'Identify Codex and its child processes using process evidence. Compare with other proxy applications when you need context.'],
      ['Connections that explain', 'Inspect destinations and connection activity. Find upload or download bursts, sustained uploads and collection gaps.'],
      ['A separate activity trail', 'Use session activity and local-log token counts as troubleshooting clues, alongside network observations.'],
    ],
    investigationLabel: 'LOOK A LITTLE CLOSER', investigationTitle: 'Give unusual traffic<br>a starting point.',
    investigationText: 'Move from a spike in the chart to connection destinations and process evidence. Keep session activity in context without treating it as a precise traffic allocation.',
    demo: 'DEMO VIEW · SYNTHETIC DATA', investigationAlt: 'Synthetic demo of the investigation view with traffic events and connection evidence',
    localTitle: 'Stays on your machine.', localText: 'Local SQLite storage and local interface resources. No app telemetry. Use the Windows desktop window, keep collecting in the tray, or open the local browser interface. English and Chinese are supported; English is the default.',
    stepsLabel: '03 / GET STARTED', stepsTitle: 'Three steps to a clearer picture.',
    steps: [
      ['Download & extract', 'Get the Windows x64 portable ZIP and SHA256SUMS.txt from the same release. Verify the checksum, then extract the entire archive into a writable folder.'],
      ['Start your tools', 'Run a compatible proxy and Codex, then open Codex-Netwatch.exe. The portable package includes Node.js.'],
      ['Check, then make a request', 'Follow Connection help, send a new Codex request and wait for two samples. Existing connections establish a baseline first; only new traffic is counted.'],
    ],
    config: 'Configuration & troubleshooting', checksum: 'SHA-256 checksums',
    compatibility: 'Before you download', requirements: 'Windows 10/11 x64, .NET Framework 4.8 and Microsoft Edge WebView2 Runtime are required. The Windows EXE is currently unsigned. Verify the downloaded ZIP against the release checksum file.',
    limit: 'What the numbers mean', limits: 'Bytes come from controller connection snapshots. Direct traffic that bypasses the controller is invisible. Short connections and final bytes before closing may be missed. These totals are not network-adapter traffic or a VPN bill. Long-running 24/72-hour validation has not been completed.',
    faqLabel: '04 / GOOD TO KNOW', faqTitle: 'A few things, made clear.',
    faqs: [
      ['Will it work with my proxy or VPN?', 'Network collection needs a running Mihomo / Clash-compatible local controller. Not every VPN or proxy client exposes a compatible controller. Use the controller port, not the HTTP / SOCKS proxy port; check the configuration guide for details.'],
      ['Why is the traffic showing zero?', 'Check Connection help for controller reachability, the secret and response compatibility. Make sure Codex traffic passes through that controller and has process evidence. Then generate a new request and wait for two samples. Connecting or reconnecting first establishes a baseline; offline traffic is not backfilled.'],
      ['Does closing the window stop collection?', 'Closing the desktop window keeps collection running in the tray. Double-click the tray icon to reopen it. Use Exit in the tray menu to stop it fully. Start at login is optional and off by default.'],
      ['Does it upload my chats?', 'The app has no telemetry and stores observations locally. Its local database includes destinations, process identities, session metadata, tokens and activity times; it does not persist chat bodies, tool content, command lines or credentials. Keep your database, configuration and raw CSV private. This website is a static introduction and does not connect to your local monitor.'],
      ['Can it measure exact GB for each conversation?', 'No. Shared processes and connections cannot be split precisely into per-session GB. Session activity is a separate investigation clue, not proof of byte attribution.'],
      ['Are tokens my subscription balance or bill?', 'No. Token counts come from local logs. They cannot be converted to GB, remaining subscription allowance, a bill or official billed usage.'],
    ],
    downloadLabel: 'OPEN SOURCE / READY WHEN YOU ARE', downloadTitle: 'Make your traffic<br>a little less mysterious.',
    downloadText: 'A portable dashboard. A local view. The evidence to investigate.',
    notes: 'Release notes', issues: 'Report an issue', docs: 'Documentation', readme: '中文说明', source: 'Source code', license: 'MIT license',
    independent: 'An independent community project by GloryPkqa. Not an official OpenAI or MetaCubeX product.',
    fallbackNote: 'Downloads and checksums are available on GitHub Releases. Open the latest release to choose the Windows x64 ZIP.',
  },
  'zh-CN': {
    title: 'Codex Netwatch — 看清 Codex 的网络开销',
    description: '在本机查看 Codex 流量趋势、进程归属和连接去向。适用于 Windows，需要 Mihomo / Clash 兼容的本地控制接口。',
    skip: '跳至正文', nav: ['界面概览', '核心功能', '开始使用', '常见问题'],
    eyebrow: '在本机观察，让问题更清楚。', headline: '看清 Codex 的<br><em>网络开销。</em>',
    intro: '在本机查看流量趋势、进程归属和连接去向，找到异常上传与下载。',
    download: '下载 Windows 版', github: '在 GitHub 查看',
    requirement: 'Windows 10/11 x64 · 需要 Mihomo / Clash 兼容控制接口',
    release: '最新正式版', fallback: '查看最新发行版', strip: ['数据本地存储', '无应用遥测', 'MIT 开源许可'],
    previewLabel: '01 / 界面概览', previewTitle: '网络活动，<br>一眼看清。',
    previewText: '查看已观测的上传与下载，沿着历史趋势找到变化，再聚焦到你关心的时间段。',
    full: '查看完整原图', dashboardAlt: 'Codex Netwatch 总览界面，展示已观测流量、历史趋势和进程排行',
    featuresLabel: '02 / 顺着线索排查', featuresTitle: '从「用了多少」<br>到「发生了什么」。',
    features: [
      ['流量如何变化', '查看已观测上传、下载、实时速率与历史趋势。按时间筛选，或导出 CSV 进一步分析。'],
      ['哪个进程在用', '根据进程证据识别 Codex 及其子进程，默认查看 Codex 排行，也可对照其他代理程序。'],
      ['连接去了哪里', '查看目标地址与连接活动，寻找突发上传、下载、持续上传，以及采集缺口。'],
      ['多一条活动线索', '将会话活动与本地日志 token 计数作为独立线索，辅助排查网络观测中的变化。'],
    ],
    investigationLabel: '再看近一点', investigationTitle: '给异常流量，<br>一个排查起点。',
    investigationText: '从趋势中的突变，追到连接去向和进程证据。结合会话活动理解上下文，同时保留统计边界。',
    demo: '演示视图 · 合成数据', investigationAlt: '使用合成数据的异常排查演示，展示流量事件与连接证据',
    localTitle: '留在你的电脑里。', localText: '使用本地 SQLite 存储与本地界面资源，无应用遥测。支持桌面窗口、托盘后台采集和本地浏览器入口，可选开机自启。支持英文与中文，默认英文。',
    stepsLabel: '03 / 开始使用', stepsTitle: '三步，开始看清网络活动。',
    steps: [
      ['下载，完整解压', '从同一个发行版取得 Windows x64 便携 ZIP 和 SHA256SUMS.txt。核对 SHA-256 后，将整个压缩包解压到可写目录。'],
      ['运行代理与程序', '启动兼容代理和 Codex，再运行 Codex-Netwatch.exe。便携包已内置 Node.js。'],
      ['检查连接，产生新请求', '按「连接帮助」检查状态，在 Codex 中发送新请求并等待两次采样。已有连接先建立基线，再累计新增流量。'],
    ],
    config: '配置与排错说明', checksum: 'SHA-256 校验文件',
    compatibility: '下载前确认', requirements: '需要 Windows 10/11 x64、.NET Framework 4.8 和 Microsoft Edge WebView2 Runtime。目前 Windows EXE 未签名，请使用发行版中的校验文件核对下载的 ZIP。',
    limit: '数字代表什么', limits: '字节来自控制器连接快照。绕过控制器的直连流量不可见，短连接及关闭前的尾部字节可能漏计。统计不等于网卡流量或 VPN 账单。尚未完成 24/72 小时长时间验证。',
    faqLabel: '04 / 使用之前', faqTitle: '这些问题，先说清楚。',
    faqs: [
      ['我的代理或 VPN 能用吗？', '网络采集需要运行中的 Mihomo / Clash 兼容本地控制接口，并非所有 VPN 或代理客户端都支持。应填写控制接口端口，而非 HTTP / SOCKS 代理端口。具体配置见配置与排错说明。'],
      ['为什么显示流量为零？', '先在「连接帮助」中检查接口连接、密钥和响应兼容性。确认 Codex 流量经过该控制器，且具有进程证据。然后产生新请求并等待两次采样。首次连接或重连先建立基线，不补算离线流量。'],
      ['关闭窗口还会继续采集吗？', '会。关闭桌面窗口后，程序继续在托盘采集；双击托盘图标重新打开。完全停止请使用托盘菜单的「退出」。开机自启可按需开启，默认关闭。'],
      ['会上传我的聊天吗？', '应用无遥测，观测数据存储在本机。数据库包含目标地址、进程身份、会话元数据、token 和活动时间；不持久化聊天正文、工具内容、命令行或凭据。请勿公开数据库、本地配置和原始 CSV。本介绍站是静态页面，不连接你的本地监控程序。'],
      ['能精确统计每个会话的 GB 吗？', '不能。共享进程与连接无法精确拆成各会话的 GB。会话活动是一条独立排查线索，不能作为网络字节归属的证明。'],
      ['token 就是订阅剩余额度或账单吗？', '不是。token 来自本地日志，不能换算为 GB、订阅剩余额度、账单或官方计费用量。'],
    ],
    downloadLabel: '开源，随时开始', downloadTitle: '让网络开销，<br>少一点不明所以。',
    downloadText: '便携的工具，本机的视角，排查所需的线索。',
    notes: '发行说明', issues: '反馈问题', docs: '配置文档', readme: '中文说明', source: '项目源码', license: 'MIT 许可证',
    independent: '由 GloryPkqa 维护的独立社区项目。不是 OpenAI 或 MetaCubeX 官方产品。',
    fallbackNote: '下载与校验文件位于 GitHub Releases。请打开最新发行版，选择 Windows x64 ZIP。',
  },
};

export function renderPage({ lang, origin, release }) {
  const c = copy[lang], zh = lang === 'zh-CN';
  const route = zh ? '/zh-CN/' : '/';
  const link = (url, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}">${text}</a>`;
  const download = () => link(release.downloadUrl, `${downloadIcon}${c.download}${arrow}`, 'button primary');
  const navIds = ['overview', 'features', 'start', 'faq'];
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self'; img-src 'self'; script-src 'none'; connect-src 'none'; font-src 'self'; base-uri 'none'; form-action 'none'">
  <title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}">
  <meta name="theme-color" content="#101315"><meta name="color-scheme" content="dark">
  <link rel="canonical" href="${origin}${route}">
  <link rel="alternate" hreflang="en" href="${origin}/"><link rel="alternate" hreflang="zh-CN" href="${origin}/zh-CN/"><link rel="alternate" hreflang="x-default" href="${origin}/">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Codex Netwatch"><meta property="og:title" content="${esc(c.title)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:url" content="${origin}${route}"><meta property="og:locale" content="${zh ? 'zh_CN' : 'en_US'}"><meta property="og:locale:alternate" content="${zh ? 'en_US' : 'zh_CN'}"><meta property="og:image" content="${origin}/assets/social-preview.png"><meta property="og:image:alt" content="Codex Netwatch">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(c.title)}"><meta name="twitter:description" content="${esc(c.description)}"><meta name="twitter:image" content="${origin}/assets/social-preview.png"><meta name="twitter:image:alt" content="Codex Netwatch">
  <link rel="icon" href="/assets/icon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css">
</head>
<body>
<a class="skip" href="#main">${c.skip}</a>
<header class="header container">
  <a class="brand" href="${route}" aria-label="Codex Netwatch ${zh ? '首页' : 'home'}"><img src="/assets/icon.svg" width="30" height="30" alt="">Codex <span>Netwatch</span></a>
  <nav class="main-nav" aria-label="${zh ? '主导航' : 'Main navigation'}">${c.nav.map((item, i) => link('#' + navIds[i], item)).join('')}</nav>
  <nav class="languages" aria-label="${zh ? '切换语言' : 'Language'}"><a href="/" lang="en" hreflang="en"${zh ? '' : ' aria-current="page"'}>English</a><span aria-hidden="true">/</span><a href="/zh-CN/" lang="zh-CN" hreflang="zh-CN"${zh ? ' aria-current="page"' : ''}>简体中文</a></nav>
</header>
<main id="main">
  <section class="hero container" aria-labelledby="hero-title">
    <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${c.eyebrow}</p>
    <h1 id="hero-title">${c.headline}</h1>
    <div class="hero-bottom"><div><p class="intro">${c.intro}</p><div class="actions">${download()}${link(REPOSITORY, `${c.github} ${arrow}`, 'button secondary')}</div><p class="requirement">${c.requirement}</p></div><div class="release-label"><span>${c.release}</span>${link(LATEST, release.version ? esc(release.version) + ' ↗' : c.fallback + ' ↗')}</div></div>
    <div class="trust-strip">${c.strip.map(s => `<span><span aria-hidden="true">✓</span> ${s}</span>`).join('')}<span class="strip-tail">CODEX NETWATCH / WINDOWS</span></div>
  </section>
  <section id="overview" class="container section overview" aria-labelledby="overview-title">
    <div class="section-heading"><div><p class="eyebrow">${c.previewLabel}</p><h2 id="overview-title">${c.previewTitle}</h2></div><p>${c.previewText}</p></div>
    <figure class="dashboard"><a class="image-link" href="/assets/dashboard.png" aria-label="${c.full}"><img src="/assets/dashboard.png" alt="${c.dashboardAlt}" width="2880" height="1658" fetchpriority="high"></a><figcaption><span class="figure-name">CODEX NETWATCH <span aria-hidden="true">/</span> ${zh ? '总览' : 'OVERVIEW'}</span>${link('/assets/dashboard.png', `${c.full} ${arrow}`)}</figcaption></figure>
  </section>
  <section id="features" class="container section" aria-labelledby="features-title"><p class="eyebrow">${c.featuresLabel}</p><h2 id="features-title">${c.featuresTitle}</h2><div class="feature-grid">${c.features.map(([title, text], i) => `<article class="feature"><span class="feature-number">0${i + 1}<span aria-hidden="true"> /</span></span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
  <section class="container section investigation" aria-labelledby="investigation-title"><div class="investigation-copy"><p class="eyebrow">${c.investigationLabel}</p><h2 id="investigation-title">${c.investigationTitle}</h2><p>${c.investigationText}</p>${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', `${c.config} ${arrow}`, 'text-link')}</div><figure><div class="demo-label"><span class="status-dot" aria-hidden="true"></span>${c.demo}</div><a class="image-link" href="/assets/investigation.png" aria-label="${c.full}"><img src="/assets/investigation.png" alt="${c.investigationAlt}" width="1280" height="752" loading="lazy"></a></figure></section>
  <aside class="container local-note"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="12" width="22" height="16" rx="3"/><path d="M10 12V9a6 6 0 0 1 12 0v3m-6 6v5"/></svg><div><h3>${c.localTitle}</h3><p>${c.localText}</p></div><span class="local-mark" aria-hidden="true">ON YOUR MACHINE.</span></aside>
  <section id="start" class="container section" aria-labelledby="start-title"><p class="eyebrow">${c.stepsLabel}</p><h2 id="start-title">${c.stepsTitle}</h2><ol class="steps">${c.steps.map(([title, text], i) => `<li><span class="step-index" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><div class="start-links">${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', `${c.config} ${arrow}`)}${link(release.checksumUrl, `${c.checksum} ${arrow}`)}</div><div class="boundaries"><div><h3>${c.compatibility}</h3><p>${c.requirements}</p></div><div><h3>${c.limit}</h3><p>${c.limits}</p></div></div></section>
  <section id="faq" class="container section faq" aria-labelledby="faq-title"><div><p class="eyebrow">${c.faqLabel}</p><h2 id="faq-title">${c.faqTitle}</h2></div><div class="questions">${c.faqs.map(([q,a]) => `<details><summary>${q}<span class="plus" aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div></section>
  <section id="download" class="download-section" aria-labelledby="download-title"><div class="container download-inner"><p class="eyebrow">${c.downloadLabel}</p><h2 id="download-title">${c.downloadTitle}</h2><p>${c.downloadText}</p><div class="actions">${download()}${link(LATEST, `${c.notes} ${arrow}`, 'button secondary')}</div><p class="download-meta">${release.version ? esc(release.version) : c.fallback} <span aria-hidden="true">·</span> Windows x64 <span aria-hidden="true">·</span> MIT</p>${release.status === 'fallback' ? `<p class="fallback-note">${c.fallbackNote}</p>` : ''}<div class="download-links">${link(release.checksumUrl, c.checksum)}${link(REPOSITORY + '/issues', c.issues)}${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', c.docs)}${link(REPOSITORY + '/blob/main/README.zh-CN.md', c.readme)}</div></div></section>
</main>
<footer class="container footer"><div class="footer-top"><a class="brand" href="${route}"><img src="/assets/icon.svg" alt="" width="26" height="26">Codex <span>Netwatch</span></a><div>${link('https://github.com/GloryPkqa', 'GloryPkqa')}${link(REPOSITORY, 'GitHub')}${link('/LICENSE', c.license)}</div></div><p>${c.independent}</p></footer>
</body></html>\n`;
}
