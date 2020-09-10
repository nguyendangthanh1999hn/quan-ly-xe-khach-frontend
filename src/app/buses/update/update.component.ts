import { Component, OnInit } from '@angular/core';
import {Buses} from '../../interface/buses';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BusesService} from '../../service/buses.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  buses: Buses[];
  successMessage: string;
  failMessage: string;
  busesUpdateForm: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private busesService: BusesService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.busesUpdateForm = new FormGroup({
      startLocation: new FormControl('',
        [Validators.required,
          Validators.minLength(4)]),
      endLocation: new FormControl('',
        [Validators.required,
          Validators.minLength(4)]),
      distance: new FormControl('',
        [Validators.required,
          Validators.minLength(2)]),
      level: new FormControl('',
        [Validators.required,
          Validators.pattern('[1-3]')])
      }
    );

    const id = +this.route.snapshot.paramMap.get('id');
    this.busesService.getBusesById(id)
      .subscribe(result => {
        this.buses = result;
        this.busesUpdateForm.patchValue(this.buses);
        this.successMessage = 'Edit buses successfully !';
      }, error => {
        this.failMessage = 'Edit buses fail';
      });
  }

  onSubmit() {
    if (this.busesUpdateForm.valid) {
      const {value} = this.busesUpdateForm;
      const data = {
        ...this.buses,
        ...value
      };
      this.busesService.updateBuses(data)
        .subscribe(result => {
          this.updateSuccess();
          this.routes.navigate(['buses/list']);
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
