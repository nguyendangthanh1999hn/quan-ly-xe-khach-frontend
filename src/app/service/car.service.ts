import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Car} from '../interface/car';
import {HttpClient} from '@angular/common/http';
import {Buses} from '../interface/buses';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly API_CAR = 'http://localhost:8080/car'; // khai bao API trung voi request mapping trong backend
  private readonly API_FIND_CAR_BY_LICENSE_PLATE = 'http://localhost:8080/car/find-by-license-plate';
  constructor(private httpClient: HttpClient) { }
  showCarList(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.API_CAR}/list`);
  }
  createCar(car: Car): Observable<Car>{
    return this.httpClient.post<Car>(`${this.API_CAR}/create`, car);
  }
  getCarById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_CAR}/${id}`);
  }
  updateCar(car: Car): Observable<Car> {
    return this.httpClient.put<Car>(`${this.API_CAR}/update/${car.id}`, car);
  }
  deleteCarByID(id: number): Observable<Car> {
    return this.httpClient.delete<Car>(`${this.API_CAR}/delete/` + `${id}`);
  }
  findByLicensePlate(licencePlate: string): Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.API_FIND_CAR_BY_LICENSE_PLATE}/${licencePlate}`);
  }
}
