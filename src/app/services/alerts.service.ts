
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public errorRequestHttp:string = "Se presento un problema al realizar la acción por favor intentelo de nuevo";
  public errorInicioSesion:string = "Error, debe iniciar sesión";

  constructor(private router:Router) { }

  mensaje(icono:any,title:string,text:string,showConfirmButton:boolean,tiempoDesaparicion:number){
    Swal.fire({icon: icono,title: title,text: text,showConfirmButton: showConfirmButton,timer: tiempoDesaparicion});
  }

  successMsg(title:string,msg:string) :void
  {
    this.mensaje("success",title,msg,false,9000);
  }

  errorMsg(title:string,msg:string)
  {
    this.mensaje("error",title,msg,false,9000);
  }


}
