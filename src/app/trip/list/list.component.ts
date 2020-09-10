import { Component, OnInit } from '@angular/core';
import {Trip} from '../../interface/trip';
import {TripService} from '../../service/trip.service';
import {TripSearchServiceService} from '../../service/searchService/trip-search-service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  tripList: Trip[] = [];
  failMessage: string;
  keyword: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
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
      this.deleteSuccess()
      this.ngOnInit();
    }, error => {
      console.log('delete failed');
    });
  }
  deleteSuccess(){
    this.Toast.fire({
      icon: 'success',
      title: 'Delete success'
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
