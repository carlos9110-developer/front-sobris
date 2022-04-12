import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrestamosCarteraComponent } from './listado-prestamos-cartera.component';

describe('ListadoPrestamosCarteraComponent', () => {
  let component: ListadoPrestamosCarteraComponent;
  let fixture: ComponentFixture<ListadoPrestamosCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPrestamosCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPrestamosCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
