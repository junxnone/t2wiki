# T2 Wiki

> 基于 GitHub Issues 的 3D 技术知识库

<div class="homepage-search">
  <input type="search" placeholder="🔍 搜索文章..." class="search-input" />
  <div class="search-results-panel"></div>
</div>

## 📚 按标签浏览

<div class="tag-buttons">
  <a href="#/tags/教程" class="tag-button">教程 <span class="tag-count">7</span></a>
  <a href="#/tags/Blender" class="tag-button">Blender <span class="tag-count">4</span></a>
  <a href="#/tags/建模" class="tag-button">建模 <span class="tag-count">3</span></a>
  <a href="#/tags/渲染" class="tag-button">渲染 <span class="tag-count">3</span></a>
  <a href="#/tags/技术" class="tag-button">技术 <span class="tag-count">3</span></a>
  <a href="#/tags/游戏开发" class="tag-button">游戏开发 <span class="tag-count">3</span></a>
  <a href="#/tags/材质" class="tag-button">材质 <span class="tag-count">2</span></a>
  <a href="#/tags/WebGL" class="tag-button">WebGL <span class="tag-count">2</span></a>
  <a href="#/tags/理论" class="tag-button">理论 <span class="tag-count">2</span></a>
  <a href="#/tags/特效" class="tag-button">特效 <span class="tag-count">2</span></a>
  <a href="#/tags/Unity" class="tag-button">Unity <span class="tag-count">1</span></a>
  <a href="#/tags/Unreal" class="tag-button">Unreal <span class="tag-count">1</span></a>
  <a href="#/tags/ZBrush" class="tag-button">ZBrush <span class="tag-count">1</span></a>
  <a href="#/tags/Substance" class="tag-button">Substance <span class="tag-count">1</span></a>
  <a href="#/tags/Three.js" class="tag-button">Three.js <span class="tag-count">1</span></a>
  <a href="#/tags/glTF" class="tag-button">glTF <span class="tag-count">1</span></a>
  <a href="#/tags/纹理" class="tag-button">纹理 <span class="tag-count">1</span></a>
  <a href="#/tags/光照" class="tag-button">光照 <span class="tag-count">1</span></a>
  <a href="#/tags/动画" class="tag-button">动画 <span class="tag-count">1</span></a>
  <a href="#/tags/着色器" class="tag-button">着色器 <span class="tag-count">1</span></a>
  <a href="#/tags/UV" class="tag-button">UV <span class="tag-count">1</span></a>
  <a href="#/tags/PBR" class="tag-button">PBR <span class="tag-count">1</span></a>
  <a href="#/tags/HDRI" class="tag-button">HDRI <span class="tag-count">1</span></a>
  <a href="#/tags/Nanite" class="tag-button">Nanite <span class="tag-count">1</span></a>
  <a href="#/tags/LOD" class="tag-button">LOD <span class="tag-count">1</span></a>
  <a href="#/tags/ShaderLab" class="tag-button">ShaderLab <span class="tag-count">1</span></a>
  <a href="#/tags/JavaScript" class="tag-button">JavaScript <span class="tag-count">1</span></a>
  <a href="#/tags/进阶" class="tag-button">进阶 <span class="tag-count">1</span></a>
  <a href="#/tags/流程" class="tag-button">流程 <span class="tag-count">1</span></a>
  <a href="#/tags/技术对比" class="tag-button">技术对比 <span class="tag-count">1</span></a>
  <a href="#/tags/程序化" class="tag-button">程序化 <span class="tag-count">1</span></a>
  <a href="#/tags/3D" class="tag-button">3D <span class="tag-count">1</span></a>
  <a href="#/tags/3D格式" class="tag-button">3D格式 <span class="tag-count">1</span></a>
  <a href="#/tags/前端" class="tag-button">前端 <span class="tag-count">1</span></a>
  <a href="#/tags/优化" class="tag-button">优化 <span class="tag-count">1</span></a>
  <a href="#/tags/性能" class="tag-button">性能 <span class="tag-count">1</span></a>
  <a href="#/tags/次世代" class="tag-button">次世代 <span class="tag-count">1</span></a>
  <a href="#/tags/实时渲染" class="tag-button">实时渲染 <span class="tag-count">1</span></a>
  <a href="#/tags/物理模拟" class="tag-button">物理模拟 <span class="tag-count">1</span></a>
  <a href="#/tags/粒子系统" class="tag-button">粒子系统 <span class="tag-count">1</span></a>
  <a href="#/tags/角色" class="tag-button">角色 <span class="tag-count">1</span></a>
</div>

<style>
.homepage-search {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
  position: relative;
}

.homepage-search .search-input {
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.homepage-search .search-input:focus {
  border-color: var(--theme-color, #42b983);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.15);
}

.search-results-panel {
  position: absolute;
  top: 100%;
  left: 1rem;
  right: 1rem;
  margin-top: 0.5rem;
  background: white;
  border: 2px solid var(--theme-color, #42b983);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  display: none;
}

.search-results-panel.active {
  display: block;
}

.search-result-item {
  padding: 0.8rem 1.2rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-result-item:hover {
  background: #f5f5f5;
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-title {
  font-weight: 600;
  color: var(--theme-color, #42b983);
  margin-bottom: 0.3rem;
}

.search-result-content {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.search-no-results {
  padding: 1rem 1.2rem;
  text-align: center;
  color: #999;
}

.tag-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.tag-button {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tag-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.tag-button .tag-count {
  margin-left: 0.5rem;
  background: rgba(255,255,255,0.3);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.tag-button.special {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  font-size: 1.1rem;
  padding: 0.8rem 1.5rem;
}

@media (max-width: 768px) {
  .tag-buttons {
    gap: 0.5rem;
  }
  .tag-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>

---

## 🚀 快速开始

### 如何使用

1. **浏览标签** - 点击上方标签按钮查看相关文章
2. **搜索内容** - 使用顶部搜索框查找关键词
3. **阅读文章** - 点击文章标题进入详情页

### 如何贡献

1. 在本仓库创建 Issue
2. Issue 标题用空格分隔标签（如：`建模 Blender 教程`）
3. Issue 内容中使用 `# 标题` 作为文档标题
4. 系统会自动生成文档并分类

---

## 📊 统计信息

- 📝 **15篇** 技术文章
- 🏷️ **42个** 标签分类
- 🎨 涵盖建模、渲染、材质、动画等多个领域

---

*本 Wiki 由 [Docsify](https://docsify.js.org) 驱动，托管在 GitHub Pages*
