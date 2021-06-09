import { Car, Garage } from './components';
import { GarageService, GarageRepository, EngineService, EngineRepository } from './core';

const garageService = new GarageService(new GarageRepository());
const engineService = new EngineService(new EngineRepository());

// TODO: Remove me
const garage = new Garage(garageService);
garage.getCars();
garage.getCar(2);
garage.createCar({
  name: 'New Red Car',
  color: '#ff0000'
});
// garage.deleteCar(3);
garage.updateCar({
  id: 1,
  name: 'Lada Vesta',
  color: '#cccccc'
});

const car = new Car(engineService);
car.startStop({
  id: 1,
  status: 'started'
});
car.switchToDrive({
  id: 1,
  status: 'drive'
});
