import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCobradorComponent } from './registro-cobrador.component';

describe('RegistroCobradorComponent', () => {
  let component: RegistroCobradorComponent;
  let fixture: ComponentFixture<RegistroCobradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCobradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
