import { EngineService, ICar, IEngineRequest } from '../../core';
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

  private animationFrameId: number;

  private svgElement: SVGSVGElement;

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
   */
  public async start(): Promise<void> {
    const request: IEngineRequest = {
      id: this.car.id,
      status: 'started'
    };
    const { velocity, distance } = await this.engineService.startStop(request);
    const duration: number = distance / velocity;
    await this.runCar(duration);
    await this.switchToDrive();
  }

  /**
   * Stop engine
   */
  public async stop(): Promise<void> {
    const request: IEngineRequest = {
      id: this.car.id,
      status: 'stopped'
    };
    this.stopCar();
    await this.engineService.startStop(request);
    this.svgElement.style.transform = 'translateX(0px)';
  }

  /**
   * Switch to Drive mode
   */
  public async switchToDrive(): Promise<void> {
    try {
      const request: IEngineRequest = {
        id: this.car.id,
        status: 'drive'
      };
      await this.engineService.switchToDrive(request);
    } catch {
      this.stopCar();
    }
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

    const [element] = (document.getElementById(`${this.car.id}`) as HTMLElement).getElementsByTagName('svg');
    this.svgElement = element;
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
      const isStart: boolean = (event.target as HTMLElement)?.classList.contains('app-car-item__start-button');
      const isStop: boolean = (event.target as HTMLElement)?.classList.contains('app-car-item__stop-button');

      if (isUpdate) {
        updateCarEvent.detail.data = this.car;
        container.dispatchEvent(updateCarEvent);
      } else if (isDelete) {
        deleteCarEvent.detail.data = this.car;
        container.dispatchEvent(deleteCarEvent);
      } else if (isStart) {
        this.start();
      } else if (isStop) {
        this.stop();
      }
    });
  }

  private runCar(duration: number): void {
    const [{ clientWidth }] = document.getElementsByClassName('app-car');
    const distance: number = clientWidth - this.svgElement.clientWidth;

    const start = performance.now();
    const draw = (progress: number) => {
      this.svgElement.style.transform = `translateX(${progress * distance}px)`;
    };
    const timing = (timeFraction: number) => timeFraction;
    const animate = (time: number): void => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }
      const progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopCar() {
    cancelAnimationFrame(this.animationFrameId);
  }
}
