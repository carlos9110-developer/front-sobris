import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCobradorComponent } from './informacion-cobrador.component';

describe('InformacionCobradorComponent', () => {
  let component: InformacionCobradorComponent;
  let fixture: ComponentFixture<InformacionCobradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionCobradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
