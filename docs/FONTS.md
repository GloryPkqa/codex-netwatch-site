# 本地中文字体

中文页使用 Noto Sans SC 的变量字体子集，保留 100–900 字重。字体随站点交付，不请求 Google Fonts 或其他外部服务；英文页仍使用系统字体。

- 来源：Google Fonts 官方仓库 https://github.com/google/fonts/tree/main/ofl/notosanssc
- 上游文件：`NotoSansSC[wght].ttf`。
- 许可证：SIL Open Font License 1.1，完整文本位于 `assets/fonts/OFL.txt`，发布时一并保留。
- 成品：`assets/fonts/netwatch-sans-sc.woff2`，126,460 字节。
- 本次子集包含页面所需的 533 个 Unicode 码位，保留可变字重；来源和成品 SHA-256 记录于 `scripts/font-coverage.json`。
- `font-display: swap`；中文页预加载字体；字体不可用时回落到系统中文无衬线字体。

## 修改中文文案之后

正常构建、验证与部署只需 Node.js，不需要 Python 或原始大字体。`scripts/check.mjs` 会检查中文字符是否被当前子集覆盖。

若新文案增加了缺失汉字，使用独立的临时 Python 环境安装 `fonttools[woff]`，从上述官方仓库取得原字体，然后运行：

```powershell
python scripts/subset-font.py '完整路径/NotoSansSC-VF.ttf'
node scripts/build.mjs
node scripts/check.mjs
```

脚本同时更新 WOFF2 与覆盖清单。不要把原始 17 MB 字体或 Python 依赖复制到站点；只发布 `dist/`。若上游字体改变，保留新来源的许可证，并核对覆盖清单中的来源 hash。
