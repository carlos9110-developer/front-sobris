import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  // en las declaraciones van los componentes que pertenecen al modulo
  declarations: [
    LoginComponent
  ],

  
  // cosas que quiero que sean visibles afuera de este modulo
  exports:[],

  // aca van los modulos que importamos
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  bootstrap: [LoginComponent]

})
export class AuthModule { }
