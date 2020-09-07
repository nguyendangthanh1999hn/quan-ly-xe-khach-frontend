import { Injectable } from '@angular/core';
import {Buses} from '../../interface/buses';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusesSearchServiceService {

  buses: Buses[] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.buses);
  constructor() { }
  changeValue(message: string, buses: Buses[]) {
    this.value.next(message);
    this.list.next(buses);
  }
}
