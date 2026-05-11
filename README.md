# T2 Wiki

基于 GitHub Issues 的自动化知识库，使用 Docsify 渲染并部署到 GitHub Pages。

## ✨ 特性

- 📝 **Issue 即文档** - 创建 Issue 自动生成文档页面
- 🏷️ **标签分类** - 使用 Issue 标签自动组织文档结构
- 🔄 **实时同步** - Issue 变更自动更新网站内容
- 🚀 **零配置部署** - 自动部署到 GitHub Pages
- 🔍 **全文搜索** - 内置搜索功能

## 🚀 快速开始

### 1. 启用 GitHub Pages

1. 进入仓库 **Settings** > **Pages**
2. 在 **Source** 下选择 **GitHub Actions**
3. 保存设置

### 2. 创建第一篇文档

1. 创建一个新 Issue
2. 填写标题和内容（支持 Markdown）
3. 添加标签进行分类（可选）
4. 提交 Issue

等待几秒钟，GitHub Actions 会自动：
- 将 Issue 转换为 Markdown 文件
- 更新侧边栏导航
- 部署到 GitHub Pages

### 3. 访问你的 Wiki

访问：`https://{你的用户名}.github.io/t2wiki/`

## 📖 使用说明

### 管理文档

- **创建文档**：创建新 Issue
- **编辑文档**：编辑 Issue 内容
- **分类文档**：为 Issue 添加标签
- **删除文档**：关闭或删除 Issue

### 文档组织

- 文档会按照 Issue 的标签自动分组
- 没有标签的文档会显示在"未分类"部分
- 侧边栏会自动更新，无需手动维护

## 🛠️ 技术栈

- **文档管理**：GitHub Issues
- **自动化**：GitHub Actions
- **渲染引擎**：[Docsify](https://docsify.js.org)
- **部署平台**：GitHub Pages

## 📂 项目结构

```
.
├── .github/
│   └── workflows/
│       ├── sync-issues.yml    # Issue 同步到文档
│       └── deploy-pages.yml   # 部署到 GitHub Pages
├── docs/
│   ├── index.html            # Docsify 配置
│   ├── README.md             # 首页内容
│   ├── _sidebar.md           # 侧边栏（自动生成）
│   ├── .nojekyll             # GitHub Pages 配置
│   └── issue-*.md            # Issue 文档（自动生成）
└── CLAUDE.md                 # Claude Code 项目说明
```

## 🔧 自定义

### 修改主题

编辑 `docs/index.html`，更改主题链接：

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
```

可选主题：`vue.css`, `buble.css`, `dark.css`, `pure.css`

### 修改配置

在 `docs/index.html` 中的 `window.$docsify` 对象中添加或修改配置项。

详见 [Docsify 文档](https://docsify.js.org/#/configuration)

## 📝 许可

MIT
