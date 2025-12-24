# CubeCut 3D

立方体切割可视化教学工具，帮助学生理解立方体切割后各类小立方体的数量规律。

**在线演示**: https://lcpmarvel.github.io/cube-cut-3d/

## 功能

- 自定义立方体尺寸 (2×2×2 ~ 10×10×10)
- 切割动画演示
- 分离程度滑块控制
- 外表面涂色模拟
- 按涂色面数分类高亮 (0面/1面/2面/3面+)
- 统计各类小立方体数量
- 支持桌面端和移动端

## 技术栈

- React 18
- Three.js + React Three Fiber
- TypeScript
- Tailwind CSS
- Zustand
- GSAP
- Vite

## 开发

```bash
# 安装依赖
bun install

# 启动开发服务器
bun dev

# 构建生产版本
bun run build

# 预览生产版本
bun preview
```

## 操作说明

### 桌面端
- 鼠标左键拖拽：旋转视角
- 鼠标滚轮：缩放
- 鼠标右键拖拽：平移

### 移动端
- 单指拖动：旋转视角
- 双指捏合：缩放
- 双指拖动：平移
- 点击右侧「控制」按钮：打开控制面板

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. Source 选择 "GitHub Actions"
4. 推送到 `master` 分支后会自动构建部署

## License

MIT
