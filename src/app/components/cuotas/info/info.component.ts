import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IInfoCuota } from '../../../interfaces/cuotas';
import { CuotasService } from 'src/app/services/cuotas.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-info-cuota-component',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Input() id!: number;

  @Output() enviarValorTotal = new EventEmitter<number>();

  cuota!: IInfoCuota;

  constructor(
    private cuotasService:CuotasService,
    private alertsService:AlertsService,
  ) { 
    
  }

  ngOnInit(): void {
    console.log("este es el id del hijo", this.id);
    this.infoCuota();

  }


  eventoValorTotal(){
    this.enviarValorTotal.emit(this.cuota.valor_total);
  }





  private infoCuota()
  {
    this.cuotasService.info(this.id).subscribe(
      result => {
        if(result.code === 200){
          this.cuota = result.data;
          this.eventoValorTotal();
        }
      }, error => {
        console.log(error);
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
      }
    );
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

}
