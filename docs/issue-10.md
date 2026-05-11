---
title: HDRI环境光照使用指南
issue_number: 10
author: testuser
created_at: 2026-05-01T08:30:00Z
updated_at: 2026-05-06T15:00:00Z
state: open
labels: [HDRI, 光照, 渲染, 教程]
# HDRI环境光照使用指南

## 什么是HDRI

HDRI（High Dynamic Range Imaging，高动态范围图像）是一种包含真实世界光照信息的360度全景图像。

## HDRI的优势

- 🌍 真实的环境光照
- ✨ 准确的反射
- ⚡ 快速设置场景
- 🎨 一致的光照氛围

## 使用HDRI

### Blender中使用

```
1. 切换到Shading工作区
2. 在Shader Editor中选择World
3. 添加Environment Texture节点
4. 加载HDRI文件（.hdr或.exr）
5. 连接到Background节点
```

