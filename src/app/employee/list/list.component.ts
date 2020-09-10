import { Component, OnInit } from '@angular/core';
import {Employee} from '../../interface/employee';
import {EmployeeService} from '../../service/employee.service';
import {CarSearchServiceService} from '../../service/searchService/car-search-service.service';
import {EmployeeSearchServiceService} from '../../service/searchService/employee-search-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  employeeList: Employee[] = [];
  failMessage: string;
  keyword: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private employeeService: EmployeeService,
              private searchEmployeeService: EmployeeSearchServiceService) { }

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
      this.deleteSuccess();
      this.ngOnInit();
    }, error => {
      console.log('delete failed');
    });
  }
  deleteSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Delete success'
    });
  }
  search(){
    if (this.keyword !== ''){
      this.employeeService.findByFullName(this.keyword).subscribe( data => {
        this.employeeList = data;
        this.searchEmployeeService.changeValue(this.keyword, this.employeeList);
      });
    }else {
      this.employeeService.showEmployeeList().subscribe( data => {
        this.employeeList = data;
        this.searchEmployeeService.changeValue(this.keyword, this.employeeList);
      });
    }
  }
}
