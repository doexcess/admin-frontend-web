import { NotificationType } from '@/lib/utils';

export interface Business {
  id: string;
  business_name: string;
  user: { id: true; name: true };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType; // extend as needed
  status: boolean;
  is_scheduled: boolean;
  business_id: string | null;
  created_at: string;
  business: Business | null; // adjust if business structure is known
  owner: {
    id: string;
    name: string;
    email: string;
    role: {
      role_id: string;
    };
    profile: {
      id: string;
      user_id: string;
      profile_picture: string;
      address: string;
      bio: string;
      date_of_birth: string;
      gender: string | null;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      country: string;
      state: string | null;
      country_code: string;
    };
  };
}

export interface NotificationResponse {
  statusCode: number;
  data: Notification[];
  count: number;
}
