---
title: PBR材质系统详解
issue_number: 3
author: testuser
created_at: 2026-05-08T16:00:00Z
updated_at: 2026-05-11T08:15:00Z
state: open
labels: [材质, PBR, 渲染, 进阶]
---
# PBR材质系统详解

## 什么是PBR

PBR（Physically Based Rendering，基于物理的渲染）是一种通过模拟光线在真实世界中的行为来渲染材质的方法。

## PBR的优势

- ✅ 物理准确性：在各种光照条件下都能保持一致
- ✅ 工作流简化：参数更直观易懂
- ✅ 跨平台一致性：在不同渲染引擎中效果相似
- ✅ 真实感：能够产生更加真实的视觉效果

## 核心概念

### 1. 能量守恒

反射光和折射光的总和不能超过入射光。这是PBR的基础物理定律。

### 2. 菲涅尔效应（Fresnel Effect）

在掠射角观察物体时，反射会变强。例如，水面在正面看是透明的，在侧面看是反射的。

### 3. 微表面理论

即使看起来光滑的表面，在微观层面也是粗糙的。表面的粗糙度影响光线的散射。

## PBR材质参数

### Metallic/Roughness工作流

这是最常用的PBR工作流。

#### 基础色（Base Color/Albedo）

- 材质的固有颜色
- 不包含光照信息
- 金属：应该很暗（< 50%亮度）
- 非金属：通常在50-240 sRGB范围

#### 金属度（Metallic）

- 0 = 非金属（电介质）
- 1 = 金属
- 通常是二元值（0或1）
- 中间值用于过渡或脏污效果

#### 粗糙度（Roughness）

- 0 = 完全光滑（镜面反射）
- 1 = 完全粗糙（漫反射）
- 控制高光的大小和清晰度

### Specular/Glossiness工作流

较老的工作流，现在较少使用。

- **Diffuse**：漫反射颜色
- **Specular**：镜面反射颜色和强度
- **Glossiness**：光泽度（粗糙度的反向）

## 常见材质示例

### 金属材质

```
Albedo: 很暗的灰色或有色调的灰色
Metallic: 1.0
Roughness: 0.2-0.8（取决于金属类型）
```

**示例**：
- 抛光金属：Roughness 0.1-0.3
- 旧金属：Roughness 0.5-0.8

### 塑料材质

```
Albedo: 鲜艳的颜色
Metallic: 0.0
Roughness: 0.3-0.6
```

### 木材

```
Albedo: 棕色/木纹贴图
Metallic: 0.0
Roughness: 0.6-0.9
```

### 玻璃

```
Albedo: 很暗或黑色
Metallic: 0.0
Roughness: 0.0-0.1
Transmission: 1.0（如果支持）
```

## 纹理贴图

### 常用贴图类型

1. **Base Color Map** - 基础颜色
2. **Normal Map** - 法线贴图（细节凹凸）
3. **Roughness Map** - 粗糙度贴图
4. **Metallic Map** - 金属度贴图
5. **Ambient Occlusion (AO)** - 环境光遮蔽
6. **Height/Displacement Map** - 高度/置换贴图

### 贴图格式建议

- **颜色贴图**：PNG/JPG（sRGB色彩空间）
- **数据贴图**（粗糙度、金属度等）：PNG（线性空间）
- **法线贴图**：PNG（保留细节）

## 在不同引擎中使用PBR

### Blender（Principled BSDF）

```
Base Color → 基础颜色
Metallic → 金属度
Roughness → 粗糙度
Normal → 法线（需通过法线贴图节点）
```

### Unity（Standard Shader）

```
Albedo → 基础颜色
Metallic → 金属度
Smoothness → 光滑度（1-粗糙度）
Normal Map → 法线贴图
```

### Unreal Engine

```
Base Color → 基础颜色
Metallic → 金属度
Roughness → 粗糙度
Normal → 法线
```

### Three.js（MeshStandardMaterial）

```javascript
const material = new THREE.MeshStandardMaterial({
  map: colorTexture,           // 基础颜色
  normalMap: normalTexture,    // 法线
  roughnessMap: roughnessTexture,
  metalnessMap: metalnessTexture,
  aoMap: aoTexture
});
```

## PBR调试技巧

### 检查清单

- ✅ 确保颜色空间正确（sRGB vs Linear）
- ✅ 金属度通常是0或1，很少中间值
- ✅ 避免纯黑色（0,0,0）和纯白色（255,255,255）
- ✅ 使用环境光遮蔽增强深度感
- ✅ 法线贴图强度适中，不要过度

### 常见错误

- ❌ 非金属使用过亮的基础色
- ❌ 金属使用过亮的基础色
- ❌ 粗糙度设置为0（除非真的需要镜面）
- ❌ 忽略菲涅尔效应

## 资源推荐

- **Substance 3D Painter**：专业PBR纹理绘制
- **Quixel Megascans**：高质量PBR扫描资产
- **PBR材质库**：CC0 Textures, Poly Haven
- **验证工具**：Marmoset Toolbag PBR验证器

## 总结

PBR是现代3D渲染的标准，掌握PBR材质系统能让你的作品更加专业和真实。记住能量守恒和物理准确性是关键。

