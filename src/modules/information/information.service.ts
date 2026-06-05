import { InformationRepository } from "./information.repository";

export class InformationService {
  constructor(private informationRepository = new InformationRepository()) {}

  async findAllBanner() {
    return await this.informationRepository.findAllBanner();
  }

  async findAllService() {
    return await this.informationRepository.findAllService();
  }
}
