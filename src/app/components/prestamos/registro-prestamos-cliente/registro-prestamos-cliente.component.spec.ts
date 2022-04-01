import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPrestamosClienteComponent } from './registro-prestamos-cliente.component';

describe('RegistroPrestamosClienteComponent', () => {
  let component: RegistroPrestamosClienteComponent;
  let fixture: ComponentFixture<RegistroPrestamosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPrestamosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPrestamosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
