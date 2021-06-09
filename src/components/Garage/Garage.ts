import { GarageService, ICar } from '../../core';

export class Garage {
  private garageService: GarageService;

  constructor(garageService: GarageService) {
    this.garageService = garageService;
  }

  public async getCars(): Promise<void> {
    const response: Array<ICar> = await this.garageService.getCars();
    console.log(response);
  }

  public async getCar(id: number): Promise<void> {
    const response: ICar = await this.garageService.getCar(id);
    console.log(response);
  }

  public async createCar(request: Omit<ICar, 'id'>): Promise<void> {
    const response: ICar = await this.garageService.createCar(request);
    console.log(response);
  }

  public async deleteCar(id: number): Promise<void> {
    const response: void = await this.garageService.deleteCar(id);
    console.log(response);
  }

  public async updateCar(request: ICar): Promise<void> {
    const response: ICar = await this.garageService.updateCar(request);
    console.log(response);
  }
}
