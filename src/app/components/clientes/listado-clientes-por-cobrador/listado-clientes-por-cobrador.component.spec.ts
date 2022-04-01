import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClientesPorCobradorComponent } from './listado-clientes-por-cobrador.component';

describe('ListadoClientesPorCobradorComponent', () => {
  let component: ListadoClientesPorCobradorComponent;
  let fixture: ComponentFixture<ListadoClientesPorCobradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoClientesPorCobradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoClientesPorCobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
