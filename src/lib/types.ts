export interface Novel {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_url: string;
  tags: string[];
  status: 'ongoing' | 'completed' | 'hiatus';
  created_at: string;
  updated_at: string;
}

export interface Chapter {
  id: string;
  novel_id: string;
  title: string;
  content: string;
  chapter_number: number;
  created_at: string;
  updated_at: string;
}

export type NovelFormData = {
  title: string;
  author: string;
  description: string;
  cover_url: string;
  tags: string;
  status: 'ongoing' | 'completed' | 'hiatus';
};

export type ChapterFormData = {
  title: string;
  content: string;
  chapter_number: number;
};
