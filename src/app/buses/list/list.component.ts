import { Component, OnInit } from '@angular/core';
import {Buses} from '../../interface/buses';
import {BusesService} from '../../service/buses.service';
import {BusesSearchServiceService} from '../../service/searchService/buses-search-service.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  busesList: Buses[] = [];
  failMessage: string;
  keyword: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(private busesService: BusesService,
              private busesSearchService: BusesSearchServiceService) { }

  ngOnInit(): void {
    this.busesService.showBusesList()
      .subscribe(result => {
        this.busesList = result;
        console.log(this.keyword as number);
      }, error => {
        this.failMessage = 'SHOW BUSES LIST  FAIL !';
      });
  }
  deleteBuses(id: number) {
    this.busesService.deleteBusesByID(id).subscribe( () => {
      this.deleteSuccess();
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
        this.busesService.findByLocation(this.keyword).subscribe( data => {
          this.busesList = data;
          this.busesSearchService.changeValue(this.keyword, this.busesList);
        });
    }else {
      this.busesService.showBusesList().subscribe( data => {
        this.busesList = data;
        this.busesSearchService.changeValue(this.keyword, this.busesList);
      });
    }
  }
}
