import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ClientesService } from '../../../services/clientes.service';
import { ListadoClientes } from '../../../interfaces/cliente';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-listado-clientes-por-cobrador',
  templateUrl: './listado-clientes-por-cobrador.component.html',
  styleUrls: ['./listado-clientes-por-cobrador.component.css']
})
export class ListadoClientesPorCobradorComponent implements OnInit {



  filter = new FormControl('');
  clientesTotal:ListadoClientes[] = [];
  clientesFilter:ListadoClientes[] = [];
  clientesFinal:ListadoClientes[] = [];

  collectionSize:number = 0;
  collectionTotal:number = 0;
  page:number = 1;
  pageSize:number = 5;

  cargando = false;


  constructor(
    private clientesService:ClientesService,
    private tokenService:TokenService,
    private alertsService:AlertsService,
    private router:Router 
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
  }

  ngOnInit(): void {
    this.obtenerClientesPorCobrador();
  }

  private obtenerClientesPorCobrador()
  {
    this.cargando = true;
    this.clientesService.obtenerClientesPorCobrador(this.tokenService.returnId()).subscribe(
      result => {
        console.log(result.data);
        this.clientesTotal   = result.data;
        this.clientesFilter  = result.data;
        this.collectionSize  = this.clientesFilter.length;
        this.collectionTotal = this.clientesTotal.length;
        this.refreshClientes();
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



  refreshClientes() {
    this.clientesFinal = this.clientesFilter
      .map((cliente, i) => ({position: i + 1, ...cliente}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  buscar(){

    const term:string = this.filter.value.toLowerCase();

    if(term.length > 1){
      this.clientesFilter = this.clientesTotal.filter( cliente => {
          return cliente.nombre.toLocaleLowerCase().includes(term)
            ||  cliente.cedula.toLocaleLowerCase().includes(term)
            ||  cliente.celular.toLocaleLowerCase().includes(term)
            ||  cliente.direccion.toLocaleLowerCase().includes(term)
            ||  cliente.nombre_fiador.toLocaleLowerCase().includes(term)
            ||  cliente.cedula_fiador.toLocaleLowerCase().includes(term)
            ||  cliente.celular_fiador.toLocaleLowerCase().includes(term)
            ||  cliente.direccion_fiador.toLocaleLowerCase().includes(term)
      })
    }else{
      this.clientesFilter = this.clientesTotal;
    }

    this.collectionSize = this.clientesFilter.length;
    this.refreshClientes();

  }




  registrarPrestamo(id:number)
  {
    this.router.navigate(['/registro-prestamo-cliente', id]);
  }

  editarInformacionCliente(id:number)
  {
    this.router.navigate(['/editar-informacion-cliente', id]);
  }
  
  verInformacionCliente(id:number)
  {
    this.router.navigate(['/informacion-cliente', id]);
  }

  verPrestamosCliente(id:number){
    this.router.navigate(['/prestamos-cliente', id]);
  }



}
