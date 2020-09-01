import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [ListComponent, UpdateComponent, CreateComponent],
  imports: [
    CommonModule
  ]
})
export class CarModule { }
