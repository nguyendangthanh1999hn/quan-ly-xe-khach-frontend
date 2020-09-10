import { Component, OnInit } from '@angular/core';
import {Car} from '../../interface/car';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../service/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  car: Car[];
  successMessage: string;
  failMessage: string;
  carUpdateForm: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.carUpdateForm = new FormGroup({
        color: new FormControl('',
          [Validators.required,
            Validators.minLength(4)]),
      lastMaintenance: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
      licensePlate: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
      longevity: new FormControl('',
          [Validators.required,
            Validators.minLength(2)]),
      manufactured: new FormControl('',
        [Validators.required,
          Validators.minLength(4)]),
      model: new FormControl('',
        [Validators.required,
          Validators.minLength(2)]),
      seats: new FormControl('',
        [Validators.required,
          Validators.minLength(2)]),
      yearManufactured: new FormControl('',
        [Validators.required,
          Validators.minLength(4)])
      }
    );

    const id = +this.route.snapshot.paramMap.get('id');
    this.carService.getCarById(id)
      .subscribe(result => {
        this.car = result;
        this.carUpdateForm.patchValue(this.car);
        this.successMessage = 'Update car successfully !';
      }, error => {
        this.failMessage = 'Update car fail';
      });
  }

  onSubmit() {
    if (this.carUpdateForm.valid) {
      const {value} = this.carUpdateForm;
      const data = {
        ...this.car,
        ...value
      };
      this.carService.updateCar(data)
        .subscribe(result => {
          this.updateSuccess();
          this.routes.navigate(['car/list']);
        }, error => {
          console.log(error);
        });
    }
  }
  updateSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: ' Update success '
    });
  }
}

