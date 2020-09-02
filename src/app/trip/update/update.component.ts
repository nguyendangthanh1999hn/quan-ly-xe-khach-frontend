import { Component, OnInit } from '@angular/core';
import {Trip} from '../../interface/trip';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripService} from '../../service/trip.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Buses} from '../../interface/buses';
import {Employee} from '../../interface/employee';
import {EmployeeService} from '../../service/employee.service';
import {BusesService} from '../../service/buses.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  busesList: Buses[] = [];
  employeeList: Employee[] = [];
  trip: Trip[];
  successMessage: string;
  failMessage: string;
  tripUpdateForm: FormGroup;
  constructor(private tripService: TripService,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private busesService: BusesService) { }

  ngOnInit(): void {
    this.tripUpdateForm = new FormGroup({
      buses: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
      driver: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
      subDriver: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
      guestNumber: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
      price: new FormControl('',
        [Validators.required,
          Validators.minLength(1)])
      }
    );

    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService.getTripById(id)
      .subscribe(result => {
        this.trip = result;
        this.tripUpdateForm.patchValue(this.trip);
        this.successMessage = 'Edit trip successfully !';
      }, error => {
        this.failMessage = 'Edit trip fail';
      });
  }

  onSubmit() {
    if (this.tripUpdateForm.valid) {
      const {value} = this.tripUpdateForm;
      const data = {
        ...this.trip,
        ...value
      };
      this.tripService.updateTrip(data)
        .subscribe(result => {
          this.routes.navigate(['trip/list']);
        }, error => {
          console.log(error);
        });
    }
  }
}
