import fs from "fs";
import path from "path";
import { NotFoundError } from "../../common/errors/not-found.error";
import { ProfileRepository } from "./profile.repository";
import { UpdateProfileDto } from "./profile.types";

export class ProfileService {
  constructor(private profileRepository = new ProfileRepository()) {}

  async findOne(email: string) {
    const profile = await this.profileRepository.findOne(email);
    return profile;
  }

  async update(email: string, updateDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne(email);
    if (!profile) {
      throw new NotFoundError("Profile tidak ditemukan");
    }
    const parsed = { ...profile, ...updateDto };

    await this.profileRepository.update(email, parsed);
    return parsed;
  }

  async updateImage(email: string, file?: Express.Multer.File) {
    const profile = await this.profileRepository.findOne(email);
    if (!profile) {
      throw new NotFoundError("Profile tidak ditemukan");
    }

    if (profile.profile_image) {
      const oldPath = path.join(process.cwd(), profile.profile_image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const profile_image = file ? `/uploads/${file.filename}` : null;
    const parsed = { ...profile, profile_image };
    await this.profileRepository.update(email, parsed);
    return parsed;
  }
}
