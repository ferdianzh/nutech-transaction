export interface Profile {
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  profile_image: string | null;
}

export interface CreateProfileDto {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface UpdateProfileDto {
  first_name?: string;
  last_name?: string;
  profile_image?: string;
}
