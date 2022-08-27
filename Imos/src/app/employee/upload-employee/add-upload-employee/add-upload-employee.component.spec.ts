import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUploadEmployeeComponent } from './add-upload-employee.component';

describe('AddUploadEmployeeComponent', () => {
  let component: AddUploadEmployeeComponent;
  let fixture: ComponentFixture<AddUploadEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUploadEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUploadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
