import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTypeComponent } from './supplier-type.component';

describe('SupplierTypeComponent', () => {
  let component: SupplierTypeComponent;
  let fixture: ComponentFixture<SupplierTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
