import {Component, OnInit} from '@angular/core';
import {Car} from '../../interface/car';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
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
              private router: Router) {
  }

  ngOnInit(): void {
    this.carForm = new FormGroup(
      {
        licensePlate: new FormControl('',
          [Validators.required,
            Validators.minLength(4)]),
        color: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
        manufactured: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
        model: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
        yearManufactured: new FormControl('',
          [Validators.required,
            Validators.minLength(4)]),
        seats: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
        longevity: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        lastMaintenance: new FormControl('',
          [Validators.minLength(4)]),

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
