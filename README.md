# 易宿酒店预订平台🏨
第五期携程训练营22组大作业的一个简陋版本，实现了一些基础功能，持续优化中，有问题欢迎在issues提出。
面向“用户端 + 商户端 + 服务端”的酒店预订平台，采用 pnpm monorepo多包管理，包含完整的酒店创建、审核发布、搜索筛选与房型管理流程。
城市目前只支持省级行政区及其下方的地级市行政单位。

## 技术栈

**Monorepo / 工程化**
- pnpm workspace 实现 Monorepo 统一管理，TS 保证全栈类型安全

**服务端**
- Node.js + Express
（轻量、灵活，快速搭建 RESTful API
- Prisma ORM + MySQL
（数据库，prisma migrate 管理数据库表结构变更，根据 schema.prisma 生成 TS 类型，便于复用
- JWT 认证、bcryptjs、multer、helmet、cors、express-validator
（覆盖鉴权、密码安全、文件上传、参数校验、跨域、安全防护等

**商户端 PC**
- React 18 + Vite（Vite启动比Webpack快点，也更适配 React 18 的并发特性
- Ant Design（题目允许使用开源UI库，找了找感觉这个美观一点
- React Router（管理路由，普通商户只能看自己的酒店数据，管理员能看所有
- Zustand（通过 hooks 管理全局状态，对标vue的piania
- Axios（作为统一的 HTTP 客户端，用来与服务端 API 交互
- React Hook Form + Zod（表单校验

**用户端（H5/小程序）**
- Taro 3.x + React（按照题目技术栈要求使用Taro，将一套代码编译为 H5、小程序等多端
- Taro UI
- Zustand（同PC端
- dayjs（实现简单的时间处理
- Less（样式预处理

**共享包**
- `@hotel/api-sdk`：统一请求封装（Axios）
- `@hotel/shared-types`：共享类型定义
- `@hotel/shared-utils`：共享工具与城市数据

## 功能概览

**用户端（移动端）**
- 城市选择（热门/搜索/字母索引）
- 日期选择、关键词搜索、星级/价格/标签筛选
- 酒店列表分页、价格排序
- 酒店详情、房型展示

**商户端（PC）**
- 登录 / 注册（商户 / 管理员角色）
- 酒店管理：创建、编辑、删除、提交审核
- 审核流程：通过 / 拒绝（记录原因）
- 上下线 / 恢复
- 房型管理（新增/编辑/删除）

**服务端 API**
- 认证：注册 / 登录 / JWT
- 酒店：CRUD、审核、发布、上下线、公开查询
- 房型：酒店房型管理

## 项目结构

```
hotel-booking-platform/
├── apps/
│   ├── server/              # Node.js + Express + Prisma 服务端
│   ├── user-mobile/         # Taro + React 移动端
│   └── merchant-pc/         # React + Ant Design PC端
├── packages/
│   ├── api-sdk/             # 统一 API 请求层
│   ├── shared-types/        # 共享类型定义
│   └── shared-utils/        # 共享工具函数
└── package.json
```

## 使用该仓库

1. 克隆仓库：
   ```bash
   git clone <your-repo-url>
   cd YiSu-HotelBooking
   ```
2. 安装依赖（Node.js >= 18、pnpm >= 8）：
   ```bash
   pnpm install
   ```
3. 配置数据库并启动服务端：
   ```bash
   cd apps/server
   cp .env.example .env
   # 修改 .env 中的 DATABASE_URL
   pnpm db:migrate
   pnpm dev
   ```
4. 启动商户端 / 移动端（回到根目录执行）：
   ```bash
   cd ../..
   pnpm dev:pc
   pnpm --filter @hotel/user-mobile dev:h5
   ```

## 启动

### 1. 安装依赖

```bash
cd hotel-booking-platform
pnpm install
```

### 2. 配置数据库

```bash
cd apps/server
cp .env.example .env
# 修改 .env 中的 DATABASE_URL
pnpm db:migrate
```

### 3. 启动服务端

```bash
pnpm dev:server
```

### 4. 启动商户端 PC

```bash
pnpm dev:pc
```

### 5. 启动用户端（移动端）

H5：
```bash
pnpm --filter @hotel/user-mobile dev:h5
```

微信小程序：开发中

运行端口、移动端 API Host 与接口文档详见：`docs/REFERENCE.md`

## 部署说明

### 服务端
1. 配置环境变量（示例如下）：
   - `DATABASE_URL`（MySQL 连接串）
   - `JWT_SECRET`
   - `PORT`（默认 3000，推荐 3001）
   - `UPLOAD_DIR`（可选，默认 `./uploads`）
2. 运行迁移并生成 Prisma Client：
   ```bash
   pnpm --filter @hotel/server db:migrate
   pnpm --filter @hotel/server db:generate
   ```
3. 构建与启动：
   ```bash
   pnpm --filter @hotel/server build
   pnpm --filter @hotel/server start
   ```

### 商户端 PC
1. 构建：
   ```bash
   pnpm --filter @hotel/merchant-pc build
   ```
2. 部署 `apps/merchant-pc/dist` 到静态服务器（Nginx/OSS/CDN 等）。
3. 如需自定义后端地址，设置环境变量：
   - `VITE_API_URL=http://your-domain/api`

### 用户端（H5）
1. 构建：
   ```bash
   pnpm --filter @hotel/user-mobile build:h5
   ```
2. 部署 `apps/user-mobile/dist` 到静态服务器。
3. 如果后端不在同域，建议通过环境变量指定：
   - `TARO_APP_API_HOST=your-domain`

## 审核流程

```
商户创建 → 审核中 → 管理员审核
                ↓
        ┌───────┴───────┐
      通过            不通过（显示原因）
        ↓                ↓
    已发布          退回修改
        ↓                ↓
    可下线          重新提交
        ↓
    已下线（可恢复）
```

## 数据库表结构

- **users**：用户表（商户 / 管理员）
- **hotels**：酒店表
- **rooms**：房型表
- **audits**：审核记录表

## 开发者
22组
YuanFun
