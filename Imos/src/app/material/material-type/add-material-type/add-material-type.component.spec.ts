import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterialTypeComponent } from './add-material-type.component';

describe('AddMaterialTypeComponent', () => {
  let component: AddMaterialTypeComponent;
  let fixture: ComponentFixture<AddMaterialTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaterialTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaterialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
