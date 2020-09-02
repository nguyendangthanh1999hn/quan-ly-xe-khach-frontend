import { Component, OnInit } from '@angular/core';
import {Trip} from '../../interface/trip';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripService} from '../../service/trip.service';
import {Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {BusesService} from '../../service/buses.service';
import {Buses} from '../../interface/buses';
import {Employee} from '../../interface/employee';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  tripList: Trip[] = [];
  busesList: Buses[] = [];
  employeeList: Employee[] = [];
  failMessage: string;
  successMessage: string;
  tripCreateForm: FormGroup;

  constructor(private tripService: TripService,
              private router: Router,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private busesService: BusesService) { }

  ngOnInit(): void {
    this.tripCreateForm = this.fb.group({
      guestNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      price: ['', [Validators.required]],
      buses: this.fb.group({
        id: ['', [Validators.required]],
      },
        ),
      driver: this.fb.group({
        id: ['', [Validators.required]],
      },
        ),
      subDriver: this.fb.group({
        id: ['', [Validators.required]],
      },
        )
    });
    this.employeeService.showEmployeeList().subscribe(next => (this.employeeList = next), error => (this.employeeList = []));
    this.busesService.showBusesList().subscribe(next => (this.busesList = next), error => (this.busesList = []));
  }
  onSubmit(): void {
    if (this.tripCreateForm.valid) {
      const {value} = this.tripCreateForm;
      this.tripService.createTrip(value)
        .subscribe(result => {
          this.tripList.push(result);
          this.router.navigate(['trip/list']);
          this.successMessage = 'Add trip successfully !';
        }, error => {
          this.failMessage = 'Add trip fail !';
        });
    }
  }
}
