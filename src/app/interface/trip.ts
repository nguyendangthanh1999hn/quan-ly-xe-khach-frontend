import {Buses} from './buses';
import {Employee} from './employee';
import {Car} from './car';

export interface Trip {
  id?: number;
  buses: Buses;
  driver: Employee;
  subDriver: Employee;
  guestNumber: number;
  price: number;
  car: Car;
}

