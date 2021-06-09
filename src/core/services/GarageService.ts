import { ICar } from './models';
import { GarageRepository } from './GarageRepository';

/**
 * Garage service
 */
export class GarageService {
  private garageRepository: GarageRepository;

  constructor(garageRepository: GarageRepository) {
    this.garageRepository = garageRepository;
  }

  /**
   * Returns cars
   */
  public getCars(query?: string): Promise<Array<ICar>> {
    return this.garageRepository.getCars(query);
  }

  /**
   * Returns a car
   */
  public getCar(id: number): Promise<ICar> {
    return this.garageRepository.getCar(id);
  }

  /**
   * Create a car
   */
  public createCar(request: Omit<ICar, 'id'>): Promise<ICar> {
    return this.garageRepository.createCar(request);
  }

  /**
   * Delete a car
   */
  public deleteCar(id: number): Promise<void> {
    return this.garageRepository.deleteCar(id);
  }

  /**
   * Update a car
   */
  public updateCar(request: ICar): Promise<ICar> {
    return this.garageRepository.updateCar(request);
  }
}
