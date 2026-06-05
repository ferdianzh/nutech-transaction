import { ProfileRepository } from "./profile.repository";
import { UpdateProfileDto } from "./profile.types";

export class ProfileController {
  constructor(private profileRepository = new ProfileRepository()) {}

  async update(updateDto: UpdateProfileDto) {}
}
