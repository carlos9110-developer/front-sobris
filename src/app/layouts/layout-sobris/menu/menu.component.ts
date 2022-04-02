import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  rol!:number;

  constructor(
    private tokenService:TokenService,
    private alertsService:AlertsService,
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.asignarRol();
   }

  ngOnInit(): void {
  }


  private asignarRol()
  {
    this.rol = this.tokenService.returnRol();
  }

}
