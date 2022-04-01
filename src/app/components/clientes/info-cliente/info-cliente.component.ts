import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { Location } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { AlertsService } from '../../../services/alerts.service';


@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.css']
})
export class InfoClienteComponent implements OnInit {

  clientesForm: FormGroup;
  idCliente!: number;

  validando = false;

  constructor(
    private _location: Location,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private clientesService:ClientesService,
    private tokenService:TokenService,
    private alertsService:AlertsService
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.clientesForm = this.createForm();
    this.asignarIdCliente();
  }

  ngOnInit(): void {
   
  }

  createForm(){
    return this.formBuilder.group({
      nombre_fiador: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      cedula_fiador: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^\d+$/) ]),
      celular_fiador: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^\d+$/) ]),
      direccion_fiador: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      nombre: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      cedula: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^\d+$/) ]),
      celular: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^\d+$/) ]),
      direccion: new FormControl('', [Validators.required,Validators.minLength(4) ])
    })

  }

  private asignarIdCliente()
  {
    this.route.params.subscribe(params => {
      //debugger
      this.idCliente = params['id'];
      this.obtenerInformacionCliente();
      this.disableCamposInfoCliente();
    });
  }



  obtenerInformacionCliente()
  {
    this.clientesService.obtenerInfoCliente(this.idCliente).subscribe(
      result => {
        console.log("información cliente",result.data);
        this.setearDatosCliente(result.data);
      } , error =>  {
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
      }
    )
  }



  private setearDatosCliente(datos:Cliente){
    this.nombre_fiador?.setValue(datos.nombre_fiador);
    this.cedula_fiador?.setValue(datos.cedula_fiador);
    this.celular_fiador?.setValue(datos.celular_fiador);
    this.direccion_fiador?.setValue(datos.direccion_fiador);
    this.nombre?.setValue(datos.nombre);
    this.cedula?.setValue(datos.cedula);
    this.celular?.setValue(datos.celular);
    this.direccion?.setValue(datos.direccion);
  }

  private disableCamposInfoCliente()
  {
    this.nombre_fiador?.disable();
    this.cedula_fiador?.disable();
    this.celular_fiador?.disable();
    this.direccion_fiador?.disable();
    this.nombre?.disable();
    this.cedula?.disable();
    this.celular?.disable();
    this.direccion?.disable();
  }

  get cedula_fiador() { return this.clientesForm.get('cedula_fiador'); }
  get nombre_fiador() { return this.clientesForm.get('nombre_fiador'); }
  get celular_fiador() { return this.clientesForm.get('celular_fiador'); }
  get direccion_fiador() { return this.clientesForm.get('direccion_fiador'); }
  get nombre() { return this.clientesForm.get('nombre'); }
  get cedula() { return this.clientesForm.get('cedula'); }
  get celular() { return this.clientesForm.get('celular'); }
  get direccion() { return this.clientesForm.get('direccion'); }


  regresar()
  {
    this._location.back();
  }

}
