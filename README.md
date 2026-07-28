# SongGlow（Vercel + Supabase）

这是当前 SongGlow 的可部署版本：

- 前端：Next.js App Router（`apps/web`）
- 后端接口：Next.js Route Handlers（同样在 `apps/web` 内）
- 数据库存储：Supabase Postgres
- 文件存储：Supabase Storage
- 后台鉴权：环境变量密码 + HttpOnly Cookie

项目已经去掉独立 Express 服务，部署时只需要把 `apps/web` 作为 Vercel 项目根目录。

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
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_BUCKET=songs
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

## Supabase 初始化

1. 在 Supabase 新建一个项目。
2. 打开 SQL Editor，执行根目录里的 `supabase-init.sql`。
3. 到 Storage 创建一个名为 `songs` 的 bucket，并设为 `Public`。
4. 如果你想用别的 bucket 名称，把 `SUPABASE_BUCKET` 改成对应值。

`supabase-init.sql` 会创建 `songs` 表，并保留当前项目使用的字段：

- 歌曲基础信息：`title`、`artist`、`difficulty`
- 学习信息：`tags`、`focus`、`goal`、`context`
- 媒体信息：`audio_url`、`cover_url`
- 存储路径：`audio_storage_path`、`cover_storage_path`
- 歌词 JSON：`lyrics`

## Vercel 部署

### 1. 导入项目

把当前仓库导入 Vercel，并把 `Root Directory` 设为：

```bash
apps/web
```

### 2. 配置环境变量

在 Vercel 项目里至少配置：

```bash
SUPABASE_URL=你的 Supabase Project URL
SUPABASE_SERVICE_ROLE_KEY=你的 service_role key
SUPABASE_BUCKET=songs
ADMIN_PASSWORD=你自己的后台密码
ADMIN_SESSION_TOKEN=一段随机长字符串
```

### 3. 部署后使用方式

- 打开 `/admin/login`
- 输入 `ADMIN_PASSWORD`
- 进入 `/admin` 上传音频、封面和歌词
- 首页 `/` 会通过服务端接口读取 Supabase 曲库

## 当前实现说明

- 歌曲元数据存放在 Supabase Postgres 的 `songs` 表
- 音频和封面上传到 Supabase Storage
- 播放页直接读取 Storage 的公网 URL
- 服务端使用 `SUPABASE_SERVICE_ROLE_KEY` 读写数据库和文件
- 后台采用轻量管理员密码保护，适合第一版上线

## 后续建议

- 增加更完整的后台权限体系
- 增加歌词逐句精讲编辑器
- 为大文件上传增加进度和失败重试
- 增加歌曲搜索、筛选和推荐能力
