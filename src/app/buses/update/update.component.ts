import { Component, OnInit } from '@angular/core';
import {Buses} from '../../interface/buses';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BusesService} from '../../service/buses.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  constructor(private busesService: BusesService,
              private route: ActivatedRoute,
              private routes: Router) { }

  ngOnInit(): void {
    this.busesUpdateForm = new FormGroup({
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
          this.routes.navigate(['buses/list']);
        }, error => {
          console.log(error);
        });
    }
  }
}
