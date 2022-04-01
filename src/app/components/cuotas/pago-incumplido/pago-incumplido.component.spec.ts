import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoIncumplidoComponent } from './pago-incumplido.component';

describe('PagoIncumplidoComponent', () => {
  let component: PagoIncumplidoComponent;
  let fixture: ComponentFixture<PagoIncumplidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoIncumplidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoIncumplidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
