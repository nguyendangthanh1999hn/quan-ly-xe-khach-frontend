import { Component, OnInit } from '@angular/core';
import {Employee} from '../../interface/employee';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  employeeList: Employee[] = [];
  failMessage: string;
  successMessage: string;
  employeeForm: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup(
      {
        idCard: new FormControl('',
          [Validators.required,
            Validators.minLength(9)]),
        fullName: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
        idLicense: new FormControl('',
          [Validators.required,
            Validators.minLength(7)]),
        licenseType: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
        address: new FormControl('',
          [Validators.required,
            Validators.minLength(3)]),
        birthday: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        seniority: new FormControl('',
          [Validators.required,
            Validators.minLength(1)])
      }
    );
  }
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const {value} = this.employeeForm;
      this.employeeService.createEmployee(value)
        .subscribe(result => {
          this.employeeList.push(result);
          this.createSuccess();
          this.router.navigate(['employee/list']);
          this.successMessage = 'Add employee successfully !';
        }, error => {
          this.failMessage = 'Add employee fail !';
        });
    }
  }
  createSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: ' Create success '
    });
  }
}
