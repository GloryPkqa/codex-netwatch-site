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
    "title": "Codex Netwatch — Track Codex network activity locally",
    "description": "See Codex uploads, downloads, processes and connections on Windows. Review traffic over time and keep your records on your own computer.",
    "skip": "Skip to content",
    "nav": [
      "Overview",
      "Features",
      "Get started",
      "FAQ"
    ],
    "eyebrow": "A LOCAL NETWORK MONITOR FOR CODEX",
    "headline": "Keep track of<br> Codex <em>traffic.</em>",
    "intro": "See Codex uploads, downloads, processes and connections on your own computer. Keep a traffic history to review when something changes.",
    "download": "Download for Windows",
    "github": "View on GitHub",
    "requirement": "Windows 10/11 x64 · Portable app · Extract the full ZIP to get started",
    "release": "Latest release",
    "fallback": "View latest release",
    "strip": [
      "Stored locally",
      "No usage telemetry",
      "MIT licensed"
    ],
    "previewLabel": "01 / OVERVIEW",
    "previewTitle": "Your traffic. A clearer picture.",
    "previewText": "Review upload and download activity over time. Choose a time range or export a CSV for a closer look. The screenshot shows an earlier Mihomo interface.",
    "full": "View full-size image",
    "dashboardAlt": "Earlier Codex Netwatch Mihomo dashboard showing traffic history and process rankings; not a Windows native capture result",
    "featuresLabel": "02 / WHAT YOU CAN SEE",
    "featuresTitle": "From “how much?”<br>to “what happened?”",
    "features": [
      [
        "Traffic over time",
        "See upload and download totals, current speeds and traffic history. Filter by time or export a CSV for a closer look."
      ],
      [
        "Traffic by process",
        "See traffic from Codex and the processes it starts. Only traffic that can be linked to Codex counts toward its total; you can also compare other recorded processes."
      ],
      [
        "Connection details",
        "Review connection destinations alongside traffic spikes and sustained uploads. Gaps are marked so you can see when collection was interrupted."
      ],
      [
        "Session activity",
        "Compare session activity with the traffic timeline. Token counts from local logs provide context, but cannot tell you how many bytes a conversation used."
      ]
    ],
    "investigationLabel": "LOOK A LITTLE CLOSER",
    "investigationTitle": "Look closer at<br> unexpected traffic.",
    "investigationText": "Find the period where traffic changed, then review destinations and process activity. Changes in capture method or interruptions leave gaps; Netwatch does not reconstruct traffic it missed.",
    "demo": "EARLIER MIHOMO DEMO · SYNTHETIC DATA",
    "investigationAlt": "Earlier Mihomo investigation screen using synthetic data, not a Windows native capture result",
    "localTitle": "Your records stay on your computer.",
    "localText": "Records and interface files are stored locally, with no usage telemetry. Use the desktop window or the local browser interface. Closing the window keeps collection running in the system tray; choose Exit from the tray menu to stop it. The interface supports English and Chinese and opens in English by default.",
    "stepsLabel": "03 / GET STARTED",
    "stepsTitle": "Get started in three steps.",
    "steps": [
      [
        "Download and extract",
        "Download the Windows x64 ZIP and SHA256SUMS.txt from the same release. Verify the SHA-256 checksum, then extract the full ZIP into a folder you can write to."
      ],
      [
        "Open the app and check Settings",
        "Run Codex-Netwatch.exe and Codex. Leave the capture mode set to Automatic, or select a specific source in Settings."
      ],
      [
        "Authorize capture, then make a request",
        "For Windows native capture, click “Authorize native capture” and approve the Windows prompt each time you start Netwatch. For Mihomo, follow “Connection help”. Then send a new request in Codex and check for activity."
      ]
    ],
    "config": "Configuration and troubleshooting",
    "checksum": "SHA-256 checksums",
    "compatibility": "Before you download",
    "requirements": "Requires Windows 10/11 x64, .NET Framework 4.8 and Microsoft Edge WebView2 Runtime. The portable ZIP includes Node.js and the capture helper, so you do not need to install them separately. The Windows app is not digitally signed; verify the ZIP using the checksums from the same release.",
    "limit": "What the numbers mean",
    "limits": "These figures describe process activity, not network-adapter totals or a VPN bill. Netwatch uses one source at a time. Switching sources or losing events leaves gaps, and traffic missed while collection was stopped is not recovered. Historical records may use different measurement methods. Native capture includes local connections; Mihomo can miss short-lived connections or their final bytes. Continuous 24- and 72-hour validation runs have not been completed.",
    "faqLabel": "04 / FAQ",
    "faqTitle": "A few things<br> worth knowing.",
    "faqs": [
      [
        "Do I need to keep a proxy running?",
        [
          "No. With an authorized Windows native helper, Netwatch can record TCP/UDP activity over IPv4 and IPv6, including short-lived connections. It uses Windows ETW network events.",
          "If you already use Mihomo or a compatible Clash controller, you can use its local control API instead. Enter the controller port, not the HTTP or SOCKS proxy port. A regular VPN may not provide this API."
        ]
      ],
      [
        "How does Automatic mode choose a source?",
        [
          "Automatic uses the Windows native helper when it is authorized and available. Otherwise, it tries Mihomo. You can also choose either source in Settings.",
          "Each sample uses just one source; the two totals are never added together. Switching sources or losing events leaves gaps, and a selected history range may include different measurement methods."
        ]
      ],
      [
        "Why does native capture ask for administrator access?",
        [
          "Windows requires administrator access for native network collection. Each time you start Netwatch, click “Authorize native capture” and approve the Windows prompt to allow native capture for that run.",
          "Only the capture helper runs with administrator access. The dashboard and session-log reader continue to run with normal permissions. Authorization ends when you exit the collector; closing the window leaves it running in the tray.",
          "Netwatch does not automatically request administrator access at sign-in or when retrying collection in the background. It does not install a service, driver or scheduled task, or bypass Windows confirmation."
        ]
      ],
      [
        "Why is the traffic showing zero?",
        [
          "Check the active source in Settings and “Connection help”. For Windows native capture, make sure the helper is authorized and running. For Mihomo, check the controller address and secret, confirm that the controller supports the expected API, and make sure Codex uses that proxy.",
          "Then send a new request in Codex. Netwatch needs to identify the relevant process before its traffic can be included in Codex totals. Mihomo records a starting point when it connects or reconnects, then counts new traffic. Missed activity is not reconstructed."
        ]
      ],
      [
        "Do these numbers match my internet or VPN data usage?",
        [
          "No. Windows native capture includes traffic within your computer, such as connections to a local proxy. When you compare all processes, you may see records for both ends of a local connection. Mihomo only reports traffic visible to its controller.",
          "Use these figures to understand process network activity. They should not be treated as network-adapter totals, billable internet usage or the amount of encrypted data sent by a VPN."
        ]
      ],
      [
        "Does closing the window stop collection?",
        "No. Closing the window leaves Netwatch running in the system tray, along with any helper you have already authorized. Double-click the tray icon to reopen the window. To stop collection and end native authorization, choose Exit from the tray menu. Starting at sign-in is optional and off by default."
      ],
      [
        "Does Netwatch store or upload my chats?",
        [
          "Netwatch does not write chat messages, tool inputs or outputs, command lines or credentials to its database, and it sends no usage telemetry. Native capture records process network activity and destination IP addresses. It does not capture network payloads, decrypt TLS traffic or actively look up domain names.",
          "Local records still include destinations, process information, session metadata, token counts and activity times. Keep the database, configuration files and raw CSV exports private. This website does not connect to the Netwatch app on your computer."
        ]
      ],
      [
        "Can Netwatch measure data usage for each conversation?",
        "Not precisely. Conversations can share processes and connections, so their traffic cannot be split into exact GB per conversation. Session activity can help you compare timings, but does not prove that particular traffic belongs to a conversation."
      ],
      [
        "Do token counts show my remaining allowance?",
        "No. These counts come from local logs and are separate from network traffic. They do not show your remaining subscription allowance or official billed usage. You cannot convert them into GB or use them to calculate a bill."
      ]
    ],
    "downloadLabel": "OPEN SOURCE · RUNS ON YOUR COMPUTER",
    "downloadTitle": "Have a record<br> when you need one.",
    "downloadText": "Start Netwatch, finish setup and use Codex as usual. Leave it running in the tray to build a local history you can review later.",
    "notes": "Release notes",
    "issues": "Report an issue",
    "docs": "Documentation",
    "readme": "中文说明",
    "source": "Source code",
    "license": "MIT license",
    "independent": "An independent community project by GloryPkqa. Not an official OpenAI or MetaCubeX product.",
    "fallbackNote": "The download button opens the latest GitHub release. Choose the Windows x64 ZIP and download the checksum file from the same release."
  },
  'zh-CN': {
    "title": "Codex Netwatch — 查看 Codex 的流量变化与连接记录",
    "description": "在 Windows 本机查看 Codex 的上传下载、流量趋势和连接记录。按时间回看，排查异常，数据保存在自己的电脑上。",
    "skip": "跳到正文",
    "nav": [
      "界面预览",
      "核心功能",
      "开始使用",
      "常见问题"
    ],
    "eyebrow": "Codex 的本地流量记录工具",
    "headline": "看清 Codex 的<br><em>网络活动。</em>",
    "intro": "在自己的电脑上查看 Codex 的上传下载、进程和连接记录。哪段时间流量变多了，回头也能查。",
    "download": "下载 Windows 版",
    "github": "查看源码",
    "requirement": "Windows 10/11 x64 · 便携版，完整解压后运行",
    "release": "最新正式版",
    "fallback": "查看最新版本",
    "strip": [
      "记录保存在本机",
      "不上传使用数据",
      "MIT 开源"
    ],
    "previewLabel": "01 / 界面预览",
    "previewTitle": "上传、下载和流量变化，一页看清。",
    "previewText": "先看看上传、下载和历史曲线。想查某个时段，可以调整时间范围；需要进一步分析时，也能导出 CSV。",
    "full": "查看大图",
    "dashboardAlt": "Codex Netwatch 中文总览页，以合成数据展示流量趋势和进程排行；截图为旧版 Mihomo 代理采集界面",
    "featuresLabel": "02 / 主要功能",
    "featuresTitle": "流量变多了，<br>从这几处查起。",
    "features": [
      [
        "哪段时间变多了",
        "看上传、下载和实时速度，也能回看历史曲线。选定时间段，或导出 CSV，方便接着分析。"
      ],
      [
        "哪些程序在用",
        "看看 Codex 和它启动的程序各用了多少。只有能确认归属的流量才会计入；需要对比时，也能查看其他程序。"
      ],
      [
        "连接去了哪里",
        "查看连接的目标地址，找出突然增加的上传、下载或持续上传。采集中断的时段也会标出来。"
      ],
      [
        "当时在做什么",
        "把会话活动时间和流量曲线放在一起看，帮助回想当时的操作。日志里的 token 仅作参考，不能拿来换算流量。"
      ]
    ],
    "investigationLabel": "发现异常之后",
    "investigationTitle": "流量突然升高，<br>先回看那段记录。",
    "investigationText": "先找到流量变多的那段时间，再看连接地址和进程记录。更换采集方式或中途断开时，记录里会留下空档，不会补算没采集到的流量。",
    "demo": "旧版 Mihomo 排查界面 · 合成数据演示",
    "investigationAlt": "旧版 Mihomo 异常排查页，使用合成数据演示流量变化和连接记录，并非原生直连实测",
    "localTitle": "记录留在自己的电脑上。",
    "localText": "数据和界面都在本机，不会上传使用数据。关掉窗口后，程序会留在托盘继续记录；要彻底停止，请从托盘菜单退出。界面支持中文和英文，首次启动默认英文。",
    "stepsLabel": "03 / 开始使用",
    "stepsTitle": "第一次用，先做这三步。",
    "steps": [
      [
        "下载并完整解压",
        "在同一个版本下下载 Windows x64 ZIP 和 SHA256SUMS.txt。核对 SHA-256 后，把 ZIP 完整解压到有写入权限的文件夹。"
      ],
      [
        "打开程序，检查设置",
        "运行 Codex-Netwatch.exe 和 Codex。第一次使用，可以先保留默认的「自动」；需要固定采集方式时，再到设置里手动选择。"
      ],
      [
        "确认授权，再发一条请求",
        "使用 Windows 原生方式时，每次启动程序都要点击「授权原生采集」，并按 Windows 提示允许本次运行。使用 Mihomo 时，先按「连接帮助」检查配置。随后在 Codex 发起一个新请求，看看流量是否开始变化。"
      ]
    ],
    "config": "查看配置说明",
    "checksum": "SHA-256 校验文件",
    "compatibility": "下载前，确认电脑能运行",
    "requirements": "适用于 Windows 10/11 x64，需要 .NET Framework 4.8 和 Microsoft Edge WebView2 Runtime。便携包已包含 Node.js 和采集助手，不用另外安装。目前 Windows 程序还没有数字签名，请用同一版本的校验文件核对 ZIP。",
    "limit": "这些数字代表什么",
    "limits": "这里记录的是程序的网络活动，不是网卡总流量或 VPN 账单。同一时间只用一种采集方式，切换或漏记的部分会留下空档，不会补算；历史记录也可能采用不同的统计方法。原生记录包含本机内部通信，Mihomo 方式还可能漏掉短连接和断开前的部分流量。连续运行 24 / 72 小时的验证仍未完成。",
    "faqLabel": "04 / 常见问题",
    "faqTitle": "有疑问，<br>先看看这里。",
    "faqs": [
      [
        "需要一直开着代理吗？",
        "不需要。使用 Windows 原生方式并完成授权后，就能记录直接联网的 TCP/UDP 活动，支持 IPv4/IPv6，也能保留很快结束的连接。已有 Mihomo / Clash 兼容代理时，也可以用它的本地控制接口采集。代理方式要填控制接口端口，不是 HTTP / SOCKS 代理端口；普通 VPN 不一定提供这种接口。"
      ],
      [
        "「自动」模式怎么选？会不会重复计算？",
        "它会先用已经授权、能够正常运行的 Windows 原生助手；没有可用助手时，再尝试 Mihomo。也可以在设置里固定为「Windows 原生」或「Mihomo」。每次只取其中一种方式的记录，不会把两边相加。切换时会留下记录空档，前后的统计方法也可能不同。"
      ],
      [
        "为什么要管理员授权？下次还要点吗？",
        [
          "Windows 需要管理员权限，才能提供原生采集所需的网络记录。每次启动程序后，如果要用这种方式，都需点击「授权原生采集」，并在 Windows 的确认窗口中允许本次运行。",
          "只有采集助手获得管理员权限，主界面和读取会话的部分仍以普通权限运行。退出采集程序后，授权也随之结束。",
          "开机自启和后台重试都不会自动弹出这个窗口；程序不安装服务、驱动或计划任务，也不会跳过系统确认。"
        ]
      ],
      [
        "开着程序，为什么还是 0？",
        [
          "先在设置和「连接帮助」里看看当前用的是哪种采集方式。使用 Windows 原生方式时，确认助手已经授权并正常运行；使用 Mihomo 时，检查接口地址、密钥、接口是否正常响应，以及 Codex 是否确实经过这个代理。",
          "然后在 Codex 里发起一个新请求。程序还需要认出对应进程，流量才会计入 Codex。Mihomo 刚连接或重连时会先记下初始值，之后只累计新增流量；没采集到的部分不会补算。"
        ]
      ],
      [
        "这里的流量，和网卡或 VPN 账单一样吗？",
        [
          "不一样。Windows 原生方式会记录程序之间在本机内的通信，例如 Codex 连到本地代理；查看所有进程时，还可能同时看到连接两端的记录。Mihomo 只能统计控制接口能看到的部分。",
          "所以，这些数字适合用来了解程序的网络活动，不能直接当成网卡总流量、实际上网流量或 VPN 加密后的传输量。"
        ]
      ],
      [
        "关掉窗口以后，还会继续记录吗？",
        "会。关窗只是把程序收进系统托盘，记录还会继续，已经授权的助手也会继续运行。双击托盘图标可以重新打开；要彻底停止，请在托盘菜单里选「退出」。退出后原生授权结束，下次使用原生方式时需重新授权。开机自启默认关闭，可以按需要开启。"
      ],
      [
        "会保存或上传我的聊天内容吗？",
        [
          "Netwatch 不会把聊天正文、工具内容、命令行或凭据写进数据库，也不会回传使用数据。原生采集不读取通信正文、不解密 TLS，也不主动查询域名；连接目标显示为 IP。",
          "本地记录里仍会有目标地址、进程信息、会话信息、token 和活动时间。因此，数据库、配置文件和原始 CSV 仍应妥善保管，不要直接公开。这个介绍网页不会连接你电脑上的监控程序。"
        ]
      ],
      [
        "能算出每段对话用了多少 GB 吗？",
        "目前不能精确算。不同对话可能共用进程和连接，流量没法一一分开。会话活动可以帮你对照时间、回想当时做了什么，但不能据此认定某段流量就属于某一段对话。"
      ],
      [
        "这里的 token 代表剩余额度吗？",
        "不是。这里显示的是本地日志里的 token 计数，和网络流量是两回事。它既不能换算成 GB，也不能用来推算订阅还剩多少额度、账单金额或官方计费用量。"
      ]
    ],
    "downloadLabel": "开源免费 · 在本机运行",
    "downloadTitle": "下次流量变多，<br>有记录可查。",
    "downloadText": "设置好以后，照常使用 Codex。想查流量时，再打开 Netwatch 看看。",
    "notes": "版本更新",
    "issues": "反馈问题",
    "docs": "使用文档",
    "readme": "中文说明",
    "source": "项目源码",
    "license": "MIT 许可证",
    "independent": "由 GloryPkqa 维护的独立开源项目，非 OpenAI 或 MetaCubeX 官方产品。",
    "fallbackNote": "下载按钮会打开 GitHub 的最新版本页面。请选择 Windows x64 ZIP，并下载同一版本的校验文件。"
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
  <section id="faq" class="container section faq" aria-labelledby="faq-title"><div><p class="eyebrow">${c.faqLabel}</p><h2 id="faq-title">${c.faqTitle}</h2></div><div class="questions">${c.faqs.map(([q,a]) => `<details><summary>${q}<span class="plus" aria-hidden="true"></span></summary>${(Array.isArray(a) ? a : [a]).map(paragraph => `<p>${paragraph}</p>`).join('')}</details>`).join('')}</div></section>
  <section id="download" class="download-section" aria-labelledby="download-title"><div class="container download-inner"><p class="eyebrow">${c.downloadLabel}</p><h2 id="download-title">${c.downloadTitle}</h2><p>${c.downloadText}</p><div class="actions">${download()}${link(LATEST, `${c.notes} ${arrow}`, 'button secondary')}</div><p class="download-meta"><span>${release.version ? esc(release.version) : c.fallback}</span><span>Windows x64</span><span>MIT</span></p>${release.status === 'fallback' ? `<p class="fallback-note">${c.fallbackNote}</p>` : ''}<div class="download-links">${link(release.checksumUrl, c.checksum)}${link(REPOSITORY + '/issues', c.issues)}${link(REPOSITORY + '/blob/main/docs/CONFIGURATION.md', c.docs)}${link(REPOSITORY + '/blob/main/README.zh-CN.md', c.readme)}</div></div></section>
</main>
<footer class="container footer"><div class="footer-top"><a class="brand" href="${route}"><img src="/assets/icon.svg" alt="" width="26" height="26">Codex <span>Netwatch</span></a><div>${link('https://github.com/GloryPkqa', 'GloryPkqa')}${link(REPOSITORY, 'GitHub')}${link('/LICENSE', c.license)}</div></div><p>${c.independent}</p></footer>
</body></html>\n`;
}
