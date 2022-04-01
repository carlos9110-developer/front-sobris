import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { CuotasService } from 'src/app/services/cuotas.service';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-pago-incumplido',
  templateUrl: './pago-incumplido.component.html',
  styleUrls: ['./pago-incumplido.component.css']
})
export class PagoIncumplidoComponent implements OnInit {
  idCuota!: number;
  validando = false;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private cuotasService:CuotasService,
    private alertsService:AlertsService,
    private _location: Location,
    private tokenService:TokenService
  ) { 
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.asignarIdCuota();
  }

  ngOnInit(): void {
    
  }

  private asignarIdCuota()
  {
    this.route.params.subscribe(params => {
      //debugger
      this.idCuota = params['id'];
      console.log('id padres', this.idCuota) 
    });
  }


  regresar()
  {
    this._location.back();
  }

  incumplido(){
    this.validando = true;
    this.cuotasService.incumplido(this.idCuota).subscribe(
      result => {
        console.log(result);
        if (result.code === 200) {
          this.alertsService.successMsg("Pago Incumplido",result.data);
          this.regresar();
        } else {
          this.alertsService.errorMsg("Error",result.data);
        }
        this.validando = false;
      }, error => {
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
        this.validando = false;
      }
    );
  }

}
