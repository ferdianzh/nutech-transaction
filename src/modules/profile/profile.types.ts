import z from "zod";

export interface Profile {
  id: string;
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

export const UpdateProfileSchema = z.object({
  first_name: z.string("Paramter first_name tidak sesuai format"),
  last_name: z.string("Paramter last_name tidak sesuai format"),
  profile_image: z
    .string("Parameter profile_image tidak sesuai format")
    .optional(),
});

export type UpdateProfileDto = z.infer<typeof UpdateProfileSchema>;
