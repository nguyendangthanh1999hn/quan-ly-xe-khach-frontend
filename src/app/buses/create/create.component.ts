import { Component, OnInit } from '@angular/core';
import {Buses} from '../../interface/buses';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BusesService} from '../../service/buses.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  busesList: Buses[] = [];
  failMessage: string;
  successMessage: string;
  busesForm: FormGroup;

  constructor(private busesService: BusesService,
              private router: Router) { }

  ngOnInit(): void {
    this.busesForm = new FormGroup(
      {
        startLocation: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        endLocation: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        distance: new FormControl('',
          [Validators.required,
            Validators.minLength(1)]),
        level: new FormControl('',
          [Validators.required,
            Validators.minLength(1)])
      }
    );
  }
  onSubmit(): void {
    if (this.busesForm.valid) {
      const {value} = this.busesForm;
      this.busesService.createBuses(value)
        .subscribe(result => {
          this.busesList.push(result);
          this.router.navigate(['buses/list'])
          this.successMessage = 'Add buses successfully !';
          // this.busesForm.reset({
          //   startLocation: '',
          //   endLocation: '',
          //   distance: '',
          //   level: '',
          // });
        }, error => {
          this.failMessage = 'Add buses fail !';
        });
    }
  }

}
