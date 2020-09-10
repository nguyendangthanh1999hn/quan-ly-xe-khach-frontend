import { Component, OnInit } from '@angular/core';
import {Buses} from '../../interface/buses';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BusesService} from '../../service/buses.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  busesList: Buses[] = [];
  failMessage: string;
  busesForm: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  constructor(private busesService: BusesService,
              private router: Router) { }

  ngOnInit(): void {
    this.busesForm = new FormGroup(
      {
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
  }
  onSubmit(): void {
    if (this.busesForm.valid) {
      const {value} = this.busesForm;
      this.busesService.createBuses(value)
        .subscribe(result => {
          this.busesList.push(result);
          this.router.navigate(['buses/list']);
          this.createSuccess();
        }, error => {
          this.failMessage = 'Add buses fail !';
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
