import { Injectable } from '@angular/core';
import {Car} from '../../interface/car';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarSearchServiceService {

  car: Car[] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.car);
  constructor() { }
  changeValue(message: string, car: Car[]) {
    this.value.next(message);
    this.list.next(car);
  }
}
