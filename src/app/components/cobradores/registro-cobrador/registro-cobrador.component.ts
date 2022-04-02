import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { TokenService } from 'src/app/services/token.service';
import { RegistroCobrador } from '../../../interfaces/cobradores';
import { CobradoresService } from '../../../services/cobradores.service';

@Component({
  selector: 'app-registro-cobrador',
  templateUrl: './registro-cobrador.component.html',
  styleUrls: ['./registro-cobrador.component.css']
})
export class RegistroCobradorComponent implements OnInit {

  public cobradorForm: FormGroup;

  validando = false;

  constructor(
    private formBuilder:FormBuilder,
    private alertsService:AlertsService,
    private tokenService:TokenService,
    private cobradoresService:CobradoresService,
    private router:Router
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.cobradorForm = this.createForm();

  }

  ngOnInit(): void {
  }


  createForm(){
    return this.formBuilder.group({
      nombre: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      cedula: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^\d+$/) ]),
      celular: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^\d+$/) ]),
    })
  }

  submit(){
    if (this.cobradorForm.valid) {
      this.validando = true;
      this.processSubmit();
    }
    else {
      this.alertsService.errorMsg("Error","Error, debe diligenciar el formulario correctamente");
    }
  }

  private processSubmit(){

    let datos:RegistroCobrador = {
      ...this.cobradorForm.value,
      empresa_id: this.tokenService.returnEmpresa()
    }
    
    this.cobradoresService.registrar(datos).subscribe(
      result => {
        console.log(result);
        if (result.code == 201) {
          this.alertsService.successMsg("Registro Exitoso",result.data);
          this.cobradorForm.reset();
          this.router.navigate(['/carteras']);
        } else  {
          this.alertsService.errorMsg("Error",result.data);
        }
        this.validando = false;
      }, error => {
        console.log(error);
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
          this.tokenService.redirigirLogin();
        }
        else if( error.error.code === 409 ){
          this.alertsService.errorMsg("Error","Error, ya existe un cobrador con la cédula digitada");
        }
        else if( error.error.code === 410 ){
          this.alertsService.errorMsg("Error",error.error.data);
        }
        else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
        this.validando = false;
      }
    );
  }

  get nombre() { return  this.cobradorForm.get('nombre'); }
  get cedula() { return  this.cobradorForm.get('cedula'); }
  get celular() { return this.cobradorForm.get('celular'); }

}
