import { Component, OnInit } from '@angular/core';
import { CobradoresService } from '../../../services/cobradores.service';
import { Cobradores } from '../../../interfaces/cobradores';
import { FormControl } from '@angular/forms';

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


  constructor(
    private cobradoresService:CobradoresService
  ) { }

  ngOnInit(): void {

    this.cobradoresService.get().subscribe(
      result => {
        console.log(result.data);
        this.cobradoresTotal = result.data;
        this.cobradoresFilter = result.data;
        this.collectionSize =   this.cobradoresFilter.length;
        this.collectionTotal =   this.cobradoresTotal.length;
        this.refreshCobradores();
      }, error => {
        console.log("error cobradores",error);
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

}
