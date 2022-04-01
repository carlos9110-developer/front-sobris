import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPorCobradorComponent } from './list-por-cobrador.component';

describe('ListPorCobradorComponent', () => {
  let component: ListPorCobradorComponent;
  let fixture: ComponentFixture<ListPorCobradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPorCobradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPorCobradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
