import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutSobrisRoutingModule } from './layout-sobris-routing.module';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    LayoutSobrisRoutingModule
  ]
})
export class LayoutSobrisModule { }
