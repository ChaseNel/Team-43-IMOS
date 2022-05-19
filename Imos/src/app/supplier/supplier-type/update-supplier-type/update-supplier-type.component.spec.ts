import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierTypeComponent } from './update-supplier-type.component';

describe('UpdateSupplierTypeComponent', () => {
  let component: UpdateSupplierTypeComponent;
  let fixture: ComponentFixture<UpdateSupplierTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSupplierTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
