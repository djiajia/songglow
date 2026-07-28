# @songglow/web

这是 SongGlow 的 Vercel + Supabase 主应用。

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

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_BUCKET`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_TOKEN`

## 说明

- 曲库元数据使用 Supabase Postgres
- 音频和封面使用 Supabase Storage
- 当前后台是轻量密码保护版本，适合第一版部署到 Vercel
