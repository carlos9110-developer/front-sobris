import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CuotasService } from 'src/app/services/cuotas.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAbonoCuota, IPagoCuota } from '../../../interfaces/cuotas';
import { AlertsService } from 'src/app/services/alerts.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-info-cuota',
  templateUrl: './pago-cuota.component.html',
  styleUrls: ['./pago-cuota.component.css']
})
export class PagoCuotaComponent implements OnInit {

  pagoCuotaForm:FormGroup;
  abonoDescripcion:any = "";

  idCuota!: number;
  tipoPago:string = "total";
  fechaMinima:string = "";

  valorTotal!:number;

  public validando:boolean = false;

  constructor(
    private fb:FormBuilder,
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
    this.pagoCuotaForm = this.createForm();
    this.asignarIdCuota();
  }

  ngOnInit(): void {
    this.setearFechaMinima();
  }

  
  regresar(){
    this._location.back();
  }


  getValorTotalHijo(e:number)
  { 
    this.valorTotal = e;
  }

  validacionValorAbono()
  {
    let abono:number  = parseInt( this.abono?.value + "000");
    return (abono >= this.valorTotal) ? false : true;
  }

  validacionValorAbonoSubmit()
  {
    if(this.tipoPago !== 'abono') {
      return true;
    }else{
      let abono:number  = parseInt( this.abono?.value + "000");
      return (abono >= this.valorTotal) ? false : true;
    }
  }

 

  private asignarIdCuota()
  {
    this.route.params.subscribe(params => {
      //debugger
      this.idCuota = params['id'];
    });
  }

  submit(){

    if (this.pagoCuotaForm.valid) {
      this.validando = true;
      if(this.tipoPago === 'abono') {
        this.abonoCuota();
      } else {
        this.pagoCuota();
      }
    }
    else {
      this.alertsService.errorMsg("Error","Error, debe diligenciar el formulario correctamente");
    }

   
  }

  private abonoCuota()
  {
    let datos:IAbonoCuota = {
      id: this.idCuota,
      abono:parseInt( this.abono?.value + "000"),
      fecha:this.nueva_fecha?.value
    }

    this.cuotasService.abonoCuota(datos).subscribe(
      result => {
        console.log(result);
        if (result.code === 200) {
          this.alertsService.successMsg("Abono Registrado",result.data);
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

  private pagoCuota()
  {
    let datos:IPagoCuota = {
      id_cuota:     this.idCuota,
      id_cobrador:  this.tokenService.returnId()
    }

    this.cuotasService.pagoCuota(datos).subscribe(
      result => {
        console.log(result);
        if (result.code === 200) {
          this.alertsService.successMsg("Pago Registrado",result.data);
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

  createForm()
  {
    return this.fb.group({
      tipo_pago: new FormControl('total'),
      abono: new FormControl(''),
      nueva_fecha: new FormControl(''),
    })
  }

  changeAbono(){
    if(this.abono?.valid){
      this.abonoDescripcion =   this.abono?.value + "000";
      this.abonoDescripcion =   this.formatPesos(this.abonoDescripcion);
    }else{
      this.abonoDescripcion =   "";
    }
  }

  formatPesos(num:number) : string
  {
    const formater = new Intl.NumberFormat('es-CO', {
       style: 'currency',
       currency: 'COP',
       minimumFractionDigits: 0
     })
    return formater.format(num);
  }


  changeTipoPago()
  {
    this.tipoPago = this.tipo_pago?.value;

    if(this.tipoPago === 'abono') {
      this.asignarValidators();
    } else {
      this.quitarValidators();
    }
  }

  private asignarValidators(){
    this.abono?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
    this.abono?.updateValueAndValidity();
    this.nueva_fecha?.setValidators([Validators.required]);
    this.nueva_fecha?.updateValueAndValidity();
  }

  private quitarValidators()
  {
    this.abono?.clearValidators();
    this.abono?.updateValueAndValidity();
    this.nueva_fecha?.clearValidators();
    this.nueva_fecha?.updateValueAndValidity();
  }

  setearFechaMinima()
  {
    let fecha = new Date();
    fecha.setDate(fecha.getDate() + 1);
    let anio:string  = fecha.getFullYear().toString();
    let mes:string   = ( fecha.getMonth() + 1 <= 9 ) ? "0" + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString();
    let dia:string   = ( fecha.getDate() <= 9 )      ? "0" + (fecha.getDate()).toString()      : (fecha.getDate()).toString();
    this.fechaMinima = anio + "-" + mes + "-" + dia;
  }

  

  /*
  
  */

  get tipo_pago() { return this.pagoCuotaForm.get('tipo_pago'); }
  get abono() { return this.pagoCuotaForm.get('abono'); }
  get nueva_fecha() { return this.pagoCuotaForm.get('nueva_fecha'); }

}

