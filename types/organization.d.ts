export interface Role {
  id: string;
  name: string;
  role_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  created_at: string;
  updated_at: string;
  role: Role;
}

export interface Business {
  id: string;
  user_id: string;
  business_name: string;
  business_size: 'small' | 'medium' | 'large';
  timeline: string;
  logo_url: string;
  industry: string;
  working_hours: string | null;
  location: string;
  state: string | null;
  country: string;
  country_code: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export type BusinessResponse = {
  statusCode: number;
  data: Business[];
  count: number;
};
