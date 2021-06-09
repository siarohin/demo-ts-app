import { Endpoints } from '../constants';
import { IDrive, IEngine } from './models';

/**
 * Engine repository service
 */
export class EngineRepository {
  /**
   * Starts or stops engine of specified car, and returns it's actual velocity and distance.
   */
  public startStop(query: string): Promise<IEngine> {
    return fetch(`${Endpoints.AppHost}/engine?${query}`, {
      method: 'GET'
    }).then((res) => res.json());
  }

  /**
   * Switches engine of specified car to drive mode.
   */
  public switchToDrive(query: string): Promise<IDrive> {
    return fetch(`${Endpoints.AppHost}/engine?${query}`, {
      method: 'GET'
    }).then((res) => res.json());
  }
}
