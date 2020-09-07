import { Component, OnInit } from '@angular/core';
import {Trip} from '../../interface/trip';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TripService} from '../../service/trip.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Buses} from '../../interface/buses';
import {Employee} from '../../interface/employee';
import {EmployeeService} from '../../service/employee.service';
import {BusesService} from '../../service/buses.service';
import {CarService} from '../../service/car.service';
import {Car} from '../../interface/car';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  busesList: Buses[] = [];
  employeeList: Employee[] = [];
  carList: Car[] = [];
  trip: Trip[];
  successMessage: string;
  failMessage: string;
  tripUpdateForm: FormGroup;
  constructor(private tripService: TripService,
              private route: ActivatedRoute,
              private routes: Router,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private busesService: BusesService,
              private carService: CarService) { }

  ngOnInit(): void {
    this.tripUpdateForm = new FormGroup({
      buses: this.fb.group({
        id: ['', [Validators.required]],
      }),
      driver: this.fb.group({
        id: ['', [Validators.required]],
      }),
      subDriver: this.fb.group({
        id: ['', [Validators.required]],
      }),
      guestNumber: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),

      licensePlate: this.fb.group({
        id: ['', [Validators.required]],
      }),
      price: new FormControl('',
        [Validators.required,
          Validators.minLength(1)])
      }
    );
    this.busesService.showBusesList().subscribe( next => (this.busesList = next), error => (this.busesList = []));
    this.employeeService.showEmployeeList().subscribe( next => (this.employeeList = next), error => (this.employeeList = []));
    this.carService.showCarList().subscribe( next => (this.carList = next), error => (this.carList = []));
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
