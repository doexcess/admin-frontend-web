import { MultimediaProvider, MultimediaType } from '@/lib/utils';

export interface Media {
  id: string;
  url: string;
  type: MultimediaType; // Adjust if there are other types
  creator_id: string;
  business_id: string;
  provider: MultimediaProvider; // Adjust based on possible providers
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  deleted_at: string | null;
}
