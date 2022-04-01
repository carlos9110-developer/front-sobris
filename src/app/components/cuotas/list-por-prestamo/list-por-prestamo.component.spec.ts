import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPorPrestamoComponent } from './list-por-prestamo.component';

describe('ListPorPrestamoComponent', () => {
  let component: ListPorPrestamoComponent;
  let fixture: ComponentFixture<ListPorPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPorPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPorPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
