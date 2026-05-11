---
title: Three.js快速入门指南
issue_number: 2
author: testuser
created_at: 2026-05-09T14:30:00Z
updated_at: 2026-05-11T09:30:00Z
state: open
labels: [WebGL, Three.js, 前端, JavaScript, 教程]
# Three.js快速入门指南

## 什么是Three.js

Three.js是一个轻量级的3D JavaScript库，它封装了WebGL的复杂性，让在网页上创建3D场景变得简单。

## 安装

### 通过NPM安装

```bash
npm install three
```

### 通过CDN引入

```html
<script type="module">
  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
</script>
```

## 基础概念

### 三大核心要素

1. **场景（Scene）**：3D世界的容器
2. **相机（Camera）**：观察3D世界的视角
3. **渲染器（Renderer）**：将场景渲染到画布

## 创建第一个场景

```javascript
import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,                                   // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1,                                  // 近裁剪面
  1000                                  // 远裁剪面
);
camera.position.z = 5;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  
  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();
```

## 常用几何体

```javascript
// 立方体
const box = new THREE.BoxGeometry(1, 1, 1);

// 球体
const sphere = new THREE.SphereGeometry(1, 32, 32);

// 圆柱体
const cylinder = new THREE.CylinderGeometry(1, 1, 2, 32);

// 平面
const plane = new THREE.PlaneGeometry(5, 5);

// 圆环
const torus = new THREE.TorusGeometry(1, 0.4, 16, 100);
```

## 材质类型

### 基础材质（MeshBasicMaterial）
不受光照影响，显示纯色或纹理。

```javascript
const material = new THREE.MeshBasicMaterial({ 
  color: 0xff0000,
  wireframe: true 
});
```

### 标准材质（MeshStandardMaterial）
支持物理渲染（PBR），需要光源。

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0.5
});
```

## 添加光源

```javascript
// 环境光
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);
```

## 响应式设计

```javascript
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## 常用插件

- **OrbitControls**：轨道控制器，鼠标交互
- **GLTFLoader**：加载GLTF/GLB 3D模型
- **GUI**：调试界面

## 下一步学习

- 加载3D模型
- 添加纹理
- 粒子系统
- 后期处理
- 物理引擎集成

