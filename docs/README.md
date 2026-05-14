# T2 Wiki

> 基于 GitHub Issues 的 3D 技术知识库

<div class="homepage-search">
  <input type="search" placeholder="🔍 搜索文章..." class="search-input" />
  <div class="search-results-panel"></div>
</div>

## 📚 按标签浏览

<div class="tag-buttons">
  <a href="#/tags/test" class="tag-button">test <span class="tag-count">1</span></a>
  <a href="#/tags/%E6%96%87%E7%AB%A0" class="tag-button">文章 <span class="tag-count">1</span></a>
</div>

<style>
.homepage-search { max-width: 600px; margin: 2rem auto; padding: 0 1rem; position: relative; }
.homepage-search .search-input { width: 100%; padding: 0.8rem 1.2rem; font-size: 1rem; border: 2px solid #e0e0e0; border-radius: 8px; outline: none; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.homepage-search .search-input:focus { border-color: var(--theme-color, #42b983); box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15); }
.search-results-panel { position: absolute; top: 100%; left: 1rem; right: 1rem; margin-top: 0.5rem; background: white; border: 2px solid var(--theme-color, #42b983); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); max-height: 400px; overflow-y: auto; z-index: 1000; display: none; }
.search-results-panel.active { display: block; }
.search-result-item { padding: 0.8rem 1.2rem; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s ease; }
.search-result-item:hover { background: #f5f5f5; }
.search-result-item:last-child { border-bottom: none; }
.search-result-title { font-weight: 600; color: var(--theme-color, #42b983); margin-bottom: 0.3rem; }
.search-result-content { font-size: 0.85rem; color: #666; line-height: 1.4; }
.search-no-results { padding: 1rem 1.2rem; text-align: center; color: #999; }
.tag-buttons { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 2rem; }
.tag-button { display: inline-flex; align-items: center; padding: 0.6rem 1.2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white !important; border-radius: 8px; text-decoration: none; font-weight: 500; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.tag-button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.tag-button .tag-count { margin-left: 0.5rem; background: rgba(255,255,255,0.3); padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.85rem; }
.tag-button.special { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); font-size: 1.1rem; padding: 0.8rem 1.5rem; }
@media (max-width: 768px) { .tag-buttons { gap: 0.5rem; } .tag-button { padding: 0.5rem 1rem; font-size: 0.9rem; } }
</style>

---

## 🚀 快速开始

### 如何使用

1. **浏览标签** - 点击上方标签按钮查看相关文章
2. **搜索内容** - 使用搜索框查找关键词
3. **阅读文章** - 点击文章标题进入详情页

### 如何贡献

1. 在本仓库创建 Issue
2. Issue 标题用空格分隔标签（如：`建模 Blender 教程`）
3. Issue 内容中使用 `# 标题` 作为文档标题
4. 系统会自动生成文档并分类

---

## 📊 统计信息

- 📝 **1篇** 技术文章
- 🏷️ **2个** 标签分类
- 🎨 涵盖建模、渲染、材质、动画等多个领域

---

*本 Wiki 由 [Docsify](https://docsify.js.org) 驱动，托管在 GitHub Pages*