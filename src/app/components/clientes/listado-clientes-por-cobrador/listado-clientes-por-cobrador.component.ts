import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ClientesService } from '../../../services/clientes.service';
import { ListadoClientes } from '../../../interfaces/cliente';

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


  constructor(
    private clientesService:ClientesService,
    private tokenService:TokenService,
    private router:Router 
  ) {
    
  }

  ngOnInit(): void {
    this.obtenerClientesPorCobrador();
  }

  private obtenerClientesPorCobrador()
  {
    this.clientesService.obtenerClientesPorCobrador(this.tokenService.returnId()).subscribe(
      result => {
        console.log(result.data);
        this.clientesTotal   = result.data;
        this.clientesFilter  = result.data;
        this.collectionSize  = this.clientesFilter.length;
        this.collectionTotal = this.clientesTotal.length;
        this.refreshClientes();
      } , error =>  {
        console.log("error rutas",error);
        
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



}
