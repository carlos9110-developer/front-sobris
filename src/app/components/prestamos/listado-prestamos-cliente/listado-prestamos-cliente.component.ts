import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaPrestamos } from 'src/app/interfaces/prestamo';
import { AlertsService } from 'src/app/services/alerts.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { TokenService } from 'src/app/services/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listado-prestamos-cliente',
  templateUrl: './listado-prestamos-cliente.component.html',
  styleUrls: ['./listado-prestamos-cliente.component.css']
})
export class ListadoPrestamosClienteComponent implements OnInit {

  filter = new FormControl('');
  prestamosTotal:ListaPrestamos[] = [];
  prestamosFilter:ListaPrestamos[] = [];
  prestamosFinal:ListaPrestamos[] = [];

  collectionSize:number = 0;
  collectionTotal:number = 0;
  page:number = 1;
  pageSize:number = 5;

  cargando = false;

  idCliente!:number;

  constructor(
    private prestamosService:PrestamosService,
    private tokenService:TokenService,
    private router:Router,
    private alertsService:AlertsService,
    private _location: Location,
    private activatedRoute:ActivatedRoute
  ) { 
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.asignarIdCliente();
  }

  ngOnInit(): void {

  }

  private asignarIdCliente()
  {
    this.activatedRoute.params.subscribe(params => {
      //debugger
      this.idCliente = params['id'];
      this.obtenerPrestamos();
    });
  }


  obtenerPrestamos()
  {
    this.cargando = true;
    this.prestamosService.obtenerPrestamosCliente(this.idCliente).subscribe(
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

  regresar(){
    this._location.back();
  }

}
