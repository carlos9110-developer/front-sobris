import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuotasRoutingModule } from './cuotas-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  PagoCuotaComponent } from './pago-cuota/pago-cuota.component';
import { InfoComponent } from './info/info.component';
import { PagoIncumplidoComponent } from './pago-incumplido/pago-incumplido.component';
import { ListPorPrestamoComponent } from './list-por-prestamo/list-por-prestamo.component';


@NgModule({
  declarations: [
    ListComponent,
    PagoCuotaComponent,
    InfoComponent,
    PagoIncumplidoComponent,
    ListPorPrestamoComponent
  ],
  imports: [
    CommonModule,
    CuotasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CuotasModule { }
