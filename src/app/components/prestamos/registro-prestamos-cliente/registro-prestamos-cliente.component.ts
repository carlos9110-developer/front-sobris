import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import {  PrestamoClienteRegistrado } from 'src/app/interfaces/prestamo';
import { AlertsService } from 'src/app/services/alerts.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { TokenService } from 'src/app/services/token.service';
import { ClientesService } from '../../../services/clientes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-prestamos-cliente',
  templateUrl: './registro-prestamos-cliente.component.html',
  styleUrls: ['./registro-prestamos-cliente.component.css']
})
export class RegistroPrestamosClienteComponent implements OnInit {

  public prestamoForm: FormGroup;

  public validando:boolean = false;
  public validacionCuotas:boolean = false;

  public numSugMenor:number = 0;
  public numSugMayor:number = 0;

  valorDescripcion:any = "";

  idCliente!: number;

  constructor(
    private fb:FormBuilder,
    private alertsService:AlertsService,
    private tokenService:TokenService,
    private prestamosService:PrestamosService,
    private clientesService:ClientesService,
    private route:ActivatedRoute,
    private _location: Location
  ) {
    if(this.tokenService.validarToken()===''){
      this.alertsService.errorMsg("Error",this.alertsService.errorInicioSesion);
      this.tokenService.redirigirLogin();
    }
    this.prestamoForm = this.createForm();
    this.prestamoForm.get('valor_cuota')?.disable();
  }

  ngOnInit(): void {
    this.asignarIdCliente();
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

  private asignarIdCliente()
  {
    this.route.params.subscribe(params => {
      //debugger
      this.idCliente = params['id'];
      this.obtenerInformacionCliente();
      this.disableCamposInfoCliente();
    });
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


  createForm(){
    return this.fb.group({
      nombre_fiador: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      cedula_fiador: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^\d+$/) ]),
      celular_fiador: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^\d+$/) ]),
      direccion_fiador: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      nombre: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      cedula: new FormControl('', [Validators.required,Validators.minLength(4),Validators.pattern(/^\d+$/) ]),
      celular: new FormControl('', [Validators.required,Validators.minLength(7),Validators.maxLength(10),Validators.pattern(/^\d+$/) ]),
      direccion: new FormControl('', [Validators.required,Validators.minLength(4) ]),
      cuotas: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      valor: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      interes: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(1), Validators.maxLength(2) ]),
      valor_cuota: new FormControl('', [Validators.required ]),
      frecuencia: new FormControl('', [Validators.required ]),
    })

  }

  changeValor(){

    if(this.valor?.valid){
      this.valorDescripcion =   this.valor?.value + "000";
      this.valorDescripcion =   this.formatPesos(this.valorDescripcion);
    }else{
      this.valorDescripcion =   "";
    }
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

  changeCuotas(){
    
    if( this.valor?.valid && this.interes?.valid  && this.cuotas?.valid ){
      this.calcularValorCuota();
    }else{
      this.valor_cuota?.setValue('');
    }
 
  }

  private calcularValorCuota()
  {
    let valor:number =  parseInt(this.prestamoForm.get('valor')?.value + "000");
    let interes:number =  this.prestamoForm.get('interes')?.value;
    let cuotas:number  = this.prestamoForm.get('cuotas')?.value;

    let totalPrestamo:number = (  (valor * interes) / 100 ) + valor;
    let valorCuotas:number   = totalPrestamo / cuotas;

    this.prestamoForm.get('valor_cuota')?.setValue(this.formatPesos(valorCuotas));

    if( (valorCuotas % 1000) === 0 ){
      this.validacionCuotas = true;
    }else{
      this.validacionCuotas = false;  
      this.sugerirValoresCuota(totalPrestamo,cuotas);
    } 
  

  }

  private sugerirValoresCuota(totalPrestamo:number,cuotas:number){
    this.numSugMenor = this.calNumCuotaMenor(totalPrestamo,cuotas);
    this.numSugMayor = this.calNumCuotaMayor(totalPrestamo,cuotas);
  }


  private calNumCuotaMenor(totalPrestamo:number,cuotas:number){
    let cuotasC = cuotas--;
    let valorCuotas = totalPrestamo / cuotasC;
    while (  (valorCuotas % 1000) !== 0  ) {
        cuotasC--;
        valorCuotas = totalPrestamo / cuotasC;
    }
    return cuotasC;
  }

  private calNumCuotaMayor(totalPrestamo:number,cuotas:number){
    let cuotasC = cuotas++;
    let valorCuotas = totalPrestamo / cuotasC;
    while (  (valorCuotas % 1000) !== 0  ) {
        cuotasC++;
        valorCuotas = totalPrestamo / cuotasC;
    }
    return cuotasC;
  }

  setCuotaSugerida(cuotas:number){
    this.cuotas?.setValue(cuotas);
    this.calcularValorCuota();
  }

  get valor() { return this.prestamoForm.get('valor'); }
  get interes() { return this.prestamoForm.get('interes'); }
  get cuotas() { return this.prestamoForm.get('cuotas'); }
  get nombre_fiador() { return this.prestamoForm.get('nombre_fiador'); }
  get cedula_fiador() { return this.prestamoForm.get('cedula_fiador'); }
  get celular_fiador() { return this.prestamoForm.get('celular_fiador'); }
  get direccion_fiador() { return this.prestamoForm.get('direccion_fiador'); }
  get nombre() { return this.prestamoForm.get('nombre'); }
  get cedula() { return this.prestamoForm.get('cedula'); }
  get celular() { return this.prestamoForm.get('celular'); }
  get direccion() { return this.prestamoForm.get('direccion'); }
  get valor_cuota() { return this.prestamoForm.get('valor_cuota'); }
  get frecuencia() { return this.prestamoForm.get('frecuencia'); }

  submit(){
    if (this.prestamoForm.valid) {
      this.validando = true;
      this.processSubmit();
    }
    else {
      this.alertsService.errorMsg("Error","Error, debe diligenciar el formulario correctamente");
    }

  }


  private objPrestamo():PrestamoClienteRegistrado{
    let prestamo:PrestamoClienteRegistrado = {
      id_cobrador:  this.tokenService.returnId(),
      cuotas: this.cuotas?.value,
      interes:this.interes?.value,
      frecuencia:this.frecuencia?.value,
      prestamo:parseInt( this.valor?.value + "000"),
      id_cliente: this.idCliente
    } 
    return prestamo;
  }

  private processSubmit(){

    
    let datos = this.objPrestamo();

    this.prestamosService.registroPrestamoCliente(datos).subscribe(
      result => {
        if (result.code == 201) {
          this.alertsService.successMsg("Prestamo Registrado",result.data);
          this.prestamoForm.reset();
          this.regresar();
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

  regresar()
  {
    this._location.back();
  }

}
