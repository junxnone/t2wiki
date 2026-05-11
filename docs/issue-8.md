---
title: Substance Designer参数化材质制作
issue_number: 8
author: testuser
created_at: 2026-05-03T10:50:00Z
updated_at: 2026-05-08T12:20:00Z
state: open
labels: [材质, Substance, 程序化, 教程]
# Substance Designer参数化材质制作

## 什么是Substance Designer

Substance Designer是Adobe旗下的程序化材质创作工具，使用节点创建可参数化、可平铺的材质。

## 为什么使用SD

### 优势

- 🔁 **可重复使用**：创建参数可调的材质
- 📦 **小文件体积**：生成材质而非存储位图
- 🎚️ **无限变化**：通过参数调整产生不同效果
- 🔄 **完美平铺**：自动生成无缝纹理
- 🚀 **工业标准**：游戏行业广泛使用

### 应用场景

- 游戏材质库
- 程序化环境
- 可调节资产
- 材质系统开发

## 界面布局

```
┌─────────────────────────────────────────┐
│  Library   │   Graph   │   3D View      │
│  (资源库)   │  (节点图)  │  (3D预览)       │
├─────────────────────────────────────────┤
│  Parameters  │  2D View (2D预览)        │
│  (参数面板)   │                          │
└─────────────────────────────────────────┘
```

## 基础概念

### 节点类型

1. **Generators（生成器）**
   - 创建基础图案
   - Noise, Shapes, Patterns

2. **Filters（滤镜）**
   - 修改输入图像
   - Blur, Sharpen, Transform

3. **Blends（混合）**
   - 混合多个输入
   - Add, Multiply, Overlay

4. **Procedurals（程序化）**
   - 复杂的程序化效果
   - Scratches, Dirt, Cracks

### 灰度值

- 黑色（0）到白色（1）
- 表示高度、粗糙度等属性
- 大部分节点处理灰度

### PBR输出

标准材质需要以下输出：

- **Base Color** - 基础颜色（彩色）
- **Normal** - 法线贴图
- **Roughness** - 粗糙度
- **Metallic** - 金属度
- **Height** - 高度/置换
- **Ambient Occlusion** - AO

## 创建第一个材质：木板

### 步骤1：创建基础高度

```
1. Tile Sampler节点
   - 加载木板纹理或生成木板形状
   - 调整Pattern Size创建多块木板
   - 调整Pattern Offset产生错位

2. Levels节点
   - 调整对比度
   - 定义高度范围
```

### 步骤2：添加细节

```
1. Grunge Map节点
   - 添加磨损效果
   - 混合到高度图

2. Scratches节点
   - 创建划痕
   - 使用Blend节点叠加

3. Edge Damage节点
   - 添加边缘磨损
```

### 步骤3：生成法线

```
Normal节点
- 输入：Height Map
- 输出：Normal Map
- 调整Normal Intensity
```

### 步骤4：创建粗糙度

```
1. 复制高度图
2. 反转（Invert）
3. 调整对比度
4. 添加变化（Noise）
```

### 步骤5：添加颜色

```
1. Gradient Map节点
   - 输入灰度图
   - 映射到颜色渐变
   - 木板：棕色渐变

2. Dirt节点
   - 添加脏污
   - Blend到Base Color
```

### 步骤6：创建参数

```
右键节点 → Expose Parameters
创建可调参数：
- Wood Color
- Wear Amount
- Scratch Density
- Board Width
```

## 常用节点详解

### 生成器

#### Clouds 2

创建云状噪声，基础噪声之一。

```
参数：
- Scale: 噪声大小
- Roughness: 粗糙度
- Disorder: 混乱度
```

#### Tile Generator

创建重复图案。

```
参数：
- X/Y Amount: 瓦片数量
- Pattern: 图案类型
- Offset: 偏移量
```

#### Shape

创建基本形状（圆、方、多边形）。

### 滤镜

#### Blur HQ Grayscale

高质量模糊。

```
用途：
- 柔化边缘
- 创建软阴影
- 模糊细节
```

#### Transformation 2D

变换图像。

```
操作：
- 移动
- 旋转
- 缩放
- 平铺模式
```

#### Levels

调整亮度和对比度。

```
参数：
- In Low/High: 输入范围
- Out Low/High: 输出范围
```

### 混合模式

```
Add: 相加
Multiply: 相乘
Overlay: 叠加
Screen: 滤色
Max: 取最大值
Min: 取最小值
```

## 高级技巧

### 1. 使用FX-Map创建复杂图案

FX-Map是强大的程序化工具。

```
1. 添加FX-Map节点
2. 在FX-Map内部添加形状
3. 使用参数控制分布
4. 添加迭代模式
```

**应用**：
- 砖墙
- 鹅卵石
- 瓦片

### 2. 创建Macro变化

使用大尺度噪声控制小尺度细节。

```
Clouds (大尺度) → Blend → 细节层
创建自然的变化分布
```

### 3. 边缘磨损技术

```
1. 生成高度图
2. Edge Detect节点检测边缘
3. 添加噪声和变化
4. Blend到粗糙度和颜色
```

### 4. 湿度贴图

模拟水分积聚。

```
1. AO或高度的反向
2. 使用Levels限制范围
3. 影响粗糙度（湿处更光滑）
4. 影响颜色（湿处更深）
```

## 性能优化

### 降低计算成本

- ⚡ 使用较低的Output Size预览
- ⚡ 避免过多的Blur节点
- ⚡ 合并相似操作
- ⚡ 使用Mipmap设置

### 内存优化

- 💾 释放不用的节点（Right-click → Release）
- 💾 使用Switch节点条件执行
- 💾 合理设置节点分辨率

## 导出和使用

### 导出位图

```
File → Export Outputs
选择：
- 格式：PNG/TGA/TIF
- 分辨率：1K/2K/4K
- 位深度：8/16bit
```

### 导出SBSAR

```
File → Export as SBSAR
可在其他软件中使用：
- Substance Painter
- Unity
- Unreal Engine
- Maya/Max（插件）
```

### Unity集成

```
1. 导入SBSAR文件
2. 在Inspector调整参数
3. 生成纹理
4. 应用到材质
```

### Unreal集成

```
1. 导入SBSAR
2. 创建Material Instance
3. 在材质编辑器中调参
4. 实时更新
```

## 实例：金属材质

### 工作流程

```
1. Base Noise（基础噪声）
   ↓
2. Anisotropic Blur（各向异性模糊）
   ↓
3. Scratches（划痕）
   ↓
4. Rust（生锈，可选）
   ↓
5. Output（输出各贴图）
```

### 参数设置

```
Base Color: 深灰（金属）
Metallic: 0.9-1.0
Roughness: 0.2-0.6（参数化）
Scratch Amount: 可调参数
Rust Amount: 可调参数
```

## 学习资源

- **官方教程**：Substance Academy
- **社区资源**：Substance Share
- **视频教程**：YouTube频道
- **书籍**：《The Substance Designer Handbook》

## 最佳实践

- ✅ 从简单开始，逐步增加复杂度
- ✅ 经常参考真实世界照片
- ✅ 创建可重用的子图（Subgraph）
- ✅ 合理命名节点和参数
- ✅ 使用Frame组织节点图
- ✅ 添加注释说明复杂逻辑

