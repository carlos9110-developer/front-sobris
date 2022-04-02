import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrestamosClienteComponent } from './listado-prestamos-cliente.component';

describe('ListadoPrestamosClienteComponent', () => {
  let component: ListadoPrestamosClienteComponent;
  let fixture: ComponentFixture<ListadoPrestamosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPrestamosClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPrestamosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
