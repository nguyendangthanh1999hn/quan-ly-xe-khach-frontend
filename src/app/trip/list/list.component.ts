import { Component, OnInit } from '@angular/core';
import {Trip} from '../../interface/trip';
import {TripService} from '../../service/trip.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  tripList: Trip[] = [];
  failMessage: string;
  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.showTripList()
      .subscribe(result => {
        this.tripList = result;
      }, error => {
        this.failMessage = 'SHOW BUSES LIST  FAIL !';
      });
  }
  deleteTrip(id: number) {
    this.tripService.deleteTripByID(id).subscribe( () => {
      this.ngOnInit();
    }, error => {
      console.log('delete failed');
    });
  }

}
