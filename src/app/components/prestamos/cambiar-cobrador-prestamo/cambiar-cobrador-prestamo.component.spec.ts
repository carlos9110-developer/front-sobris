import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarCobradorPrestamoComponent } from './cambiar-cobrador-prestamo.component';

describe('CambiarCobradorPrestamoComponent', () => {
  let component: CambiarCobradorPrestamoComponent;
  let fixture: ComponentFixture<CambiarCobradorPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarCobradorPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarCobradorPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
