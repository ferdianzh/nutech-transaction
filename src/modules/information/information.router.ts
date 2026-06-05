import { Router } from "express";
import { InformationController } from "./information.controller";

export const InformationRouter = Router();
const informationController = new InformationController();

InformationRouter.get("/banner", informationController.findAllBanner);
InformationRouter.get("/services", informationController.findAllService);
