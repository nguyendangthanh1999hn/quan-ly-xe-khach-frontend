import { Component, OnInit } from '@angular/core';
import {Trip} from '../../interface/trip';
import {TripService} from '../../service/trip.service';
import {TripSearchServiceService} from '../../service/searchService/trip-search-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  tripList: Trip[] = [];
  failMessage: string;
  keyword: any;
  constructor(private tripService: TripService,
              private searchTripService: TripSearchServiceService) { }

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
  search(){
    if (this.keyword !== ''){
      this.tripService.findByPrice(this.keyword).subscribe( data => {
        this.tripList = data;
        this.searchTripService.changeValue(this.keyword, this.tripList);
      });
    }else {
      this.tripService.showTripList().subscribe( data => {
        this.tripList = data;
        this.searchTripService.changeValue(this.keyword, this.tripList);
      });
    }
  }

}
