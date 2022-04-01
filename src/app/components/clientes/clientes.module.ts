import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ListadoClientesPorCobradorComponent } from './listado-clientes-por-cobrador/listado-clientes-por-cobrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditarInformacionClienteComponent } from './editar-informacion-cliente/editar-informacion-cliente.component';
import { InfoClienteComponent } from './info-cliente/info-cliente.component';


@NgModule({
  declarations: [
    ListadoClientesPorCobradorComponent,
    EditarInformacionClienteComponent,
    InfoClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
  ]
})
export class ClientesModule { }
