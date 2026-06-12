# 书香阁 - 个人小说阅读站

一个基于 Next.js + Supabase 的全栈小说阅读网站。

## 功能特点

- 📱 手机/电脑自适应，阅读体验优秀
- 📖 小说管理后台（添加/编辑/删除）
- 📝 章节管理（添加/编辑/删除，自动编号）
- 🔍 搜索小说（按标题、作者、标签）
- 🌙 暗黑模式切换
- 🏷️ 标签系统
- 🔐 管理后台密码保护

## 技术栈

- **框架**: Next.js 16 (App Router)
- **数据库**: Supabase (PostgreSQL)
- **样式**: Tailwind CSS 4
- **部署**: Vercel (推荐)

## 快速开始

### 1. 创建 Supabase 项目

1. 前往 [supabase.com](https://supabase.com) 注册并创建项目
2. 在项目 Settings → Database 中获取数据库连接信息
3. 在项目 Settings → API 中获取 `Project URL` 和 `anon public key`
4. 进入 SQL Editor，运行 `supabase-schema.sql` 中的 SQL 创建表

### 2. 配置环境变量

复制 `.env.local` 文件，填入你的 Supabase 配置：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_PASSWORD=your-admin-password
```

### 3. 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000 即可使用

### 4. 部署到 Vercel

1. 将代码推送到 GitHub 仓库
2. 前往 [vercel.com](https://vercel.com) 导入仓库
3. 在环境变量中填入上述 Supabase 配置
4. 部署后即可通过生成的 URL 访问

## 使用指南

1. 访问 `/admin` 进入管理后台（需输入密码）
2. 添加小说：填写标题、作者、简介、标签等信息
3. 为小说添加章节：按章节号顺序添加正文内容
4. 在首页浏览小说，点击进入阅读
5. 阅读界面可调整字体大小、切换主题、查看目录
