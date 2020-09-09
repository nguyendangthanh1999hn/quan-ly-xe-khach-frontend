import { Component, OnInit } from '@angular/core';
import {Trip} from '../interface/trip';
import {TripService} from '../service/trip.service';
import {TripSearchServiceService} from '../service/searchService/trip-search-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  revenueList: Trip[] = [];
  failMessage: string;


  constructor(private tripService: TripService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tripService.showTripList()
      .subscribe(result => {
        this.revenueList = result;
      }, error => {
        this.failMessage = 'SHOW REVENUE LIST  FAIL !';
      });
  }
}
