import { Router } from "express";
import { ProfileController } from "./profile.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validation.middleware";
import { UpdateProfileSchema } from "./profile.types";
import { upload } from "../../config/multer";

export const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.get("/", authMiddleware, profileController.findOne);
ProfileRouter.put(
  "/update",
  authMiddleware,
  validate(UpdateProfileSchema),
  profileController.update,
);
ProfileRouter.put(
  "/image",
  authMiddleware,
  upload.single("file"),
  profileController.image,
);
