# Vercel项目监控看板

一个现代化、简约炫酷的Vercel项目监控看板，使用React + TypeScript + Aceternity UI构建。

## ✨ 特性

- 🎨 **现代化UI**: 使用Aceternity UI组件库，简约炫酷的设计
- 📊 **数据可视化**: 丰富的图表展示访问量、性能等关键指标
- 🔄 **实时监控**: 实时数据更新和状态监控
- 📱 **响应式设计**: 支持桌面端、平板端、移动端
- 🌙 **主题切换**: 支持深色/浅色主题
- ⚡ **高性能**: 使用Vite构建，快速加载
- 🔒 **安全**: 本地存储Token，数据安全

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **UI组件**: Aceternity UI + Tailwind CSS
- **状态管理**: Zustand
- **图表库**: Recharts
- **动画**: Framer Motion
- **构建工具**: Vite
- **路由**: React Router v6

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>
cd vercel-dashboard

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🛠️ 开发

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 代码检查
npm run lint
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── ui/             # 基础UI组件
│   ├── Layout.tsx      # 布局组件
│   ├── ProjectList.tsx # 项目列表组件
│   ├── AnalyticsChart.tsx # 图表组件
│   └── RealtimeStats.tsx # 实时统计组件
├── pages/              # 页面组件
│   ├── Dashboard.tsx   # 仪表板页面
│   ├── Projects.tsx    # 项目页面
│   ├── Analytics.tsx   # 分析页面
│   ├── Settings.tsx    # 设置页面
│   └── Login.tsx       # 登录页面
├── store/              # 状态管理
│   └── index.ts        # Zustand store
├── services/           # API服务
│   └── api.ts          # API接口
├── types/              # TypeScript类型定义
│   └── index.ts        # 类型定义
├── utils/              # 工具函数
│   └── index.ts        # 通用工具函数
├── App.tsx             # 应用入口
└── main.tsx            # 应用启动
```

## 🎯 功能特性

### 核心功能
- ✅ 项目概览和状态监控
- ✅ 访问量数据可视化
- ✅ 性能指标监控
- ✅ 实时数据更新
- ✅ 多项目对比分析

### 高级功能
- ✅ 自定义看板布局
- ✅ 数据导出功能
- ✅ 主题切换
- ✅ 响应式设计
- ✅ 实时通知

## 🔧 配置

### 简化配置 - 只需要项目URL
1. 访问配置页面（左侧导航 → 配置）
2. 输入您的Vercel项目地址，例如：`https://my-project.vercel.app`
3. 系统会自动获取项目信息（名称、框架、区域等）

### 环境变量（可选）
创建 `.env.local` 文件：
```env
VITE_VERCEL_TOKEN=your_vercel_api_token_here
VITE_API_BASE_URL=https://api.vercel.com
VITE_ENABLE_MOCK_DATA=false
VITE_APP_TITLE=Vercel Dashboard
```

### 配置文件
在 `src/config/vercel.ts` 中直接添加您的项目URL：
```typescript
projectUrls: [
  'https://your-project1.vercel.app',
  'https://your-project2.vercel.app',
  'https://your-project3.vercel.app'
]
```

## 📊 数据指标

### 基础指标
- 页面浏览量 (PV)
- 独立访客数 (UV)
- 跳出率
- 平均会话时长
- 响应时间
- 错误率

### 高级指标
- 地理位置分布
- 设备类型统计
- 浏览器统计
- 流量来源分析
- 核心Web指标

## 🎨 设计系统

### 颜色主题
- 主色调: 蓝色系 (#3B82F6)
- 成功色: 绿色系 (#10B981)
- 警告色: 黄色系 (#F59E0B)
- 错误色: 红色系 (#EF4444)

### 动画效果
- 页面切换: 滑动动画
- 卡片悬停: 缩放效果
- 数据更新: 数字变化动画
- 图表渲染: 渐入动画

## 📱 响应式设计

- **桌面端**: 完整功能展示
- **平板端**: 适配触摸操作
- **移动端**: 简化界面，核心功能

## 🔒 安全特性

- 本地Token存储
- API请求加密
- 用户权限控制
- XSS防护

## 🚀 部署

### Vercel部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署到Vercel
vercel --prod
```

### 其他平台
- Netlify
- GitHub Pages
- 自建服务器

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vercel](https://vercel.com) - 提供优秀的部署平台
- [Aceternity UI](https://ui.aceternity.com) - 现代化的UI组件库
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的CSS框架
- [Framer Motion](https://www.framer.com/motion/) - 强大的动画库
- [Recharts](https://recharts.org) - 优雅的图表库

## 📞 支持

如果您遇到任何问题或有建议，请：

1. 查看 [Issues](https://github.com/your-repo/issues)
2. 创建新的Issue
3. 联系开发团队

---

**享受监控您的Vercel项目！** 🎉