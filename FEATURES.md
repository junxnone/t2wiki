# Features / 功能更新记录

本文档记录 T2 Wiki 项目的功能更新历史。

---

## 2026-05-11

### ✨ 智能标题和标签系统

**功能描述**：
- 支持从 Issue 内容中自动提取文档标题
- 实现标签智能合并机制

**详细说明**：

#### 1. 标题提取
- 优先使用 Issue 内容中的第一个 Markdown 一级标题（`# 标题`）作为文档标题
- 如果 Issue 内容中没有一级标题，则使用 Issue 的标题作为文档标题
- 在侧边栏和文档页面中显示提取后的标题

**示例**：
```
Issue 标题：前端 React 教程

Issue 内容：
# React 快速入门指南
这是关于 React 的教程...

→ 最终文档标题：React 快速入门指南
```

#### 2. 标签合并
标签来自两个来源，自动合并去重：
- **Issue 标题**：以空格分隔的所有词语自动作为标签
- **GitHub 标签**：在 Issue 页面手动添加的标签

**示例**：
```
Issue 标题：前端 React 教程
GitHub 标签：tutorial, javascript

→ 合并后的标签：前端, React, 教程, tutorial, javascript
→ 文档会出现在 5 个分类下
```

**实现文件**：
- `.github/workflows/sync-issues.yml` - 核心同步逻辑
- `README.md` - 用户使用说明
- `docs/README.md` - Wiki 首页说明

---

## 2026-05-11

### 🚀 项目初始化

**功能描述**：
搭建基于 GitHub Issues 的自动化知识库系统，使用 Docsify 渲染并部署到 GitHub Pages。

**详细功能**：

#### 1. Issue 同步系统
- 监听 Issue 事件（创建、编辑、标记、删除、关闭、重新打开）
- 自动将 Issue 转换为 Markdown 文档文件（`docs/issue-{number}.md`）
- Issue 关闭或删除时，自动删除对应的文档文件
- 包含完整的 frontmatter 元数据：
  - 标题、Issue 编号、作者
  - 创建时间、更新时间
  - 状态、标签
- 自动生成指向原始 Issue 的链接

#### 2. 自动侧边栏生成
- 自动扫描所有开放的 Issues
- 按标签分组显示文档
- 未分类的文档显示在"未分类"区域
- 每次 Issue 变更时自动更新侧边栏

#### 3. Docsify 文档渲染
- 使用 Docsify 渲染 Markdown 文档
- Vue 主题风格
- 集成插件：
  - 全文搜索（支持中文）
  - 页面分页导航
  - 代码高亮（Bash, JavaScript, Python, JSON）
  - 代码复制按钮
- 响应式设计，支持移动端

#### 4. GitHub Pages 自动部署
- 主分支推送时自动触发部署
- 支持手动触发部署（workflow_dispatch）
- 直接部署 `docs/` 目录
- 无需构建步骤，零配置部署

#### 5. 项目文档
- `README.md` - 项目介绍、快速开始、使用指南
- `CLAUDE.md` - 技术架构说明、开发指引
- `docs/README.md` - Wiki 首页内容
- `docs/index.html` - Docsify 配置

**实现文件**：
- `.github/workflows/sync-issues.yml` - Issue 同步 Action
- `.github/workflows/deploy-pages.yml` - GitHub Pages 部署 Action
- `docs/index.html` - Docsify 配置
- `docs/README.md` - 首页内容
- `docs/_sidebar.md` - 侧边栏（自动生成）
- `docs/.nojekyll` - GitHub Pages 配置

**技术栈**：
- GitHub Issues - 内容管理
- GitHub Actions - 自动化工作流
- Docsify 4.x - 文档渲染引擎
- GitHub Pages - 静态网站托管

---

## 待开发功能 / Roadmap

- [ ] 支持自定义主题配置
- [ ] 支持图片自动上传和管理
- [ ] 支持多语言文档
- [ ] 文档版本历史查看
- [ ] Issue 评论同步到文档
- [ ] 文档统计和分析
- [ ] 自定义分类规则
- [ ] 搜索结果优化
- [ ] 支持私有仓库部署
