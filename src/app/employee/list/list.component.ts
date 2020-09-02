import { Component, OnInit } from '@angular/core';
import {Employee} from '../../interface/employee';
import {EmployeeService} from '../../service/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employeeList: Employee[] = [];
  failMessage: string;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.showEmployeeList()
      .subscribe(result => {
        this.employeeList = result;
      }, error => {
        this.failMessage = 'SHOW BUSES LIST  FAIL !';
      });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployeeByID(id).subscribe( () => {
      this.ngOnInit();
    }, error => {
      console.log('delete failed');
    });
  }
}
