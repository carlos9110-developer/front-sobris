import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IInformacionCobrador } from 'src/app/interfaces/cobradores';
import { AlertsService } from 'src/app/services/alerts.service';
import { CobradoresService } from 'src/app/services/cobradores.service';
import { TokenService } from 'src/app/services/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-informacion-cobrador',
  templateUrl: './informacion-cobrador.component.html',
  styleUrls: ['./informacion-cobrador.component.css']
})
export class InformacionCobradorComponent implements OnInit {

  public cobradorForm: FormGroup;

  idCobrador!:number;

  cargando = false;

  constructor(
    private _location: Location,
    private formBuilder:FormBuilder,
    private alertsService:AlertsService,
    private tokenService:TokenService,
    private cobradoresService:CobradoresService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.cobradorForm = this.createForm();
    this.asignarIdCobrador();
  }

  ngOnInit(): void {
    
  }


  private asignarIdCobrador()
  {
    this.cargando = true;
    this.activatedRoute.params.subscribe(params => {
      this.idCobrador = params['id'];
      this.obtenerInformacionCobrador();
    });
  }

  obtenerInformacionCobrador()
  {
    this.cargando = true;
    this.cobradoresService.obtenerInformacionCobrador(this.idCobrador).subscribe(
      result => {
        this.setearDatosCobrador(result.data);
        this.disableCampos();
        this.cargando = false;
      }, 
      error =>  {
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

  createForm(){
    return this.formBuilder.group({
      nombre: new FormControl(''),
      cedula: new FormControl(''),
      celular: new FormControl(''),
      carteras: new FormControl(''),
      estado: new FormControl(''),
    })
    
  }

  private setearDatosCobrador(datos:IInformacionCobrador){
    this.nombre?.setValue(datos.nombre);
    this.cedula?.setValue(datos.cedula);
    this.celular?.setValue(datos.celular);
    this.carteras?.setValue(datos.carteras_activas);
    this.estado?.setValue(datos.estado);
  }

  private disableCampos()
  {
    this.nombre?.disable();
    this.cedula?.disable();
    this.celular?.disable();
    this.carteras?.disable();
    this.estado?.disable();
  }

  get nombre() { return  this.cobradorForm.get('nombre'); }
  get cedula() { return  this.cobradorForm.get('cedula'); }
  get celular() { return this.cobradorForm.get('celular'); }
  get carteras() { return  this.cobradorForm.get('carteras'); }
  get estado() { return this.cobradorForm.get('estado'); }

  regresar()
  {
    this._location.back();
  }



}
