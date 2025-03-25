// Business details
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

export interface BusinessResponse {
  statusCode: number;
  data: Business[];
  count: number;
}

// Business details by id
export interface Profile {
  profile_picture: string;
  gender: string;
  bio: string;
  state: string | null;
  country: string;
}

export interface UserDetails {
  name: string;
  profile: Profile;
  email: string;
  phone: string | null;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  profile: Profile;
  created_at: string;
  updated_at: string;
  role: Role;
}

export interface BusinessWallet {
  id: string;
  business_id: string;
  balance: string;
  previous_balance: string;
  currency: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OnboardingStatus {
  id: string;
  user_id: string;
  business_id: string;
  current_step: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BusinessDetails {
  id: string;
  user_id: string;
  business_name: string;
  business_size: string;
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
  withdrawal_account: string | null;
  business_wallet: BusinessWallet;
  onboarding_status: OnboardingStatus;
}

export interface BusinessDetailsResponse {
  statusCode: number;
  message: string;
  data: BusinessDetails;
}
