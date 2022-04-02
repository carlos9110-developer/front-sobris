import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  rol!:number;

  constructor(
    private tokenService:TokenService
  ) {
    this.asignarRol();
   }

  ngOnInit(): void {
  }


  private asignarRol()
  {
    this.rol = this.tokenService.returnRol();
  }

}
