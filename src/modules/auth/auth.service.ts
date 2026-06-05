import { AuthError } from "../../common/errors/auth.error";
import { comparePassword, hashPassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { ProfileRepository } from "../profile/profile.repository";
import { LoginDto, RegisterDto } from "./auth.types";

export class AuthService {
  constructor(private profileRepository = new ProfileRepository()) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const profile = await this.profileRepository.findByEmail(email);

    if (!profile) {
      throw new AuthError("Username atau password salah", 103);
    }

    const isValid = await comparePassword(password, profile.password);

    if (!isValid) {
      throw new AuthError("Username atau password salah", 103);
    }

    const token = signToken({
      profileId: profile.id,
      email: profile.email,
    });

    return { token };
  }

  async register(registerDto: RegisterDto) {
    const { password, ...dto } = registerDto;
    const hashedPassword = await hashPassword(password);
    return await this.profileRepository.create({
      ...dto,
      password: hashedPassword,
    });
  }
}
