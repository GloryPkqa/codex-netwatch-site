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
    previewLabel: '01 / THE OVERVIEW', previewTitle: 'Your traffic. A clearer picture.',
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
    eyebrow: '给 Codex 用户的本地流量看板', headline: '看清 Codex 的<br><em>网络开销。</em>',
    intro: '流量突然变多，却不知道用在了哪里？把趋势、进程和连接放到一起看，排查时少一点猜测。',
    download: '下载 Windows 版', github: '看看项目源码',
    requirement: 'Windows 10/11 x64 · 需要 Mihomo / Clash 兼容控制接口',
    release: '最新正式版', fallback: '查看最新版本', strip: ['数据留在本机', '无遥测', 'MIT 开源'],
    previewLabel: '01 / 先看一眼', previewTitle: '上传、下载和趋势，一页看清。',
    previewText: '先看上传、下载和变化趋势。发现某段时间流量偏高，再缩小时间范围，查看对应的进程和连接。',
    full: '查看完整原图', dashboardAlt: 'Codex Netwatch 中文总览演示，使用产品自带的合成流量数据展示流量指标、历史趋势和目标地址',
    featuresLabel: '02 / 能帮你看什么', featuresTitle: '想知道的，<br>不只是用了多少流量。',
    features: [
      ['哪段时间变多了', '看上传、下载和实时速率，也能回看历史趋势。按时间筛选，或导出 CSV，方便继续分析。'],
      ['哪个进程在用', '根据进程记录识别 Codex 和它启动的子进程。需要对比时，也能看看其他经过代理的程序。'],
      ['连接去了哪里', '查看目标地址，找到突发上传、下载或持续上传的时段。采集中断留下的空档也会标出来。'],
      ['当时在做什么', '对照会话活动时间和本地日志中的 token 计数，帮助回看当时的情况。它们是参考，不能直接换算成流量。'],
    ],
    investigationLabel: '发现变化之后', investigationTitle: '发现一次突增，<br>就从这里查起。',
    investigationText: '先缩小时间范围，再看目标地址与进程记录。会话活动可以帮你对照时间，但不能据此把流量精确分摊到每段对话。',
    demo: '演示视图 · 合成数据', investigationAlt: '使用合成数据的异常排查演示，展示流量事件与连接证据',
    localTitle: '这些记录，留在你的电脑上。', localText: '采集记录保存在本机，应用没有遥测。关掉窗口后，也可以留在托盘继续记录；需要时再打开看。支持桌面窗口和本地浏览器，界面可选中英文，首次启动默认英文。',
    stepsLabel: '03 / 开始使用', stepsTitle: '准备好代理，再打开它。',
    steps: [
      ['下载后，完整解压', '在同一个版本下下载 Windows x64 ZIP 和 SHA256SUMS.txt。核对 SHA-256 后，把压缩包完整解压到有写入权限的文件夹。'],
      ['启动代理和 Netwatch', '先运行兼容的代理与 Codex，再打开 Codex-Netwatch.exe。压缩包已带上 Node.js，不用另外安装。'],
      ['发一条请求，看看变化', '按「连接帮助」确认连接正常，再向 Codex 发一条新请求。等两次采样后，就能开始查看新增流量；已有连接会先记下初始值。'],
    ],
    config: '查看配置与排错说明', checksum: 'SHA-256 校验文件',
    compatibility: '下载前，确认这几项', requirements: '需要 Windows 10/11 x64、.NET Framework 4.8 和 Microsoft Edge WebView2 Runtime。目前的 Windows 程序还没有数字签名，请用同一版本的校验文件核对下载的 ZIP。',
    limit: '看数字前，先了解统计范围', limits: '流量根据控制器定时提供的连接快照统计。绕过控制器的直连看不到，短连接和关闭前的一小段流量也可能漏记，所以不能当作网卡总流量或 VPN 账单。应用尚未完成连续运行 24 / 72 小时的验证。',
    faqLabel: '04 / 你可能还想知道', faqTitle: '遇到问题，<br>先看看这里。',
    faqs: [
      ['我用的代理或 VPN 能接上吗？', '要看它是否提供 Mihomo / Clash 兼容的本地控制接口，并不是所有 VPN 都支持。配置时填写控制接口端口，别填成 HTTP / SOCKS 代理端口。拿不准时，可以先看上面的配置与排错说明。'],
      ['已经连上了，为什么流量还是 0？', '先在「连接帮助」里检查地址、密钥和接口响应，再确认 Codex 确实经过这个代理，且能识别到对应进程。随后发一条新请求，等两次采样。刚连接或重连时会先记录初始值；断开期间的流量不会补算。'],
      ['关掉窗口，还会继续记录吗？', '会，程序会留在系统托盘继续采集。双击托盘图标就能重新打开；想彻底停止时，在托盘菜单里选「退出」。开机自启默认关闭，可以按需要开启。'],
      ['会把我的聊天内容传出去吗？', 'Netwatch 没有遥测，记录保存在本机，也不会把聊天正文、工具内容、命令行或凭据写入数据库。不过，数据库里仍有目标地址、进程标识、会话信息、token 和活动时间，请妥善保管数据库、配置文件和原始 CSV。这个介绍网页也不会连接你电脑上的监控程序。'],
      ['能看出每段对话用了多少 GB 吗？', '目前不能精确统计。不同会话可能共用进程和连接，无法把这些流量准确分开。会话活动能帮助你对照时间，但不能证明某段流量就属于那段对话。'],
      ['这里的 token 是我的剩余额度吗？', '不是。这里读的是本地日志里的 token 计数，不能用来推算订阅剩余额度、账单或官方计费用量，也不能换算成 GB。'],
    ],
    downloadLabel: '开源免费 · 在本机运行', downloadTitle: '下次流量变多，<br>有记录可查。',
    downloadText: '完整解压并启动 Netwatch，再照常使用 Codex。需要排查时，就能回看这段时间留下的记录。',
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
    <figure class="dashboard"><div class="window-bar"><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>Codex Netwatch <span class="window-divider">/</span> ${zh ? '中文界面' : 'Overview'}</span><span class="preview-badge">${zh ? '合成数据演示' : 'Windows desktop'}</span></div><a class="image-link" href="${dashboard}" aria-label="${c.full}"><img src="${dashboard}" alt="${c.dashboardAlt}" width="${zh ? 1585 : 2880}" height="${zh ? 991 : 1658}" fetchpriority="high"><span class="image-zoom">${zoomIcon}<span>${c.full}</span></span></a><figcaption><span class="figure-name"><span class="status-dot" aria-hidden="true"></span> ${zh ? '产品中文界面 · 演示数据' : 'CODEX NETWATCH / OVERVIEW'}</span>${link(dashboard, `${c.full} ${arrow}`)}</figcaption></figure>
  </section>
  <section id="features" class="container section" aria-labelledby="features-title"><p class="eyebrow">${c.featuresLabel}</p><h2 id="features-title">${c.featuresTitle}</h2><div class="feature-grid">${c.features.map(([title, text], i) => `<article class="feature"><div class="feature-top"><span class="feature-icon">${featureIcons[i]}</span><span class="feature-number">0${i + 1}</span></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section>
  <section class="container section investigation" aria-labelledby="investigation-title"><div class="investigation-copy"><p class="eyebrow">${c.investigationLabel}</p><h2 id="investigation-title">${c.investigationTitle}</h2><p>${c.investigationText}</p>${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', `${c.config} ${arrow}`, 'text-link')}</div><figure><div class="demo-label"><span class="status-dot" aria-hidden="true"></span>${c.demo}</div><a class="image-link" href="${investigation}" aria-label="${c.full}"><img src="${investigation}" alt="${c.investigationAlt}" width="${zh ? 1585 : 1280}" height="${zh ? 991 : 752}" loading="lazy"><span class="image-zoom">${zoomIcon}<span>${c.full}</span></span></a></figure></section>
  <aside class="container local-note"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="12" width="22" height="16" rx="3"/><path d="M10 12V9a6 6 0 0 1 12 0v3m-6 6v5"/></svg><div><h3>${c.localTitle}</h3><p>${c.localText}</p></div><span class="local-mark" aria-hidden="true">ON YOUR MACHINE.</span></aside>
  <section id="start" class="container section" aria-labelledby="start-title"><p class="eyebrow">${c.stepsLabel}</p><h2 id="start-title">${c.stepsTitle}</h2><ol class="steps">${c.steps.map(([title, text], i) => `<li><span class="step-index" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><div class="start-links">${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', `${c.config} ${arrow}`)}${link(release.checksumUrl, `${c.checksum} ${arrow}`)}</div><div class="boundaries"><div><h3>${c.compatibility}</h3><p>${c.requirements}</p></div><div><h3>${c.limit}</h3><p>${c.limits}</p></div></div></section>
  <section id="faq" class="container section faq" aria-labelledby="faq-title"><div><p class="eyebrow">${c.faqLabel}</p><h2 id="faq-title">${c.faqTitle}</h2></div><div class="questions">${c.faqs.map(([q,a]) => `<details><summary>${q}<span class="plus" aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div></section>
  <section id="download" class="download-section" aria-labelledby="download-title"><div class="container download-inner"><p class="eyebrow">${c.downloadLabel}</p><h2 id="download-title">${c.downloadTitle}</h2><p>${c.downloadText}</p><div class="actions">${download()}${link(LATEST, `${c.notes} ${arrow}`, 'button secondary')}</div><p class="download-meta"><span>${release.version ? esc(release.version) : c.fallback}</span><span>Windows x64</span><span>MIT</span></p>${release.status === 'fallback' ? `<p class="fallback-note">${c.fallbackNote}</p>` : ''}<div class="download-links">${link(release.checksumUrl, c.checksum)}${link(REPOSITORY + '/issues', c.issues)}${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', c.docs)}${link(REPOSITORY + '/blob/main/README.zh-CN.md', c.readme)}</div></div></section>
</main>
<footer class="container footer"><div class="footer-top"><a class="brand" href="${route}"><img src="/assets/icon.svg" alt="" width="26" height="26">Codex <span>Netwatch</span></a><div>${link('https://github.com/GloryPkqa', 'GloryPkqa')}${link(REPOSITORY, 'GitHub')}${link('/LICENSE', c.license)}</div></div><p>${c.independent}</p></footer>
</body></html>\n`;
}
