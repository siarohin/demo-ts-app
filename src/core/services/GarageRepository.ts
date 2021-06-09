import { Endpoints } from '../constants';
import { ICar } from './models';

export const headers: HeadersInit = {
  'Content-Type': 'application/json'
};

function getResponse(response: Response, result?: Promise<unknown>): Promise<any> {
  const isNotSuccess = !response.ok;

  if (isNotSuccess) {
    throw new Error();
  }

  return result || response.json();
}

/**
 * Garage repository service
 */
export class GarageRepository {
  /**
   * Returns json data about cars in a garage.
   */
  public getCars(query?: string): Promise<Array<ICar>> {
    return fetch(`${Endpoints.AppHost}/${query ? `garage?${query}` : 'garage'}`, {
      method: 'GET'
    }).then((res) => getResponse(res));
  }

  /**
   * Returns json data about specified car.
   */
  public getCar(id: number): Promise<ICar> {
    return fetch(`${Endpoints.AppHost}/garage/${id}`, {
      method: 'GET'
    }).then((res) => getResponse(res));
  }

  /**
   * Creates a new car in a garage.
   */
  public createCar(request: Omit<ICar, 'id'>): Promise<ICar> {
    return fetch(`${Endpoints.AppHost}/garage`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    }).then((res) => getResponse(res));
  }

  /**
   * Delete specified car from a garage.
   */
  public deleteCar(id: number): Promise<void> {
    return fetch(`${Endpoints.AppHost}/garage/${id}`, {
      method: 'DELETE'
    }).then((res) => getResponse(res));
  }

  /**
   * Updates attributes of specified car.
   */
  public updateCar(request: ICar): Promise<ICar> {
    const { id, ...car } = request;
    return fetch(`${Endpoints.AppHost}/garage/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(car)
    }).then((res) => getResponse(res));
  }
}
