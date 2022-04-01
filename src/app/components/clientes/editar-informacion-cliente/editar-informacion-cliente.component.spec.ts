import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionClienteComponent } from './editar-informacion-cliente.component';

describe('EditarInformacionClienteComponent', () => {
  let component: EditarInformacionClienteComponent;
  let fixture: ComponentFixture<EditarInformacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInformacionClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
