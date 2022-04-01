import { NgModule } from '@angular/core'; // se importa el modulo de ng
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AuthRoutingModule { }
