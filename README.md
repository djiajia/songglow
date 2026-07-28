# SongGlow（可部署到 Vercel 的 Next.js 全栈版本）

这是一个面向 Vercel 的 SongGlow 全栈项目：

- 前端：Next.js App Router（`apps/web`）
- 后端接口：Next.js Route Handlers（同样在 `apps/web` 内）
- 数据库存储：Vercel Postgres
- 文件存储：Vercel Blob
- 后台鉴权：环境变量密码 + HttpOnly Cookie

当前项目已经不再依赖独立 Express 服务，部署时只需要把 `apps/web` 作为 Vercel 项目根目录即可。

## 本地开发

1. 安装依赖

```bash
npm install
```

2. 复制环境变量模板

```bash
cp apps/web/.env.example apps/web/.env.local
```

3. 填写这些环境变量

```bash
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
VERCEL_BLOB_READ_WRITE_TOKEN=
ADMIN_PASSWORD=
ADMIN_SESSION_TOKEN=
```

4. 启动 Next.js

```bash
npm run dev
```

## 主要页面

- `/`：前台曲库首页
- `/songs/[id]`：歌曲播放页
- `/admin/login`：后台登录页
- `/admin`：后台上传页
- `/api/health`：健康检查

## 已实现的接口

- `GET /api/songs`
- `GET /api/songs/:id`
- `POST /api/songs`
- `DELETE /api/songs/:id`
- `POST /api/admin/login`
- `POST /api/admin/logout`

## Vercel 部署

### 1. 导入项目

把当前仓库导入 Vercel，并把 **Root Directory** 设为：

```bash
apps/web
```

### 2. 创建存储

在 Vercel 项目里挂载：

- Vercel Postgres
- Vercel Blob

然后把连接环境变量同步到项目。

### 3. 配置后台密码

至少设置：

```bash
ADMIN_PASSWORD=你自己的后台密码
ADMIN_SESSION_TOKEN=一段随机长字符串
```

### 4. 部署后使用方式

- 打开 `/admin/login`
- 输入 `ADMIN_PASSWORD`
- 进入 `/admin` 上传音频和歌词
- 首页 `/` 会直接从数据库读取曲库

## 当前实现说明

- 歌曲元数据存 PostgreSQL
- 音频与封面存 Vercel Blob
- 播放页直接读取 Blob 公网 URL
- 后台采用轻量管理员密码保护，适合第一版上线

## 后续建议

下一步如果继续做正式化，建议优先补：

- 更完整的后台权限体系
- 歌词逐句精讲编辑器
- 上传大文件时改为客户端直传 Blob
- 更完整的歌曲搜索、筛选和推荐能力
