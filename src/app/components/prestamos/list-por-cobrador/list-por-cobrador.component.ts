import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaPrestamos } from 'src/app/interfaces/prestamo';
import { AlertsService } from 'src/app/services/alerts.service';
import { TokenService } from 'src/app/services/token.service';
import { PrestamosService } from '../../../services/prestamos.service';

@Component({
  selector: 'app-list-por-cobrador',
  templateUrl: './list-por-cobrador.component.html',
  styleUrls: ['./list-por-cobrador.component.css']
})
export class ListPorCobradorComponent implements OnInit {

  filter = new FormControl('');
  prestamosTotal:ListaPrestamos[] = [];
  prestamosFilter:ListaPrestamos[] = [];
  prestamosFinal:ListaPrestamos[] = [];

  collectionSize:number = 0;
  collectionTotal:number = 0;
  page:number = 1;
  pageSize:number = 5;

  cargando = false;

  constructor(
    private prestamosService:PrestamosService,
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
    this.obtenerPrestamos();
  }


  obtenerPrestamos()
  {
    this.cargando = true;
    this.prestamosService.obtenerPrestamosPorCobrador(this.tokenService.returnId()).subscribe(
      result => {
        if(result.code === 200){
          this.prestamosTotal = result.data;
          this.prestamosFilter = result.data;
          this.collectionSize =   this.prestamosFilter.length;
          this.collectionTotal =   this.prestamosTotal.length;
          this.refreshPrestamos();
        }
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

  refreshPrestamos() {
    this.prestamosFinal = this.prestamosFilter
      .map((prestamo, i) => ({position: i + 1, ...prestamo}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  buscar(){

    const term:string = this.filter.value.toLowerCase();

    if(term.length > 1){
      this.prestamosFilter = this.prestamosTotal.filter( prestamo => {
          return prestamo.cliente.toLocaleLowerCase().includes(term)
            ||  prestamo.celular.toLocaleLowerCase().includes(term)
            ||  prestamo.direccion.toLocaleLowerCase().includes(term)
            ||  prestamo.valor.toString().includes(term)
            ||  prestamo.abonado.toString().includes(term)
            ||  prestamo.debe.toString().includes(term)
            ||  prestamo.cuotas.toString().includes(term)
            ||  prestamo.cuotas_canceladas.toString().includes(term)
      })
    }else{
      this.prestamosFilter = this.prestamosTotal;
    }

    this.collectionSize = this.prestamosFilter.length;
    this.refreshPrestamos();

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

  verCuotas(id_prestamo:number){
    this.router.navigate(['/cuotas-prestamo', id_prestamo]);
  }

  verInfoCliente(id_cliente:number){
    this.router.navigate(['/informacion-cliente', id_cliente]);
  }

}
