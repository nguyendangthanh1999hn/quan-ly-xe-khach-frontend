import { Injectable } from '@angular/core';
import {Employee} from '../../interface/employee';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSearchServiceService {

  employee: Employee[] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.employee);
  constructor() { }
  changeValue(message: string, employee: Employee[]) {
    this.value.next(message);
    this.list.next(employee);
  }
}
