import { Component, OnInit } from '@angular/core';
import {Car} from '../../interface/car';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../service/car.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  carList: Car[] = [];
  failMessage: string;
  successMessage: string;
  carForm: FormGroup;

  constructor(private carService: CarService,
              private router: Router) { }

  ngOnInit(): void {
    this.carForm = new FormGroup(
      {
        licensePlate: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        color: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        manufactured: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        model: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        yearManufactured: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        seats: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        longevity: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        lastMaintenance: new FormControl(''),
      }
    );
  }
  onSubmit(): void {
    if (this.carForm.valid) {
      const {value} = this.carForm;
      this.carService.createCar(value)
        .subscribe(result => {
          this.carList.push(result);
          this.router.navigate(['car/list']);
          this.successMessage = 'Add car successfully !';
        }, error => {
          this.failMessage = 'Add car fail !';
        });
    }
  }

}
