import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { CuotasService } from 'src/app/services/cuotas.service';
import { TokenService } from 'src/app/services/token.service';
import {  IListadoCuotas, IObtenerRutaCobradorPorFecha } from '../../../interfaces/cuotas';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  filterFecha = new FormControl('');

  filter = new FormControl('');
  cuotasTotal:IListadoCuotas[] = [];
  cuotasFilter:IListadoCuotas[] = [];
  cuotasFinal:IListadoCuotas[] = [];

  collectionSize:number = 0;
  collectionTotal:number = 0;
  page:number = 1;
  pageSize:number = 5;

  cargando = false;


  constructor(
    private cuotasService:CuotasService,
    private tokenService:TokenService,
    private router:Router,
    private alertsService:AlertsService
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
  }

  ngOnInit(): void {
    this.setearFechaInicio();
  }


  setearFechaInicio()
  {
    let fecha = new Date();
    let anio:string  = fecha.getFullYear().toString();
    let mes:string   = ( fecha.getMonth() + 1 <= 9 ) ? "0" + (fecha.getMonth() + 1).toString() : (fecha.getMonth() + 1).toString();
    let dia:string   = ( fecha.getDate() <= 9 )      ? "0" + (fecha.getDate()).toString()      : (fecha.getDate()).toString();
    let nuevaFecha = anio + "-" + mes + "-" + dia;
    this.filterFecha.setValue(nuevaFecha);
    this.obtenerRutaCobradorPorFecha();
  }

  private obtenerRutaCobradorPorFecha()
  {
    this.cargando = true;
    this.cuotasService.obtenerRutaCobradorPorFecha(this.getObjetoRutaCobradorPorFecha()).subscribe(
      result => {
        console.log(result.data);
        this.cuotasTotal = result.data;
        this.cuotasFilter = result.data;
        this.collectionSize =   this.cuotasFilter.length;
        this.collectionTotal =   this.cuotasTotal.length;
        this.refreshCuotas();
        this.cargando = false;
      } , error =>  {
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
        this.cargando = false;
      }
    )
    

    
  }

  private getObjetoRutaCobradorPorFecha()
  {
    let datos: IObtenerRutaCobradorPorFecha = {
      fecha : this.filterFecha.value,
      cobrador: this.tokenService.returnId()
    }
    return datos;
  }

  refreshCuotas() {
    this.cuotasFinal = this.cuotasFilter
      .map((cuota, i) => ({position: i + 1, ...cuota}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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

  buscar(){

    const term:string = this.filter.value.toLowerCase();

    if(term.length > 1){
      this.cuotasFilter = this.cuotasTotal.filter( cuota => {
          let fecha:string = this.getFecha(cuota.fecha, cuota.fecha_nueva);
          return cuota.nombre.toLocaleLowerCase().includes(term)
            ||  cuota.valor_cuota.toString().includes(term)
            ||  cuota.valor_abonado.toString().includes(term)
            ||  fecha.includes(term)
            ||  cuota.estado.toLocaleLowerCase().includes(term)
      })
    }else{
      this.cuotasFilter = this.cuotasTotal;
    }

    this.collectionSize = this.cuotasFilter.length;
    this.refreshCuotas();

  }

  getFecha(fecha:string, fechaNueva:string)
  {
    return  (  fechaNueva === null  ) ? fecha : fechaNueva;
  }

  buscarPorFecha()
  {
    this.obtenerRutaCobradorPorFecha();
  }

  realizarPago(id:number)
  {
    this.router.navigate(['/pago-cuota', id]);
  }

  pagoIncumplido(id:number)
  {
    this.router.navigate(['/pago-incumplido', id]);
  }

  verInformacionCliente(id:number)
  {
    this.router.navigate(['/informacion-cliente', id]);
  }


}
