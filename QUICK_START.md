# 🚀 T2 Wiki 快速开始

## 立即查看Wiki内容

### 方法1：本地预览（推荐）

```bash
# 1. 进入docs目录
cd docs

# 2. 启动HTTP服务器（选择一个）
python -m http.server 3000
# 或
python3 -m http.server 3000

# 3. 打开浏览器访问
# http://localhost:3000
```

### 方法2：查看原始Markdown

所有文章都在`docs/`目录下：

```bash
# 查看文章列表
ls docs/issue-*.md

# 阅读文章
cat docs/issue-1.md
```

### 方法3：推送到GitHub查看

```bash
# 1. 创建GitHub仓库 t2wiki

# 2. 推送代码
git remote add origin https://github.com/你的用户名/t2wiki.git
git push -u origin master

# 3. 启用GitHub Pages
# 进入仓库 Settings → Pages
# Source 选择 "GitHub Actions"

# 4. 访问
# https://你的用户名.github.io/t2wiki/
```

## 📚 测试内容预览

### 15篇3D技术文章

#### 建模与制作流程
1. [Blender基础建模入门](docs/issue-1.md)
2. [UV贴图展开技术详解](docs/issue-5.md)
3. [游戏角色建模流程](docs/issue-6.md)

#### 渲染技术
4. [PBR材质系统详解](docs/issue-3.md)
5. [实时渲染vs离线渲染对比](docs/issue-7.md)
6. [HDRI环境光照使用指南](docs/issue-10.md)

#### 编程与开发
7. [Three.js快速入门指南](docs/issue-2.md)
8. [Unity着色器编程入门](docs/issue-4.md)

#### 材质系统
9. [Substance Designer参数化材质制作](docs/issue-8.md)

#### 次世代技术
10. [Unreal Engine 5 Nanite技术解析](docs/issue-9.md)

#### 优化与性能
11. [游戏中的LOD优化策略](docs/issue-11.md)

#### 动画与特效
12. [3D动画的12条原则](docs/issue-12.md)
13. [物理模拟：刚体与软体](docs/issue-13.md)
14. [粒子系统基础教程](docs/issue-14.md)

#### 格式与标准
15. [glTF 3D模型格式详解](docs/issue-15.md)

## 🏷️ 标签浏览

### 热门标签
- [教程](docs/tags/教程.md) - 7篇文章
- [Blender](docs/tags/Blender.md) - 4篇文章
- [游戏开发](docs/tags/游戏开发.md) - 3篇文章
- [建模](docs/_sidebar.md#建模) - 3篇文章
- [渲染](docs/tags/渲染.md) - 3篇文章
- [材质](docs/tags/材质.md) - 2篇文章

### 全部标签
查看 [docs/tags.md](docs/tags.md) - 44个标签

## 📖 重要文档

- [README.md](README.md) - 项目说明
- [FEATURES.md](FEATURES.md) - 功能更新日志
- [CLAUDE.md](CLAUDE.md) - 技术架构
- [SUMMARY.md](SUMMARY.md) - 项目总结
- [LOCAL_PREVIEW.md](LOCAL_PREVIEW.md) - 本地预览详细说明

## ⚙️ 技术说明

### Issue同步工作流

当你在GitHub创建Issue时：

1. **Issue标题**：用空格分隔的词语作为标签
2. **Issue内容**：第一个`# 标题`作为文档标题
3. **GitHub标签**：手动添加的标签会合并
4. **自动生成**：
   - `docs/issue-{number}.md` 文档文件
   - `docs/_sidebar.md` 侧边栏导航
   - `docs/tags.md` 标签索引
   - `docs/tags/{标签}.md` 标签详情页

### 示例

**创建Issue**：
```
标题：建模 Blender 教程
内容：
# 如何在Blender中创建简单模型

这是一篇教程...
```

**结果**：
- 文档标题：如何在Blender中创建简单模型
- 标签：建模, Blender, 教程
- 出现在3个标签分类下

## 🎯 下一步

1. ✅ **浏览示例内容** - 查看15篇3D文章
2. ✅ **本地预览** - 启动HTTP服务器查看完整效果
3. ✅ **推送到GitHub** - 部署到GitHub Pages
4. ✅ **创建Issue** - 测试自动同步功能

---

**快速命令**：
```bash
# 本地预览
cd docs && python -m http.server 3000

# 查看所有文章
ls -l docs/issue-*.md

# 查看提交历史
git log --oneline

# 推送到GitHub
git push origin master
```

🎉 开始探索你的Wiki吧！
