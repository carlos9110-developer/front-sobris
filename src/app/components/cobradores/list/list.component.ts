import { Component, OnInit } from '@angular/core';
import { CobradoresService } from '../../../services/cobradores.service';
import { Cobradores } from '../../../interfaces/cobradores';
import { FormControl } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  filter = new FormControl('');
  cobradoresTotal:Cobradores[] = [];
  cobradoresFilter:Cobradores[] = [];
  cobradoresFinal:Cobradores[] = [];
  
  collectionSize:number = 0;
  collectionTotal:number = 0;
  page:number = 1;
  pageSize:number = 5;

  cargando = false;


  constructor(
    private cobradoresService:CobradoresService,
    private tokenService:TokenService,
    private router:Router,
    private alertsService:AlertsService,
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    
   }

   

  ngOnInit(): void {
    this.cargando = true;
    this.cobradoresService.get().subscribe(
      result => {
        this.cobradoresTotal = result.data;
        this.cobradoresFilter = result.data;
        this.collectionSize =   this.cobradoresFilter.length;
        this.collectionTotal =   this.cobradoresTotal.length;
        this.refreshCobradores();
        this.cargando = false;
      }, error => {
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
        this.cargando = false;
      }
    );
  }


  buscar(){

    const term:string = this.filter.value.toLowerCase();

    if(term.length > 1){
      this.cobradoresFilter = this.cobradoresTotal.filter( cobrador => {
          return cobrador.nombre.toLocaleLowerCase().includes(term)
            ||  cobrador.cedula.toLocaleLowerCase().includes(term)
            ||  cobrador.celular.toLocaleLowerCase().includes(term)
            ||  cobrador.estado.toLocaleLowerCase().includes(term)
      })
    }else{
      this.cobradoresFilter = this.cobradoresTotal;
    }

    this.collectionSize = this.cobradoresFilter.length;
    this.refreshCobradores();

  }


  refreshCobradores() {
    this.cobradoresFinal = this.cobradoresFilter
      .map((cobrador, i) => ({position: i + 1, ...cobrador}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  registrarCartera(){
    this.router.navigate(['/registro-cartera']);
  }

  verInformacionCobrador(id:number){
    this.router.navigate(['/informacion-cobrador', id]);
  }

  verPrestamosCartera(id:number){
    this.router.navigate(['/prestamos-cartera', id]);
  }

}
