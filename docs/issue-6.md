---
title: 游戏角色建模流程
issue_number: 6
author: testuser
created_at: 2026-05-05T09:15:00Z
updated_at: 2026-05-10T14:30:00Z
state: open
labels: [建模, 角色, 游戏开发, 流程, ZBrush]
# 游戏角色建模流程

## 概述

游戏角色建模是一个多阶段的流程，从概念设计到最终的游戏资产，需要经过多个步骤。

## 完整流程

```
概念设计 → 基础模型 → 高模雕刻 → 拓扑重建 → UV展开 
→ 烘焙贴图 → 纹理绘制 → 绑定 → 导入引擎
```

## 第一阶段：概念设计

### 准备工作

- 📋 角色设定文档
- 🎨 概念原画/参考图
- 📐 三视图（正面、侧面、背面）

### 关键要素

- 角色性格和背景
- 服装和装备设计
- 配色方案
- 细节设计（纹理、配饰）

## 第二阶段：基础模型（Blockout）

使用Blender/Maya等创建基础形状。

### 目标

- 建立正确的比例
- 确定主要形态
- 低多边形计数
- 不关注细节

### 步骤

```
1. 从基础几何体开始（立方体、球体）
2. 使用挤出、循环切割等基础工具
3. 保持模型对称（使用镜像修改器）
4. 关注整体轮廓
5. 多次对比参考图调整比例
```

## 第三阶段：高模雕刻

在ZBrush或Blender Sculpting中进行。

### ZBrush工作流

#### 1. 导入基础模型

```
Tool → Import → 选择OBJ/FBX文件
```

#### 2. 细分模型

```
Tool → Geometry → Divide
通常需要5-7级细分
```

#### 3. 常用笔刷

- **Standard**: 基础雕刻
- **Clay Buildup**: 添加体积
- **Dam Standard**: 创建凹陷
- **Move**: 调整形状
- **Smooth**: 平滑表面
- **Inflate**: 膨胀
- **Pinch**: 收缩边缘

#### 4. 细节添加

```
从大到小的顺序：
1. 大型形体调整
2. 中型细节（肌肉、褶皱）
3. 小型细节（毛孔、皱纹）
```

### Blender Sculpting

```
切换到Sculpting工作区
常用笔刷：
- Draw: 绘制
- Grab: 抓取
- Crease: 折痕
- Smooth: 平滑
- Clay Strips: 粘土条
```

### 雕刻技巧

- ✅ 从整体到局部
- ✅ 经常使用Smooth笔刷
- ✅ 使用参考图片
- ✅ 定期保存进度
- ✅ 使用Dynamic Topology（动态拓扑）

## 第四阶段：拓扑重建（Retopology）

将高模重新拓扑为低模，用于游戏引擎。

### 为什么需要重拓扑？

- 🎮 游戏引擎需要低面数
- 📐 需要良好的拓扑结构
- 🔄 便于动画绑定
- 🎨 更好的UV展开

### 多边形预算

```
手游角色：5,000 - 10,000 三角面
PC/主机游戏：15,000 - 30,000 三角面
次世代角色：30,000 - 100,000 三角面
```

### 拓扑原则

#### 边流（Edge Flow）

- 沿着肌肉方向
- 关节处形成环形
- 避免三角形和N-gon（除非必要）

#### 关键区域

**面部**：
- 眼睛周围：同心环
- 嘴巴：放射状
- 鼻子：菱形结构

**身体**：
- 肩膀：扇形
- 手肘/膝盖：环形
- 手部：密集网格

### 拓扑工具

**Blender**：
- Poly Build工具
- Shrinkwrap修改器
- Snap to Surface

**专业软件**：
- Topogun
- 3D-Coat
- Maya Quad Draw

## 第五阶段：UV展开

参考Issue #5的详细教程。

### 角色UV策略

```
头部：一个UV岛（或左右分开）
身体：前后分开
四肢：内外侧分开
手部：独立UV岛
```

### 纹理密度

确保重要部位有更高的分辨率：
- 头部：最高
- 手部：高
- 身体：中
- 腿部/脚部：中低

## 第六阶段：烘焙贴图

将高模细节烘焙到低模的贴图上。

### 常用贴图类型

- **Normal Map**：法线贴图（最重要）
- **Ambient Occlusion**：环境光遮蔽
- **Curvature**：曲率
- **Thickness**：厚度
- **World Space Normal**：世界空间法线

### Substance Painter烘焙

```
1. 导入低模FBX
2. Bake Mesh Maps
3. 添加高模（High Definition Meshes）
4. 设置参数：
   - Output Size: 2048/4096
   - Anti-aliasing: 4x
5. Bake选中的贴图
```

### Marmoset Toolbag烘焙

```
1. Load High模型（设置为High）
2. Load Low模型（设置为Low）
3. Bake → 选择贴图类型
4. 调整Cage参数避免错误
```

## 第七阶段：纹理绘制

使用Substance Painter、3D-Coat或Blender Texture Paint。

### Substance Painter工作流

#### 1. 建立材质ID

使用颜色分离不同材质部分。

#### 2. 基础材质

```
添加Fill Layer：
- 皮肤：Skin材质
- 布料：Fabric材质
- 金属：Metal材质
```

#### 3. 添加细节

- Dirt/Dust生成器
- Edge Wear（边缘磨损）
- 手绘细节
- Decals（贴花）

#### 4. 导出贴图

```
File → Export Textures
选择目标引擎预设：
- Unity
- Unreal Engine
- Custom
```

## 第八阶段：绑定（Rigging）

创建骨骼系统，使角色可以动画。

### 基础骨骼结构

```
根骨骼（Root）
├── 髋部（Hips）
│   ├── 脊椎（Spine）
│   │   ├── 胸部（Chest）
│   │   │   ├── 颈部（Neck）
│   │   │   │   └── 头部（Head）
│   │   │   ├── 左肩（L_Shoulder）
│   │   │   │   └── 左臂（L_Arm）→ 前臂 → 手
│   │   │   └── 右肩（R_Shoulder）
│   ├── 左腿（L_Leg）
│   │   └── 大腿 → 小腿 → 脚
│   └── 右腿（R_Leg）
```

### IK/FK

- **FK（Forward Kinematics）**：父骨骼影响子骨骼
- **IK（Inverse Kinematics）**：子骨骼影响父骨骼

### 权重绘制（Weight Painting）

控制骨骼对顶点的影响程度。

```
权重值：0（不影响）到1（完全影响）
重点区域：关节、肩膀、髋部
```

## 第九阶段：导入引擎

### Unity

```
1. 导出FBX
2. 拖入Unity
3. 设置Rig为Humanoid
4. 配置Avatar
5. 应用材质和纹理
```

### Unreal Engine

```
1. 导出FBX（带动画和贴图）
2. Import to Content Browser
3. 设置Skeletal Mesh
4. 创建材质实例
5. 应用纹理
```

## 优化技巧

### LOD（Level of Detail）

创建多个细节级别：
- LOD0：最高细节（近距离）
- LOD1：中等细节
- LOD2：低细节（远距离）

### 纹理优化

- 使用纹理压缩
- 合理选择分辨率
- 合并材质（减少Draw Call）

### 性能考虑

- 控制多边形数量
- 避免过多材质
- 使用贴图LOD
- 优化骨骼数量

## 工具链推荐

- **雕刻**：ZBrush / Blender
- **建模**：Maya / Blender / 3ds Max
- **拓扑**：Topogun / 3D-Coat
- **纹理**：Substance Painter / Mari
- **烘焙**：Marmoset Toolbag / Substance Painter

