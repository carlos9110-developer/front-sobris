import { ListComponent as ListRutasComponents } from './../../components/cuotas/list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as ListCobradoresComponent } from '../../components/cobradores/list/list.component';
import { RegistroPrestamoComponent } from '../../components/prestamos/registro-prestamo/registro-prestamo.component';
import {  PagoCuotaComponent } from '../../components/cuotas/pago-cuota/pago-cuota.component';
import { PagoIncumplidoComponent } from '../../components/cuotas/pago-incumplido/pago-incumplido.component';
import { ListPorCobradorComponent } from '../../components/prestamos/list-por-cobrador/list-por-cobrador.component';
import { ListPorPrestamoComponent } from '../../components/cuotas/list-por-prestamo/list-por-prestamo.component';
import { ListadoClientesPorCobradorComponent } from '../../components/clientes/listado-clientes-por-cobrador/listado-clientes-por-cobrador.component';
import { RegistroPrestamosClienteComponent } from '../../components/prestamos/registro-prestamos-cliente/registro-prestamos-cliente.component';
import { EditarInformacionClienteComponent } from '../../components/clientes/editar-informacion-cliente/editar-informacion-cliente.component';
import { InfoClienteComponent } from '../../components/clientes/info-cliente/info-cliente.component';
import { ListadoPrestamosClienteComponent } from '../../components/prestamos/listado-prestamos-cliente/listado-prestamos-cliente.component';
import { RegistroCobradorComponent } from '../../components/cobradores/registro-cobrador/registro-cobrador.component';
import { RutaGeneralCuotasComponent } from '../../components/cuotas/ruta-general-cuotas/ruta-general-cuotas.component';
import { InformacionCobradorComponent } from '../../components/cobradores/informacion-cobrador/informacion-cobrador.component';
import { ListadoPrestamosCarteraComponent } from '../../components/prestamos/listado-prestamos-cartera/listado-prestamos-cartera.component';
import { CambiarCobradorPrestamoComponent } from '../../components/prestamos/cambiar-cobrador-prestamo/cambiar-cobrador-prestamo.component';

const routes: Routes = [
  /** MODULO COBRADORES */
  {
    path:     "carteras",
    component: ListCobradoresComponent,
    loadChildren: () => import("../../components/cobradores/cobradores.module").then( (m) => m.CobradoresModule ),
  },
  {
    path:     "registro-cartera",
    component: RegistroCobradorComponent,
    loadChildren: () => import("../../components/cobradores/cobradores.module").then( (m) => m.CobradoresModule ),
  },
  {
    path:     "informacion-cobrador/:id",
    component: InformacionCobradorComponent,
    loadChildren: () => import("../../components/cobradores/cobradores.module").then( (m) => m.CobradoresModule ),
  },

  /** MODULO PRESTAMOS */
  {
    path:     "prestamos-cartera/:id",
    component: ListadoPrestamosCarteraComponent,
    loadChildren: () => import("../../components/prestamos/prestamos.module").then( (m) => m.PrestamosModule ),
  },
  {
    path:     "registro-prestamo",
    component: RegistroPrestamoComponent,
    loadChildren: () => import("../../components/prestamos/prestamos.module").then( (m) => m.PrestamosModule ),
  },
  {
    path:     "registro-prestamo-cliente/:id",
    component: RegistroPrestamosClienteComponent,
    loadChildren: () => import("../../components/prestamos/prestamos.module").then( (m) => m.PrestamosModule ),
  },
  {
    path:     "prestamos",
    component: ListPorCobradorComponent,
    loadChildren: () => import("../../components/prestamos/prestamos.module").then( (m) => m.PrestamosModule ),
  },
  {
    path:     "prestamos-cliente/:id",
    component: ListadoPrestamosClienteComponent,
    loadChildren: () => import("../../components/prestamos/prestamos.module").then( (m) => m.PrestamosModule ),
  },
  {
    path:     "cambiar-cobrador-prestamo/:id",
    component: CambiarCobradorPrestamoComponent,
    loadChildren: () => import("../../components/prestamos/prestamos.module").then( (m) => m.PrestamosModule ),
  },

  /** MODULO CUOTAS */
  {
    path:     "rutas",
    component: ListRutasComponents,
    loadChildren: () => import("../../components/cuotas/cuotas.module").then( (m) => m.CuotasModule ),
  },
  {
    path:     "ruta-general",
    component: RutaGeneralCuotasComponent,
    loadChildren: () => import("../../components/cuotas/cuotas.module").then( (m) => m.CuotasModule ),
  },
  {
    path:     "pago-cuota/:id",
    component: PagoCuotaComponent,
    loadChildren: () => import("../../components/cuotas/cuotas.module").then( (m) => m.CuotasModule ),
  },
  {
    path:     "pago-incumplido/:id",
    component: PagoIncumplidoComponent,
    loadChildren: () => import("../../components/cuotas/cuotas.module").then( (m) => m.CuotasModule ),
  },
  
  {
    path:     "cuotas-prestamo/:id",
    component: ListPorPrestamoComponent,
    loadChildren: () => import("../../components/cuotas/cuotas.module").then( (m) => m.CuotasModule),
  },

  /** MODULO CLIENTES */
  {
    path:     "clientes",
    component: ListadoClientesPorCobradorComponent,
    loadChildren: () => import("../../components/clientes/clientes.module").then( (m) => m.ClientesModule),
  },
  {
    path:     "editar-informacion-cliente/:id",
    component: EditarInformacionClienteComponent,
    loadChildren: () => import("../../components/clientes/clientes.module").then( (m) => m.ClientesModule),
  },
  {
    path:     "informacion-cliente/:id",
    component: InfoClienteComponent,
    loadChildren: () => import("../../components/clientes/clientes.module").then( (m) => m.ClientesModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutSobrisRoutingModule {
    
 }
