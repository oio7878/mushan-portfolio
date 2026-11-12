# MUSHAN DESIGN · 设计与创新工作室

团队作品集网站 — React 18 + Vite 5。

暗色高级科技感（瓦罗兰特风格）：近黑底 + 红色 accent `#ff4655`、撞角切角、磨砂玻璃、故障终端背景 + 粒子光标。

## 运行

```bash
npm install
npm run dev      # 本地预览 http://localhost:5173
npm run build    # 构建到 dist/
```

## 结构

- `src/data.js` — 全部文案/项目数据集中管理
- `src/components/` — 各区块组件
- `public/assets/` — 作品图、成员头像、视频背景（由 PDF 内嵌资源生成）

## 页面

1. 全屏 Hero（故障终端视频背景）
2. 团队经历（成员 + 数据）
3. 精选作品（26 个项目，卡片式详情弹窗）
4. 标志设计（品牌标识瀑布流）
5. 团队优势（五大板块 + 流程）
6. 联系收尾页
