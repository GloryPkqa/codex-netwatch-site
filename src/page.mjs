import { REPOSITORY, LATEST } from '../scripts/release.mjs';
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const downloadIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>';
const featureIcons = [
  '<path d="M4 18V6m0 12h16M7 13l4-5 4 3 5-7"/>',
  '<rect x="8" y="3" width="8" height="6" rx="2"/><rect x="2" y="15" width="8" height="6" rx="2"/><rect x="14" y="15" width="8" height="6" rx="2"/><path d="M12 9v3H6v3m6-3h6v3"/>',
  '<circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><path d="M8 12h3l5-7m-5 7 5 7"/>',
  '<rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 7h6M9 11h6m-6 4h3"/>',
].map(paths => `<svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`);
const zoomIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M15 4h5v5M20 4l-7 7M9 20H4v-5m0 5 7-7"/></svg>';
const copy = {
  en: {
    title: "Codex Netwatch — Local network activity, with or without a proxy",
    description: "Monitor Codex network activity locally on Windows. Capture direct TCP/UDP traffic with an authorized native helper, or use a Mihomo-compatible controller.",
    skip: 'Skip to content', nav: ['Overview', 'Features', 'Get started', 'FAQ'],
    eyebrow: "LOCAL NETWORK ACTIVITY / DIRECT + PROXY",
    headline: "See your Codex<br> network <em>activity.</em>",
    intro: "Monitor Codex network activity locally, with or without a proxy. See traffic history, processes and destinations in one place.",
    download: 'Download for Windows', github: 'View on GitHub',
    requirement: "Windows 10/11 x64 · Native capture needs Windows authorization · Proxy optional",
    release: 'Latest release', fallback: 'View latest release',
    strip: ['Local-first', 'No app telemetry', 'MIT licensed'],
    previewLabel: '01 / THE OVERVIEW', previewTitle: 'Your traffic. A clearer picture.',
    previewText: "Follow recorded uploads, downloads and history. Narrow a time range or export a CSV for a closer look. The image shows an earlier Mihomo interface.",
    full: 'Open full-resolution image', dashboardAlt: "Earlier Codex Netwatch Mihomo dashboard with traffic history and process rankings; not a native-capture measurement",
    featuresLabel: '02 / FOLLOW THE EVIDENCE', featuresTitle: 'From “how much?”<br>to “what happened?”',
    features: [
  [
    "Direct, or through a proxy",
    "Windows native capture covers TCP/UDP, IPv4/IPv6 and connections that close between polls. A Mihomo-compatible controller remains an alternative."
  ],
  [
    "Processes with evidence",
    "Identify Codex and its children only when process evidence supports the attribution. Compare other observed processes without including unknown ownership in Codex totals."
  ],
  [
    "Connections in context",
    "Inspect destinations, bursts, sustained uploads and collection gaps. Native capture shows destination IPs without looking up domains."
  ],
  [
    "A separate activity trail",
    "Compare session activity and local-log token counts with network history. They remain independent clues, not a way to divide bytes between conversations."
  ]
],
    investigationLabel: 'LOOK A LITTLE CLOSER', investigationTitle: 'Give unusual traffic<br>a starting point.',
    investigationText: "Start with a change in the chart, then inspect destinations and process evidence. Check the active source: native events and Mihomo snapshots measure traffic differently, and source changes remain visible as gaps.",
    demo: "EARLIER MIHOMO DEMO · SYNTHETIC DATA", investigationAlt: "Earlier synthetic Mihomo investigation demo; not evidence of native direct-traffic capture",
    localTitle: 'Stays on your machine.', localText: 'Local SQLite storage and local interface resources. No app telemetry. Use the Windows desktop window, keep collecting in the tray, or open the local browser interface. English and Chinese are supported; English is the default.',
    stepsLabel: '03 / GET STARTED', stepsTitle: "Open Netwatch. Choose how to capture.",
    steps: [
  [
    "Download & extract",
    "Get the Windows x64 ZIP and SHA256SUMS.txt from the same release. Verify the checksum, then extract the entire archive into a writable folder."
  ],
  [
    "Open Settings & choose a source",
    "Run Codex-Netwatch.exe and Codex. Automatic is the default: it uses an available authorized native helper, otherwise tries Mihomo. You can also select Windows native or Mihomo explicitly."
  ],
  [
    "Authorize, then make a request",
    "For direct capture, click Authorize native capture and approve the Windows administrator prompt each run. For Mihomo, check Connection help. Send a new Codex request; collection records new activity, with a baseline on Mihomo attach."
  ]
],
    config: 'Configuration & troubleshooting', checksum: 'SHA-256 checksums',
    compatibility: 'Before you download', requirements: "Requires Windows 10/11 x64, .NET Framework 4.8 and Microsoft Edge WebView2 Runtime. The portable ZIP includes Node.js and the native helper. The Windows EXE is unsigned; verify the ZIP against the release checksums. A proxy is optional.",
    limit: 'What the numbers mean', limits: "Native capture records ETW process network events, including loopback and short connections. Mihomo uses controller snapshots and can miss short connections or final bytes. Only one source is used per sample. Source changes and event loss leave gaps; offline traffic is not backfilled, and history can mix measurement methods. These are not network-adapter totals or a VPN bill. Continuous 24/72-hour validation is not complete.",
    faqLabel: '04 / GOOD TO KNOW', faqTitle: 'A few things, made clear.',
    faqs: [
  [
    "Do I need a proxy or VPN?",
    "No. Windows native capture can record direct TCP/UDP traffic after you authorize the helper. If you prefer proxy capture, use a running Mihomo / Clash-compatible local controller. Not every VPN exposes one; use its controller port, not the HTTP / SOCKS proxy port."
  ],
  [
    "How does Automatic choose a source?",
    "Automatic is the default. It uses an available, authorized Windows native helper; otherwise it tries Mihomo. You can select either source explicitly in Settings. A sample uses one source, never ETW plus proxy totals. Source changes and lost events leave gaps, so a historical range may contain different measurement methods."
  ],
  [
    "What does native authorization change?",
    "Click Authorize native capture to open the normal Windows administrator prompt. Only the capture helper is elevated; the dashboard and session reader are not. Authorization ends when the collector exits and may be granted again next run. Startup at sign-in and background retries do not automatically prompt for elevation. Netwatch installs no service, driver or scheduled task and does not bypass Windows security confirmation."
  ],
  [
    "Why is the traffic showing zero?",
    "Check the active source in Settings and Connection help. Native mode needs a running authorized helper and reliable process evidence. In Mihomo mode, check the controller address, secret, response compatibility and whether Codex uses that proxy. Generate a new Codex request. Mihomo first establishes a baseline on attach or reconnect; missing events and offline traffic are not reconstructed."
  ],
  [
    "Are these internet or VPN traffic totals?",
    "No. Native capture includes process loopback/socket I/O, including local proxy or inter-process connections. The all-process comparison may include both ends of a local connection. Mihomo sees only its controller coverage. Neither source is an exact network-adapter total, internet bill or encrypted VPN wire-byte measurement."
  ],
  [
    "Does closing the window stop collection?",
    "Closing the window keeps the collector running in the tray, including an already authorized helper. Double-click the tray icon to reopen it; choose Exit to stop it fully and end native authorization. Start at login is optional and off by default."
  ],
  [
    "Does it inspect or upload my chats?",
    "No application telemetry is sent. Native capture records process network events and destination IPs; it does not collect communication bodies, decrypt TLS or actively look up domains. Observations stay local. The database includes destinations, process identities, session metadata, tokens and activity times, but not chat bodies, tool content, command lines or credentials. Keep the database, configuration and raw CSV private. This static website does not connect to your monitor."
  ],
  [
    "Can it measure exact GB for each conversation?",
    "No. Shared processes and connections cannot be split precisely into per-session GB. Session activity is a separate troubleshooting clue, not proof that a conversation owns particular bytes."
  ],
  [
    "Are tokens my subscription balance or bill?",
    "No. Token counts come from local logs and are independent of network bytes. They cannot be converted to GB, remaining subscription allowance, a bill or official billed usage."
  ]
],
    downloadLabel: 'OPEN SOURCE / READY WHEN YOU ARE', downloadTitle: 'Make your traffic<br>a little less mysterious.',
    downloadText: "Start Netwatch, choose a capture source and use Codex as usual. Keep a local history to return to when something changes.",
    notes: 'Release notes', issues: 'Report an issue', docs: 'Documentation', readme: '中文说明', source: 'Source code', license: 'MIT license',
    independent: 'An independent community project by GloryPkqa. Not an official OpenAI or MetaCubeX product.',
    fallbackNote: 'Downloads and checksums are available on GitHub Releases. Open the latest release to choose the Windows x64 ZIP.',
  },
  'zh-CN': {
    title: "Codex Netwatch — 在本机看清 Codex 的网络活动，支持直连与代理",
    description: "在 Windows 本机查看 Codex 的上传下载、进程和连接。授权 Windows 原生助手即可采集直连 TCP/UDP，也可使用 Mihomo 兼容控制接口。",
    skip: '跳至正文', nav: ['界面概览', '核心功能', '开始使用', '常见问题'],
    eyebrow: "直连或代理，按你的用法来", headline: "看清 Codex 的<br><em>网络活动。</em>",
    intro: "直连也好，走代理也好，都可以在本机查看。把上传下载、进程和连接放到一起，排查时少一点猜测。",
    download: '下载 Windows 版', github: '看看项目源码',
    requirement: "Windows 10/11 x64 · 原生采集需 Windows 授权 · 代理可选",
    release: '最新正式版', fallback: '查看最新版本', strip: ['数据留在本机', '无遥测', 'MIT 开源'],
    previewLabel: '01 / 先看一眼', previewTitle: '上传、下载和趋势，一页看清。',
    previewText: "先看上传、下载和变化趋势，再缩小时间范围，或导出 CSV 继续分析。下图保留的是旧版 Mihomo 界面。",
    full: '查看完整原图', dashboardAlt: "Codex Netwatch 旧版 Mihomo 中文总览，使用合成数据展示流量历史和进程排行，并非原生直连实测",
    featuresLabel: '02 / 能帮你看什么', featuresTitle: '想知道的，<br>不只是用了多少流量。',
    features: [
  [
    "直连、代理都能看",
    "不走代理时，用 Windows 原生采集看 TCP/UDP、IPv4/IPv6 和采样间关闭的短连接；也可以接入 Mihomo，沿用现有代理。"
  ],
  [
    "哪个进程在用",
    "有可靠进程证据，才把流量归到 Codex 和它的子进程。需要对比时，也能查看其他已观测进程；归属不明的流量不会混进 Codex 总量。"
  ],
  [
    "连接去了哪里",
    "查看目标地址，找到突发上传、下载和持续上传的时段。原生模式显示目标 IP，不主动查询域名；采集空档也会留下记录。"
  ],
  [
    "当时在做什么",
    "对照会话活动和本地日志里的 token 计数，回看当时的情况。它们与网络字节各自独立，不能用来精确分摊每段对话的流量。"
  ]
],
    investigationLabel: '发现变化之后', investigationTitle: '发现一次突增，<br>就从这里查起。',
    investigationText: "先找到流量变化的时段，再看目标地址和进程记录。排查时也看看当前采集来源：原生事件与 Mihomo 快照的统计口径不同，切换留下的缺口会保留。",
    demo: "旧版 Mihomo 排查界面 · 合成演示", investigationAlt: "旧版 Mihomo 异常排查界面的合成演示，并非 Windows 原生直连实测",
    localTitle: '这些记录，留在你的电脑上。', localText: '采集记录保存在本机，应用没有遥测。关掉窗口后，也可以留在托盘继续记录；需要时再打开看。支持桌面窗口和本地浏览器，界面可选中英文，首次启动默认英文。',
    stepsLabel: '03 / 开始使用', stepsTitle: "打开 Netwatch，选一种采集方式。",
    steps: [
  [
    "下载后，完整解压",
    "在同一个版本下下载 Windows x64 ZIP 和 SHA256SUMS.txt。核对 SHA-256 后，把整个压缩包解压到有写入权限的文件夹。"
  ],
  [
    "打开设置，选择来源",
    "运行 Codex-Netwatch.exe 和 Codex。默认「自动」会优先使用可用且已授权的原生助手，否则尝试 Mihomo；也可以手动选定「Windows 原生」或「Mihomo」。"
  ],
  [
    "授权后，发一条请求",
    "看直连流量时，点击「授权原生采集」，按 Windows 管理员提示完成本次授权。使用 Mihomo 则先检查「连接帮助」。再向 Codex 发一条新请求，查看新增活动；Mihomo 首次接入会先记下初始值。"
  ]
],
    config: '查看配置与排错说明', checksum: 'SHA-256 校验文件',
    compatibility: '下载前，确认这几项', requirements: "需要 Windows 10/11 x64、.NET Framework 4.8 和 Microsoft Edge WebView2 Runtime。便携包已带上 Node.js 与原生助手，代理不是必需项。目前 Windows 程序还没有数字签名，请用同一版本的校验文件核对 ZIP。",
    limit: '看数字前，先了解统计范围', limits: "原生采集记录 ETW 进程网络事件，包含回环活动和采样间关闭的短连接；Mihomo 根据控制器快照统计，短连接及关闭前的流量可能漏记。每次采样只用一种来源，不叠加两边的计数。切换来源或丢失事件会留下缺口，离线流量不会补算，历史也可能包含不同统计口径。这些数字不是网卡总流量或 VPN 账单。连续运行 24 / 72 小时的验证仍未完成。",
    faqLabel: '04 / 你可能还想知道', faqTitle: '遇到问题，<br>先看看这里。',
    faqs: [
  [
    "一定要开代理或 VPN 吗？",
    "不用。授权 Windows 原生助手后，可以直接采集 TCP/UDP 网络活动，不需要代理或控制器。如果习惯走代理，也可以选择 Mihomo / Clash 兼容的本地控制接口。并不是所有 VPN 都提供这种接口；配置时填控制接口端口，别填成 HTTP / SOCKS 代理端口。"
  ],
  [
    "「自动」会怎么选？会重复算流量吗？",
    "默认「自动」会使用可用且已授权的 Windows 原生助手，否则尝试 Mihomo；设置里也能手动固定其中一种。一次采样只用一个来源，不会把 ETW 和代理流量相加。切换或丢失事件会留下缺口，同一段历史里也可能包含不同来源的统计。"
  ],
  [
    "原生采集为什么要授权？每次都要吗？",
    "点击「授权原生采集」后，Windows 会弹出正常的管理员确认。只提升采集助手，看板和会话读取部分不会提权。退出采集程序后，这次授权就结束了，下次运行可再次授权。开机自启和后台重试不会自行弹出 UAC；程序不安装服务、驱动或计划任务，也不绕过系统安全确认。"
  ],
  [
    "为什么流量还是 0？",
    "先看设置和「连接帮助」里的实际采集来源。原生模式要有已授权且正在运行的助手，也要能可靠识别对应进程；Mihomo 模式则检查地址、密钥、接口响应，以及 Codex 是否经过这个代理。再发一条新请求。Mihomo 刚连接或重连时会先记初始值，丢失的事件和离线流量不会补算。"
  ],
  [
    "这些数字就是上网流量或 VPN 账单吗？",
    "不是。原生采集包含进程的回环和套接字活动，连向本地代理、进程之间的通信也可能在内；全进程对照还可能包含本地连接的两端。Mihomo 只看到控制接口覆盖的部分。两种方式都不能当作精确的网卡总流量、互联网账单或 VPN 加密后的传输字节。"
  ],
  [
    "关掉窗口，还会继续记录吗？",
    "会，程序会留在系统托盘，采集和已经授权的助手继续运行。双击托盘图标就能打开；想彻底停止时，在托盘菜单里选「退出」，原生授权也随之结束。开机自启默认关闭，可以按需要开启。"
  ],
  [
    "会查看或上传我的聊天内容吗？",
    "Netwatch 没有应用遥测，记录保存在本机。原生采集只记录进程网络事件和目标 IP，不截获通信正文、不解密 TLS，也不主动查域名。数据库会保留目标地址、进程标识、会话信息、token 和活动时间，但不写入聊天正文、工具内容、命令行或凭据。请妥善保管数据库、配置和原始 CSV；这个介绍网页也不会连接你电脑上的监控程序。"
  ],
  [
    "能看出每段对话用了多少 GB 吗？",
    "目前不能精确统计。不同会话可能共用进程和连接，无法把流量准确分开。会话活动可以帮助你对照时间，但不能证明某段流量就属于那段对话。"
  ],
  [
    "这里的 token 是我的剩余额度吗？",
    "不是。这里读的是本地日志中的 token 计数，与网络字节各自独立。它不能用来推算订阅剩余额度、账单或官方计费用量，也不能换算成 GB。"
  ]
],
    downloadLabel: '开源免费 · 在本机运行', downloadTitle: '下次流量变多，<br>有记录可查。',
    downloadText: "启动 Netwatch，选好采集来源，再照常使用 Codex。需要排查时，就能回看这段时间留下的记录。",
    notes: '看看更新了什么', issues: '反馈问题', docs: '配置文档', readme: '中文说明', source: '项目源码', license: 'MIT 许可证',
    independent: 'GloryPkqa 维护的独立社区项目，与 OpenAI、MetaCubeX 无官方隶属关系。',
    fallbackNote: '下载按钮会打开 GitHub 的最新版本页面，请选择 Windows x64 ZIP，并下载同一版本的校验文件。',
  },
};

