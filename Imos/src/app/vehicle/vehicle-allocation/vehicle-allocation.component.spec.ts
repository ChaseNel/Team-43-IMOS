import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAllocationComponent } from './vehicle-allocation.component';

describe('VehicleAllocationComponent', () => {
  let component: VehicleAllocationComponent;
  let fixture: ComponentFixture<VehicleAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
