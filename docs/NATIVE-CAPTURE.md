# 网站中的原生采集说明

本轮文案依据产品 v0.3.1（源码提交 7cec8eafb4910e1ac97c8fcb41170551ebd21e69）的 README、CHANGELOG 与 [NATIVE_CAPTURE.md](https://github.com/GloryPkqa/codex-netwatch/blob/main/docs/NATIVE_CAPTURE.md)。网站仍是无脚本、无采集接口连接的静态介绍站。

## 需要保持的事实

- Automatic 是默认值：优先使用可用且已授权的原生助手，否则尝试 Mihomo。Windows native 与 Mihomo 可以手动固定。
- Windows 原生助手使用 ETW，覆盖 TCP/UDP、IPv4/IPv6 和采样间关闭的短连接，不需要代理或控制器。
- 用户在设置点击 Authorize native capture 后，由正常 Windows UAC 请求授权；只提升助手，不提升看板或会话读取部分。退出采集程序后授权结束，下次运行可再次授权。
- 开机自启与后台重试不自动触发 UAC；不安装服务、驱动或计划任务，不绕过系统安全确认。
- 每次采样只使用一种来源，不能把 ETW 和代理计数相加。切换来源及丢事件会留下缺口，历史可能含不同统计口径，不回填离线流量。
- 原生目标是 IP，不主动查域名，不截获通信正文或解密 TLS。包含回环进程网络活动，全进程对照可能含本地连接两端；不等于网卡、互联网或 VPN 账单。
- 有证据才归入 Codex 及其子进程。共享连接不能精确拆每会话 GB；本地日志 token 独立于网络字节，不代表额度或账单。
- Windows 10/11 x64、.NET Framework 4.8、WebView2 仍为要求。便携包带 Node.js 和原生助手，EXE 未签名，24/72 小时长时间验证仍未完成。

## 图片与发布边界

旧总览和排查截图明确标为旧版 Mihomo 界面，不用作原生直连实测。页面不写死产品版本，构建时继续查询正式 Latest；失败时使用安全回退。

本轮不更改 meta CSP、font-src self、OFL、.nojekyll 或现有 Actions 发布配置。提交和推送须遵循用户在会话中的授权；推送 main 会触发现有自动发布。
