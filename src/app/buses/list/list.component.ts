import { Component, OnInit } from '@angular/core';
import {Buses} from '../../interface/buses';
import {BusesService} from '../../service/buses.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  busesList: Buses[] = [];
  failMessage: string;
  constructor(private busesService: BusesService) { }

  ngOnInit(): void {
    this.busesService.showBusesList()
      .subscribe(result => {
        this.busesList = result;
      }, error => {
        this.failMessage = 'SHOW BUSES LIST  FAIL !';
      });
  }
  deleteBuses(id: number) {
    this.busesService.deleteBusesByID(id).subscribe( () => {
      this.ngOnInit();
    }, error => {
      console.log('delete failed');
    });
  }
}
