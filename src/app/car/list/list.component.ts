import { Component, OnInit } from '@angular/core';
import {Car} from '../../interface/car';
import {FormGroup} from '@angular/forms';
import {CarService} from '../../service/car.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CarSearchServiceService} from '../../service/searchService/car-search-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  carList: Car[] = [];
  failMessage: string;
  keyword: any;
  constructor(private carService: CarService,
              private carSearchService: CarSearchServiceService) { }

  ngOnInit(): void {
    this.carService.showCarList()
      .subscribe(result => {
        this.carList = result;
      }, error => {
        this.failMessage = 'SHOW CAR LIST  FAIL !';
      });
  }
  deleteCar(id: number) {
    this.carService.deleteCarByID(id).subscribe( () => {
      this.ngOnInit();
    }, error => {
      console.log('delete failed');
    });
  }
  search(){
    if (this.keyword !== ''){
      this.carService.findByLicensePlate(this.keyword).subscribe( data => {
        this.carList = data;
        this.carSearchService.changeValue(this.keyword, this.carList);
      });
    }else {
      this.carService.showCarList().subscribe( data => {
        this.carList = data;
        this.carSearchService.changeValue(this.keyword, this.carList);
      });
    }
  }
}
