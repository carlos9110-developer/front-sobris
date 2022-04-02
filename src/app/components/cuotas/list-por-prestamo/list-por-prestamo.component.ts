import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  IObtenerCuotasPrestamoPorFecha } from 'src/app/interfaces/cuotas';
import { CuotasService } from 'src/app/services/cuotas.service';
import { TokenService } from 'src/app/services/token.service';
import { Location } from '@angular/common';
import { AlertsService } from 'src/app/services/alerts.service';
import { IListadoCuotas } from '../../../interfaces/cuotas';

@Component({
  selector: 'app-list-por-prestamo',
  templateUrl: './list-por-prestamo.component.html',
  styleUrls: ['./list-por-prestamo.component.css']
})
export class ListPorPrestamoComponent implements OnInit {

  filterFecha = new FormControl('');

  filter = new FormControl('');
  cuotasTotal:IListadoCuotas[] = [];
  cuotasFilter:IListadoCuotas[] = [];
  cuotasFinal:IListadoCuotas[] = [];

  collectionSize:number = 0;
  collectionTotal:number = 0;
  page:number = 1;
  pageSize:number = 5;

  numCuotasTotal:number = 0;

  idPrestamo!:number;

  cargando = false;


  constructor(
    private cuotasService:CuotasService,
    private tokenService:TokenService,
    private router:Router,
    private route:ActivatedRoute,
    private _location: Location,
    private alertsService:AlertsService
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
    this.route.params.subscribe(params => {
      //debugger
      this.idPrestamo = params['id'];
      this.obtenerCuotasPorPrestamo();
    });
  }

  private obtenerCuotasPorPrestamo()
  {
    this.cargando = true;
    this.cuotasService.obtenerCuotasPorPrestamo(this.idPrestamo).subscribe(
      result => {
        console.log("resultado",result.data);
        this.cuotasTotal = result.data;
        this.cuotasFilter = result.data;
        this.collectionSize =   this.cuotasFilter.length;
        this.collectionTotal =   this.cuotasTotal.length;
        this.numCuotasTotal = this.cuotasTotal.length;
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

  private obtenerCuotasPorPrestamoYFecha()
  {
    this.cargando = true;
    this.cuotasService.obtenerCuotasPrestamoPorFecha(this.getObjetoObtenerCuotasPrestamoPorFecha()).subscribe(
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

  private getObjetoObtenerCuotasPrestamoPorFecha()
  {
    let datos: IObtenerCuotasPrestamoPorFecha = {
      fecha : this.filterFecha.value,
      id_prestamo: this.idPrestamo
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
    if(this.filterFecha.value !== ""){
      this.obtenerCuotasPorPrestamoYFecha();
    }else{
      this.obtenerCuotasPorPrestamo();
    }
  }

  realizarPago(id:number)
  {
    this.router.navigate(['/pago-cuota', id]);
  }

  pagoIncumplido(id:number)
  {
    this.router.navigate(['/pago-incumplido', id]);
  }

  regresar(){
    this._location.back();
  }

  quitarFiltroFecha(){
    this.filterFecha.setValue('');
  }

  verInformacionCliente(id:number)
  {
    this.router.navigate(['/informacion-cliente', id]);
  }

}
