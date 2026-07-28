export type LyricLine = {
  start: number;
  end: number;
  en: string;
  zh: string;
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  difficulty: string;
  tags: string[];
  focus?: string;
  goal?: string;
  context?: string;
  audioUrl: string;
  coverUrl: string;
  lyrics: LyricLine[];
  createdAt?: number;
  updatedAt?: number;
};

