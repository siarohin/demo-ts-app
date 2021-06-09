import { EngineRepository } from './EngineRepository';
import { IDrive, IEngine, IEngineRequest } from './models';

export class EngineService {
  private engineRepository: EngineRepository;

  constructor(engineRepository: EngineRepository) {
    this.engineRepository = engineRepository;
  }

  /**
   * Starts or stops engine
   */
  public startStop(request: IEngineRequest): Promise<IEngine> {
    return this.engineRepository.startStop(this.getQuery(request));
  }

  /**
   * Switches engine to drive mode
   */
  public switchToDrive(request: IEngineRequest): Promise<IDrive> {
    return this.engineRepository.switchToDrive(this.getQuery(request));
  }

  private getQuery(request: IEngineRequest): string {
    const { id, status } = request;
    return `id=${id}&status=${status}`;
  }
}
