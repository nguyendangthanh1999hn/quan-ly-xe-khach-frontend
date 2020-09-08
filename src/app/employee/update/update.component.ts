import { Component, OnInit } from '@angular/core';
import {Employee} from '../../interface/employee';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../service/employee.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  employee: Employee[];
  successMessage: string;
  failMessage: string;
  employeeUpdateForm: FormGroup;
  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.employeeUpdateForm = new FormGroup({
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
            Validators.pattern('[0-9]')])
      }
    );

    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(id)
      .subscribe(result => {
        this.employee = result;
        this.employeeUpdateForm.patchValue(this.employee);
        this.successMessage = 'Update employee successfully !';
      }, error => {
        this.failMessage = 'Update employee fail';
      });
  }

  onSubmit() {
    if (this.employeeUpdateForm.valid) {
      const {value} = this.employeeUpdateForm;
      const data = {
        ...this.employee,
        ...value
      };
      this.employeeService.updateEmployee(data)
        .subscribe(result => {
          this.routes.navigate(['employee/list']);
        }, error => {
          console.log(error);
        });
    }
  }
}
