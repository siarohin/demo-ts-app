import { EngineService, IDrive, IEngine, IEngineRequest } from '../../core';

export class Car {
  private engineService: EngineService;

  constructor(engineService: EngineService) {
    this.engineService = engineService;
  }

  public async startStop(request: IEngineRequest): Promise<void> {
    const response: IEngine = await this.engineService.startStop(request);
    console.log(response);
  }

  public async switchToDrive(request: IEngineRequest): Promise<void> {
    const response: IDrive = await this.engineService.switchToDrive(request);
    console.log(response);
  }
}
