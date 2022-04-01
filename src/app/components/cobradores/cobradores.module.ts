import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CobradoresRoutingModule } from './cobradores-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CobradoresRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CobradoresModule { }
