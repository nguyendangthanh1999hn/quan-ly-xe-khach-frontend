import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../interface/employee';
import {Car} from '../interface/car';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_EMPLOYEE = 'http://localhost:8080/employee'; // khai bao API trung voi request mapping trong backend
  private readonly API_FIND_EMPLOYEE_BY_FULL_NAME = 'http://localhost:8080/employee/find-by-full-name';
  constructor(private httpClient: HttpClient) { }

  showEmployeeList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.API_EMPLOYEE}/list`);
  }
  createEmployee(employee: Employee): Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.API_EMPLOYEE}/create`, employee);
  }
  getEmployeeById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_EMPLOYEE}/${id}`);
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.API_EMPLOYEE}/update/${employee.id}`, employee);
  }
  deleteEmployeeByID(id: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.API_EMPLOYEE}/delete/` + `${id}`);
  }
  findByFullName(fullName: string): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.API_FIND_EMPLOYEE_BY_FULL_NAME}/${fullName}`);
  }

}
