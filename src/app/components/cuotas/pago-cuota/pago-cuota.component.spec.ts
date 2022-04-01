import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCuotaComponent } from './pago-cuota.component';

describe('InfoComponent', () => {
  let component: PagoCuotaComponent;
  let fixture: ComponentFixture<PagoCuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoCuotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
