import { Injectable } from '@angular/core';
import {Trip} from '../../interface/trip';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripSearchServiceService {


  trip: Trip[] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.trip);
  constructor() { }
  changeValue(message: string, trip: Trip[]) {
    this.value.next(message);
    this.list.next(trip);
  }
}
