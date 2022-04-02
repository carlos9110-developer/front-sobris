import { AlertsService } from 'src/app/services/alerts.service';
import { LoginService } from 'src/app/services/login.service';
import { datosSesion } from '../../../interfaces/users';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public validando:boolean = false;

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private alertsService:AlertsService,
    private router:Router,
    private tokenService:TokenService,
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    
  }

  createForm(){
      return this.loginForm = this.fb.group({
        user: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^\d+$/)]),
        password: new FormControl('',[Validators.required, Validators.minLength(5)] )
      })

  }


  login(){
    if (this.loginForm.valid) {
      this.validando = true;
      this.processLogin();
    }
    else {
      this.alertsService.errorMsg("Error","Error, debe diligenciar el formulario correctamente");
    }
  }

  processLogin()
  {
    this.loginService.login(this.loginForm.value).subscribe(
      result => {
        if (result.code == 200) {
          this.tokenService.guardanSesionLocalStorage(result.data);
          this.router.navigate([""]);
        } else {
          this.alertsService.errorMsg("Error",result.data);
        }
        this.validando = false;
      }, error => {
        if( error.error.code === 403 ){
          this.alertsService.errorMsg("Error",error.error.data);
        }else{
          this.alertsService.errorMsg("Error",this.alertsService.errorRequestHttp);
        }
        this.validando = false;
      }
    );
  }


  private setSessionData(data:datosSesion)
  {
    localStorage.setItem('user',JSON.stringify(data));
  }

}
