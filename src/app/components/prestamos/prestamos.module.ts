import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamosRoutingModule } from './prestamos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CobradoresRoutingModule } from '../cobradores/cobradores-routing.module';
import { RegistroPrestamoComponent } from './registro-prestamo/registro-prestamo.component';
import { ListPorCobradorComponent } from './list-por-cobrador/list-por-cobrador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroPrestamosClienteComponent } from './registro-prestamos-cliente/registro-prestamos-cliente.component';


@NgModule({
  declarations: [
    RegistroPrestamoComponent,
    ListPorCobradorComponent,
    RegistroPrestamosClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CobradoresRoutingModule,
    ReactiveFormsModule,
    PrestamosRoutingModule,
    NgbModule
  ]
})
export class PrestamosModule { }
