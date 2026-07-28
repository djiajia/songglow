# @songglow/web

这是 SongGlow 的 Vercel 全栈主应用。

## 页面

- `/`：曲库首页
- `/songs/[id]`：歌曲播放页
- `/admin/login`：后台登录页
- `/admin`：后台上传页

## API

- `GET /api/health`
- `GET /api/songs`
- `GET /api/songs/:id`
- `POST /api/songs`
- `DELETE /api/songs/:id`
- `POST /api/admin/login`
- `POST /api/admin/logout`

## 环境变量

- `POSTGRES_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NO_SSL`
- `VERCEL_BLOB_READ_WRITE_TOKEN`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_TOKEN`

## 说明

- 曲库元数据使用 `@vercel/postgres`
- 音频和封面使用 `@vercel/blob`
- 当前后台是轻量密码保护版本，适合第一版部署到 Vercel
