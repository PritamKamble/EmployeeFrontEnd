import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { AvatarModule } from 'ngx-avatar';
import {NgxMaskModule} from 'ngx-mask';
import { CurrencyMaskModule } from 'ngx-currency-mask';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    AvatarModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ]
})
export class EmployeeModule { }
