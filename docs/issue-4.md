---
title: Unity着色器编程入门
issue_number: 4
author: testuser
created_at: 2026-05-07T11:20:00Z
updated_at: 2026-05-11T07:45:00Z
state: open
labels: [Unity, 着色器, ShaderLab, 游戏开发, 教程]
---

# Unity着色器编程入门

**Issue #4** | **Author:** [@testuser](https://github.com/testuser) | **State:** open

**Labels:** Unity, 着色器, ShaderLab, 游戏开发, 教程
**Created:** 5/7/2026, 11:20:00 AM
**Updated:** 5/11/2026, 7:45:00 AM

---

## Unity着色器简介

Unity使用ShaderLab语言编写着色器，它包装了HLSL/Cg代码，并提供了额外的Unity特定功能。

## 着色器类型

### 1. Surface Shader（表面着色器）
- 最高级的抽象
- Unity自动处理光照
- 适合标准光照模型

### 2. Vertex/Fragment Shader（顶点/片段着色器）
- 更底层的控制
- 需要手动处理光照
- 更高的灵活性

### 3. Fixed Function Shader（固定功能着色器）
- 已废弃
- 用于老设备

## 第一个着色器

### 简单的颜色着色器

```shader
Shader "Custom/SimpleColor"
{
    Properties
    {
        _Color ("Main Color", Color) = (1,1,1,1)
    }
    
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
            };
            
            struct v2f
            {
                float4 pos : SV_POSITION;
            };
            
            fixed4 _Color;
            
            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                return o;
            }
            
            fixed4 frag(v2f i) : SV_Target
            {
                return _Color;
            }
            ENDCG
        }
    }
}
```

## 着色器结构

### Properties（属性块）

定义材质面板中可调整的参数。

```shader
Properties
{
    _MainTex ("Texture", 2D) = "white" {}
    _Color ("Color", Color) = (1,1,1,1)
    _Float ("Float", Float) = 1.0
    _Range ("Range", Range(0,1)) = 0.5
    _Vector ("Vector", Vector) = (0,0,0,0)
}
```

### SubShader

可以有多个SubShader，Unity会选择第一个兼容的。

```shader
SubShader
{
    Tags { "RenderType"="Opaque" "Queue"="Geometry" }
    LOD 200
    
    Pass
    {
        // Pass内容
    }
}
```

### Pass

一个Pass代表一次渲染通道。

## 纹理采样

```shader
Shader "Custom/TextureShader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
    }
    
    SubShader
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
            
            struct v2f
            {
                float4 pos : SV_POSITION;
                float2 uv : TEXCOORD0;
            };
            
            sampler2D _MainTex;
            float4 _MainTex_ST;
            
            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                return o;
            }
            
            fixed4 frag(v2f i) : SV_Target
            {
                return tex2D(_MainTex, i.uv);
            }
            ENDCG
        }
    }
}
```

## 光照计算

### Lambert光照模型

```shader
fixed4 frag(v2f i) : SV_Target
{
    fixed3 lightDir = normalize(_WorldSpaceLightPos0.xyz);
    fixed3 normal = normalize(i.normal);
    fixed ndotl = saturate(dot(normal, lightDir));
    
    fixed4 color = _Color * ndotl;
    return color;
}
```

### Blinn-Phong高光

```shader
// 在片段着色器中
fixed3 viewDir = normalize(_WorldSpaceCameraPos - i.worldPos);
fixed3 halfDir = normalize(lightDir + viewDir);
fixed spec = pow(saturate(dot(normal, halfDir)), _Glossiness);
fixed3 specular = _LightColor0.rgb * spec;
```

## 常用技巧

### 透明度

```shader
Tags { "Queue"="Transparent" "RenderType"="Transparent" }
Blend SrcAlpha OneMinusSrcAlpha
ZWrite Off
```

### 双面渲染

```shader
Cull Off
```

### 深度测试

```shader
ZTest Less      // 默认
ZTest Always    // 总是通过
ZTest Greater   // 大于时通过
```

## Shader Graph

Unity的可视化着色器编辑器（需要SRP）。

### 优点
- 无需编码
- 实时预览
- 节点化工作流

### 缺点
- 性能略低于手写
- 复杂效果受限

## 性能优化

### 最佳实践

1. **减少计算**
   - 在顶点着色器中计算，而非片段着色器
   - 预计算可以移到CPU的内容

2. **纹理优化**
   - 合理使用纹理分辨率
   - 使用纹理压缩
   - 合并纹理通道

3. **避免分支**
   - GPU不擅长条件语句
   - 使用lerp/step等函数替代if

4. **精度选择**
   ```shader
   fixed  - 低精度（-2到2）
   half   - 中精度（-60000到60000）
   float  - 高精度
   ```

## 常用内置函数

```shader
// 数学函数
abs(x)          // 绝对值
saturate(x)     // 钳制到0-1
lerp(a,b,t)     // 线性插值
pow(x,y)        // 幂运算
dot(a,b)        // 点积
cross(a,b)      // 叉积
normalize(v)    // 归一化

// 纹理采样
tex2D(tex, uv)
tex2Dlod(tex, float4(uv, 0, miplevel))
```

## 调试技巧

### 可视化变量

```shader
// 将值映射到颜色
return fixed4(uv.x, uv.y, 0, 1);  // UV可视化
return fixed4(normal * 0.5 + 0.5, 1);  // 法线可视化
```

### Frame Debugger

使用Unity的Frame Debugger查看渲染过程。

## 进阶主题

- 计算着色器
- 曲面细分着色器
- 几何着色器
- 后处理效果
- 自定义光照模型

---

[View on GitHub](https://github.com/user/t2wiki/issues/4)
