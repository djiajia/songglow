create extension if not exists pgcrypto;

create table if not exists public.songs (
  id text primary key,
  title text not null,
  artist text not null,
  difficulty text not null default '未设置',
  tags jsonb not null default '[]'::jsonb,
  focus text not null default '',
  goal text not null default '',
  context text not null default '',
  audio_url text not null,
  cover_url text not null default '',
  audio_storage_path text not null default '',
  cover_storage_path text not null default '',
  lyrics jsonb not null default '[]'::jsonb,
  created_at bigint not null,
  updated_at bigint not null
);

create index if not exists songs_updated_at_idx on public.songs (updated_at desc);

insert into storage.buckets (id, name, public)
values ('songs', 'songs', true)
on conflict (id) do nothing;