export function renderPage({ lang, origin, release }) {
  const c = copy[lang], zh = lang === 'zh-CN';
  const route = zh ? '/zh-CN/' : '/';
  const dashboard = zh ? '/assets/dashboard.zh-CN.jpg' : '/assets/dashboard.png';
  const investigation = zh ? '/assets/investigation.zh-CN.jpg' : '/assets/investigation.png';
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
  <link rel="icon" href="/assets/icon.svg" type="image/svg+xml">${zh ? '<link rel="preload" href="/assets/fonts/netwatch-sans-sc.woff2" as="font" type="font/woff2" crossorigin>' : ''}<link rel="stylesheet" href="/style.css">
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
    <div class="hero-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
    <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${c.eyebrow}</p>
    <h1 id="hero-title">${c.headline}</h1>
    <p class="intro">${c.intro}</p><div class="actions">${download()}${link(REPOSITORY, `${c.github} ${arrow}`, 'button secondary')}</div><p class="requirement">${c.requirement}</p>
    <div class="hero-proof"><div class="trust-strip">${c.strip.map(s => `<span><span aria-hidden="true">✓</span> ${s}</span>`).join('')}</div><div class="release-label">${link(LATEST, release.version ? `${c.release} ${esc(release.version)} ${arrow}` : `${c.fallback} ${arrow}`)}</div></div>
  </section>
  <section id="overview" class="container section overview" aria-labelledby="overview-title">
    <div class="section-heading"><div><p class="eyebrow">${c.previewLabel}</p><h2 id="overview-title">${c.previewTitle}</h2></div><p>${c.previewText}</p></div>
    <figure class="dashboard"><div class="window-bar"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>Codex Netwatch <span class="window-divider">/</span> ${zh ? '中文界面' : 'Overview'}</span><span class="preview-badge">${zh ? '合成数据演示' : 'Windows desktop'}</span></div><a class="image-link" href="${dashboard}" aria-label="${c.full}"><img src="${dashboard}" alt="${c.dashboardAlt}" width="${zh ? 1585 : 2880}" height="${zh ? 991 : 1658}" fetchpriority="high"><span class="image-zoom">${zoomIcon}<span>${c.full}</span></span></a><figcaption><span class="figure-name"><span class="status-dot" aria-hidden="true"></span> ${zh ? '旧版 Mihomo 界面 · 合成演示' : 'EARLIER MIHOMO INTERFACE'}</span>${link(dashboard, `${c.full} ${arrow}`)}</figcaption></figure>
  </section>
  <section id="features" class="container section" aria-labelledby="features-title"><p class="eyebrow">${c.featuresLabel}</p><h2 id="features-title">${c.featuresTitle}</h2><div class="feature-grid">${c.features.map(([title, text], i) => `<article class="feature"><div class="feature-top"><span class="feature-icon">${featureIcons[i]}</span><span class="feature-number">0${i + 1}</span></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
  <section class="container section investigation" aria-labelledby="investigation-title"><div class="investigation-copy"><p class="eyebrow">${c.investigationLabel}</p><h2 id="investigation-title">${c.investigationTitle}</h2><p>${c.investigationText}</p>${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', `${c.config} ${arrow}`, 'text-link')}</div><figure><div class="demo-label"><span class="status-dot" aria-hidden="true"></span>${c.demo}</div><a class="image-link" href="${investigation}" aria-label="${c.full}"><img src="${investigation}" alt="${c.investigationAlt}" width="${zh ? 1585 : 1280}" height="${zh ? 991 : 752}" loading="lazy"><span class="image-zoom">${zoomIcon}<span>${c.full}</span></span></a></figure></section>
  <aside class="container local-note"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="12" width="22" height="16" rx="3"/><path d="M10 12V9a6 6 0 0 1 12 0v3m-6 6v5"/></svg><div><h3>${c.localTitle}</h3><p>${c.localText}</p></div><span class="local-mark" aria-hidden="true">ON YOUR MACHINE.</span></aside>
  <section id="start" class="container section" aria-labelledby="start-title"><p class="eyebrow">${c.stepsLabel}</p><h2 id="start-title">${c.stepsTitle}</h2><ol class="steps">${c.steps.map(([title, text], i) => `<li><span class="step-index" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><div class="start-links">${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', `${c.config} ${arrow}`)}${link(REPOSITORY + '/blob/main/docs/NATIVE_CAPTURE.md', `${zh ? '原生采集与授权说明' : 'Native capture & authorization'} ${arrow}`)}${link(release.checksumUrl, `${c.checksum} ${arrow}`)}</div><div class="boundaries"><div><h3>${c.compatibility}</h3><p>${c.requirements}</p></div><div><h3>${c.limit}</h3><p>${c.limits}</p></div></div></section>
  <section id="faq" class="container section faq" aria-labelledby="faq-title"><div><p class="eyebrow">${c.faqLabel}</p><h2 id="faq-title">${c.faqTitle}</h2></div><div class="questions">${c.faqs.map(([q,a]) => `<details><summary>${q}<span class="plus" aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div></section>
  <section id="download" class="download-section" aria-labelledby="download-title"><div class="container download-inner"><p class="eyebrow">${c.downloadLabel}</p><h2 id="download-title">${c.downloadTitle}</h2><p>${c.downloadText}</p><div class="actions">${download()}${link(LATEST, `${c.notes} ${arrow}`, 'button secondary')}</div><p class="download-meta"><span>${release.version ? esc(release.version) : c.fallback}</span><span>Windows x64</span><span>MIT</span></p>${release.status === 'fallback' ? `<p class="fallback-note">${c.fallbackNote}</p>` : ''}<div class="download-links">${link(release.checksumUrl, c.checksum)}${link(REPOSITORY + '/issues', c.issues)}${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', c.docs)}${link(REPOSITORY + '/blob/main/README.zh-CN.md', c.readme)}</div></div></section>
</main>
<footer class="container footer"><div class="footer-top"><a class="brand" href="${route}"><img src="/assets/icon.svg" alt="" width="26" height="26">Codex <span>Netwatch</span></a><div>${link('https://github.com/GloryPkqa', 'GloryPkqa')}${link(REPOSITORY, 'GitHub')}${link('/LICENSE', c.license)}</div></div><p>${c.independent}</p></footer>
</body></html>\n`;
}
