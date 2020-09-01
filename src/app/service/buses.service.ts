import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Buses} from '../interface/buses';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  // private readonly API_GET_BUSES_LIST = 'http://localhost:8080/buses/list'; // khai bao API trung voi cai request mapping khai bao o backend
  // private readonly API_CREATE_BUSES = 'http://localhost:8080/buses/create';
  private readonly API_BUSES = 'http://localhost:8080/buses/';
  constructor(private httpClient: HttpClient) { }

  showBusesList(): Observable<Buses[]>{
    return this.httpClient.get<Buses[]>(`${this.API_BUSES}/list`);
  }
  createBuses(buses: Buses): Observable<Buses>{
    return this.httpClient.post<Buses>(`${this.API_BUSES}/create`, buses);
  }
  getBusesById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_BUSES}/${id}`);
  }
  updateBuses(buses: Buses): Observable<Buses> {
    return this.httpClient.put<Buses>(`${this.API_BUSES}/update/${buses.id}`, buses);
  }
  deleteBusesByID(id: number): Observable<Buses> {
    return this.httpClient.delete<Buses>(`${this.API_BUSES}/delete/` + `${id}`);
  }

}
