import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ListComponent as ListCobradoresComponent } from './components/cobradores/list/list.component';
import { MenuComponent } from './layouts/layout-sobris/menu/menu.component';

const routes: Routes = [
  {
    path: "login",
    loadChildren: () => import("./components/auth/auth.module").then( (m) => m.AuthModule ),
    component:LoginComponent,
  },
  {
    path: "",
    loadChildren: () => import("./layouts/layout-sobris/layout-sobris.module").then( (m) => m.LayoutSobrisModule ),
    component:MenuComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
