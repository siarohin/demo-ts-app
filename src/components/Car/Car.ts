import { EngineService, ICar, IDrive, IEngine, IEngineRequest } from '../../core';
import { CarView } from './Car.view';

/**
 * Custom Event on `Update car`
 */
const updateCarEvent = new CustomEvent('updateCar', {
  detail: { data: {} as ICar },
  bubbles: true,
  cancelable: true
});

/**
 * Custom Event on `Delete car`
 */
const deleteCarEvent = new CustomEvent('deleteCar', {
  detail: { data: {} as ICar },
  bubbles: true,
  cancelable: true
});

export class Car {
  private engineService: EngineService;

  private car: ICar;

  constructor(engineService: EngineService, car: ICar) {
    this.engineService = engineService;
    this.car = car;
  }

  /**
   * Returns Car id
   */
  public get id(): number {
    return this.car.id;
  }

  /**
   * Update an existing car
   */
  public updateCar(car: ICar): Car {
    this.car = car;
    this.render(car);
    return this; // returns this for simple using with Garage.updateCar()
  }

  /**
   * Start engine
   * TODO: Not implemented yet
   */
  public async start(): Promise<void> {
    const request: IEngineRequest = {
      id: this.car.id,
      status: 'started'
    };
    const response: IEngine = await this.engineService.startStop(request);
    console.log(response);
  }

  /**
   * Stop engine
   * TODO: Not implemented yet
   */
  public async stop(): Promise<void> {
    const request: IEngineRequest = {
      id: this.car.id,
      status: 'stopped'
    };
    const response: IEngine = await this.engineService.startStop(request);
    console.log(response);
  }

  /**
   * Switch to Drive mode
   * TODO: Not implemented yet
   */
  public async switchToDrive(): Promise<void> {
    const request: IEngineRequest = {
      id: this.car.id,
      status: 'drive'
    };
    const response: IDrive = await this.engineService.switchToDrive(request);
    console.log(response);
  }

  /**
   * Render car and add Listeners
   */
  public render(car?: ICar): void {
    const root: HTMLElement | null = document.querySelector('.app-garage');
    const template: string = CarView.getCarImage(this.car);

    if (car) {
      // Re-render an existing car
      const container = document.getElementById(`${car.id}`);
      (container as HTMLElement).innerHTML = template;
    } else {
      // Or create a new one
      root?.insertAdjacentHTML('beforeend', `<div class="app-car" id="${this.car.id}">${template}</div>`);
      this.addEventListeners();
    }
  }

  /**
   * Detach car from view
   */
  public destroy(): void {
    const container = document.getElementById(`${this.car.id}`);
    container?.parentNode?.removeChild(container);
  }

  private addEventListeners(): void {
    const container: HTMLElement | null = document.getElementById(`${this.car.id}`);
    container?.addEventListener('click', (event) => {
      const isUpdate: boolean = (event.target as HTMLElement)?.classList.contains('app-car-item__update-button');
      const isDelete: boolean = (event.target as HTMLElement)?.classList.contains('app-car-item__delete-button');

      if (isUpdate) {
        updateCarEvent.detail.data = this.car;
        container.dispatchEvent(updateCarEvent);
      } else if (isDelete) {
        deleteCarEvent.detail.data = this.car;
        container.dispatchEvent(deleteCarEvent);
      }
    });
  }
}
