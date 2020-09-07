import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Buses} from '../interface/buses';

@Injectable({
  providedIn: 'root'
})
export class BusesService {
  private readonly API_BUSES = 'http://localhost:8080/buses'; // khai bao API trung voi request mapping trong backend
  private readonly API_FIND_BUSES_BY_LOCATION = 'http://localhost:8080/buses/find-by-location';
  // private readonly API_FIND_BUSES_BY_DISTANCE = 'http://localhost:8080/buses/find-by-distance';
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
  findByLocation(location: string): Observable<Buses[]>{
    return this.httpClient.get<Buses[]>(`${this.API_FIND_BUSES_BY_LOCATION}/${location}`);
  }
  // findByDistance(distance: number): Observable<Buses[]>{
  //   return this.httpClient.get<Buses[]>(`${this.API_FIND_BUSES_BY_DISTANCE}/${distance}`);
  // }

}

