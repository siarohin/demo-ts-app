import { EngineService, GarageService, ICar } from '../../core';
import { generateRandomColor, generateRandomName } from '../../shared';
import { Car } from '../Car';
import { GarageView } from './Garage.view';

export class Garage {
  private garageService: GarageService;

  private engineService: EngineService;

  private cars: Array<Car> = [];

  constructor(garageService: GarageService, engineService: EngineService) {
    this.garageService = garageService;
    this.engineService = engineService;
  }

  /**
   * Initialization
   */
  public async init(): Promise<void> {
    await this.renderGarage();
    await this.createCars();
    await this.renderCars();
    await this.addEventListeners();
  }

  private async createCars(): Promise<void> {
    const iCars: Array<ICar> = await this.garageService.getCars();
    const cars: Array<Car> = iCars.map((car) => new Car(this.engineService, car));
    this.cars = [...this.cars, ...cars];
  }

  private renderCars(): void {
    this.cars.forEach((car) => car.render());
  }

  private renderGarage(): void {
    const root: HTMLElement | null = document.getElementById('root');
    const template: string = GarageView.getGarageImage();
    (root as HTMLElement).innerHTML = template;
  }

  private addEventListeners(): void {
    const root: HTMLElement | null = document.querySelector('.app-garage');

    root?.addEventListener('updateCar', (event) => {
      const request: ICar = (event as CustomEvent).detail.data;
      // TODO: Generates random color only. Have to be updated.
      this.updateCar(request);
    });

    root?.addEventListener('deleteCar', (event) => {
      const request: ICar = (event as CustomEvent).detail.data;
      this.deleteCar(request);
    });

    const createCarButton: HTMLButtonElement | null = document.querySelector('.app-car-item__create-button');

    createCarButton?.addEventListener('click', () => {
      const request: Omit<ICar, 'id'> = { name: generateRandomName(), color: generateRandomColor() };
      this.createCar(request);
    });
  }

  private async updateCar(request: ICar): Promise<void> {
    const response = await this.garageService.updateCar({ ...request, color: generateRandomColor() });
    const index: number = this.cars.findIndex((car) => car.id === request.id);
    if (index > -1) {
      const target: Car | undefined = this.cars[index];
      this.cars = [...this.cars.slice(0, index), target.updateCar(response), ...this.cars.slice(index + 1)];
    }
  }

  private async deleteCar(request: ICar): Promise<void> {
    await this.garageService.deleteCar(request.id);
    const index: number = this.cars.findIndex((car) => car.id === request.id);
    if (index > -1) {
      const target: Car | undefined = this.cars[index];
      this.cars = [...this.cars.slice(0, index), ...this.cars.slice(index + 1)];
      target.destroy();
    }
  }

  private async createCar(request: Omit<ICar, 'id'>): Promise<void> {
    const response = await this.garageService.createCar(request);
    const car: Car = new Car(this.engineService, response);
    this.cars = [...this.cars, car];
    car.render();
  }
}
