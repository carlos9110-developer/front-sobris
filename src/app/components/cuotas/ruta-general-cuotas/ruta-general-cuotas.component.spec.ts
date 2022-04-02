import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaGeneralCuotasComponent } from './ruta-general-cuotas.component';

describe('RutaGeneralCuotasComponent', () => {
  let component: RutaGeneralCuotasComponent;
  let fixture: ComponentFixture<RutaGeneralCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaGeneralCuotasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaGeneralCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
