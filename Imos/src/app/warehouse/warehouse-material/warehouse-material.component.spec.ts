import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseMaterialComponent } from './warehouse-material.component';

describe('WarehouseMaterialComponent', () => {
  let component: WarehouseMaterialComponent;
  let fixture: ComponentFixture<WarehouseMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
