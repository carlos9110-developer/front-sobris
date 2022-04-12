import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { PrestamosRoutingModule } from './prestamos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CobradoresRoutingModule } from '../cobradores/cobradores-routing.module';
import { RegistroPrestamoComponent } from './registro-prestamo/registro-prestamo.component';
import { ListPorCobradorComponent } from './list-por-cobrador/list-por-cobrador.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroPrestamosClienteComponent } from './registro-prestamos-cliente/registro-prestamos-cliente.component';
import { ListadoPrestamosClienteComponent } from './listado-prestamos-cliente/listado-prestamos-cliente.component';
import { ListadoPrestamosCarteraComponent } from './listado-prestamos-cartera/listado-prestamos-cartera.component';
import { CambiarCobradorPrestamoComponent } from './cambiar-cobrador-prestamo/cambiar-cobrador-prestamo.component';


@NgModule({
  declarations: [
    RegistroPrestamoComponent,
    ListPorCobradorComponent,
    RegistroPrestamosClienteComponent,
    ListadoPrestamosClienteComponent,
    ListadoPrestamosCarteraComponent,
    CambiarCobradorPrestamoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CobradoresRoutingModule,
    ReactiveFormsModule,
    PrestamosRoutingModule,
    NgbModule,
    NgSelectModule
  ]
})
export class PrestamosModule { }
