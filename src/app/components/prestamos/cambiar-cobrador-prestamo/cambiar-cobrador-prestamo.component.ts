import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CobradoresService } from 'src/app/services/cobradores.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { TokenService } from 'src/app/services/token.service';
import { ICobradoresSelect } from '../../../interfaces/cobradores';
import { NgSelectOption } from '@angular/forms';
import { ICambiarCobradorPrestamo } from '../../../interfaces/prestamo';
import { PrestamosService } from '../../../services/prestamos.service';

@Component({
  selector: 'app-cambiar-cobrador-prestamo',
  templateUrl: './cambiar-cobrador-prestamo.component.html',
  styleUrls: ['./cambiar-cobrador-prestamo.component.css']
})
export class CambiarCobradorPrestamoComponent implements OnInit {

  idPrestamo!: number;

  cobradorSeleccionado!:number;

  listCobradores:ICobradoresSelect[] = [];

  validando = false;

  constructor(
    private _location: Location,
    private activatedRoute:ActivatedRoute,
    private cobradoresService:CobradoresService,
    private alertsService:AlertsService,
    private tokenService:TokenService,
    private prestamosService:PrestamosService
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
   }

  ngOnInit(): void {
    this.asignarIdPrestamo();
  }

  private asignarIdPrestamo()
  {
    this.activatedRoute.params.subscribe(params => {
      this.idPrestamo = params['id'];
      this.obtenerCobradores();
    });
  }

  private obtenerCobradores(){
    this.cobradoresService.retornarCobradoresParaSelect(this.idPrestamo).subscribe(
      result => {
       console.log("obtener cobradores",result)
       this.listCobradores = result.data;
      }, error => {
        
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
      }
    );
  }

  submit(){
      if (this.cobradorSeleccionado != null && this.cobradorSeleccionado != undefined) {
        this.validando = true;
        this.processSubmit();
      }
      else {
        this.alertsService.errorMsg("Error","Error, debe seleccionar el nuevo cobrador");
      }
    
  }

  private processSubmit(){
    let datos:ICambiarCobradorPrestamo = {
      id_cobrador : this.cobradorSeleccionado,
      id_prestamo: this.idPrestamo
    }

    this.prestamosService.cambiarCobradorPrestamo(datos).subscribe(
      result => {
        if (result.code == 200) {
          this.regresar();
          this.alertsService.successMsg("Cobrador Cambiado",result.data);
        } else {
          this.alertsService.errorMsg("Error",result.data);
        }
        this.validando = false;
      }, error => {
        console.log(error);
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


  regresar()
  {
    this._location.back();
  }

 

}
