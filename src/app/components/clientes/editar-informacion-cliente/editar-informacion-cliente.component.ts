import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { AlertsService } from 'src/app/services/alerts.service';
import { EditarInformacionCliente } from '../../../interfaces/cliente';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-editar-informacion-cliente',
  templateUrl: './editar-informacion-cliente.component.html',
  styleUrls: ['./editar-informacion-cliente.component.css']
})
export class EditarInformacionClienteComponent implements OnInit {

  clientesForm: FormGroup;
  idCliente!: number;

  validando = false;

  constructor(
    private _location: Location,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private clientesService:ClientesService,
    private alertsService:AlertsService,
    private tokenService:TokenService
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.asignarIdCliente();
    this.clientesForm = this.createForm();
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
    });
  }

  submit(){
    if (this.clientesForm.valid) {
      this.validando = true;
      this.processSubmit();
    }
    else {
      this.alertsService.errorMsg("Error","Error, debe diligenciar el formulario correctamente");
    }
  }

  private processSubmit(){
    let datos:EditarInformacionCliente = {
      ...this.clientesForm.value,
      id:this.idCliente
    }

    this.clientesService.editarInfoCliente(datos).subscribe(
      result => {
        if (result.code == 200) {
          this.regresar();
          this.alertsService.successMsg("Información Editada",result.data);
          this.clientesForm.reset();
        } else {
          this.alertsService.errorMsg("Error",result.data);
        }
        this.validando = false;
      }, error => {
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
        this.validando = false;
      }
    );
  }

  obtenerInformacionCliente()
  {
    this.clientesService.obtenerInfoCliente(this.idCliente).subscribe(
      result => {
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

  get nombre_fiador() { return this.clientesForm.get('nombre_fiador'); }
  get cedula_fiador() { return this.clientesForm.get('cedula_fiador'); }
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
