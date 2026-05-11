# Features / 功能更新记录

本文档记录 T2 Wiki 项目的功能更新历史。

---

## 2026-05-11

### 🏷️ 标签浏览系统

**功能描述**：
自动生成标签索引和详情页面，支持按标签浏览和跨标签跳转。

**详细说明**：

#### 1. 标签索引页面
- 自动生成 `docs/tags.md` 标签索引页面
- 列出所有标签及对应的文章数量
- 标签按字母顺序排列
- 可点击标签查看详情

**示例**：
```markdown
# 标签索引

## [前端](tags/前端.md) (5)
## [React](tags/React.md) (3)
## [教程](tags/教程.md) (8)
```

#### 2. 标签详情页面
- 为每个标签自动生成独立页面 `docs/tags/{标签名}.md`
- 显示该标签下的所有文章列表
- 每篇文章显示：
  - 文章标题（可点击进入）
  - 其他关联标签（可点击跳转）
  - 作者和更新时间
- 提供返回标签索引的链接

#### 3. 标签交叉引用
- 文章页面显示所有标签
- 标签详情页显示文章的其他标签
- 支持标签间快速跳转
- 便于发现相关内容

#### 4. 自动维护
- Issue 创建/更新时自动生成标签页面
- 自动清理不再使用的标签页面
- 实时更新文章数量统计
- 无需手动维护

#### 5. 导航集成
- 侧边栏添加"标签索引"入口
- 首页添加标签浏览引导
- 与现有分类系统并存

**实现文件**：
- `.github/workflows/sync-issues.yml` - 标签页面生成逻辑
- `docs/tags.md` - 标签索引页（自动生成）
- `docs/tags/*.md` - 标签详情页（自动生成）
- `docs/_sidebar.md` - 更新侧边栏导航

**用户体验**：
- 📋 按分类浏览（侧边栏）
- 🏷️ 按标签浏览（标签页）
- 🔍 全文搜索
- 三种方式相辅相成，提供灵活的内容发现方式

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
