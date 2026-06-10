# 扬工智行项目结构

```text
yanggong-zhixing/
├─ app/
│  ├─ api/chat/route.ts        # Dify Chatflow API 服务端代理，支持 SSE 流式转发
│  ├─ about/page.tsx           # 关于项目与技术架构
│  ├─ care/page.tsx            # 心理关怀服务引导
│  ├─ chat/page.tsx            # 聊天页入口
│  ├─ globals.css              # Tailwind 全局样式、主题变量、毛玻璃效果
│  ├─ growth/page.tsx          # 成长规划诊断、雷达图、学习路线
│  ├─ layout.tsx               # Next.js 根布局与元信息
│  ├─ page.tsx                 # 首页 Dashboard
│  ├─ safety/page.tsx          # 安全教育与反诈卡片
│  └─ services/page.tsx        # 校园服务总览
├─ components/
│  ├─ ui/                      # shadcn/ui 风格基础组件
│  │  ├─ badge.tsx
│  │  ├─ button.tsx
│  │  └─ card.tsx
│  ├─ app-shell.tsx            # 全局导航、主题切换、页面背景
├─ lib/
│  ├─ campus-services.ts       # 六大校园服务配置与预设问题
│  └─ utils.ts                 # cn className 合并工具
├─ .env.example                # Dify 环境变量示例
├─ package.json
├─ tailwind.config.ts
└─ tsconfig.json
```

## 运行方式

```bash
npm install
npm run dev
```

配置真实 Dify Chatflow API 时，在 `.env.local` 中添加：

```bash
DIFY_API_KEY=your_dify_api_key
DIFY_API_URL=https://api.dify.ai/v1/chat-messages
```

未配置 `DIFY_API_KEY` 时，聊天页会使用本地模拟 SSE 回复，方便比赛演示和前端验收。
