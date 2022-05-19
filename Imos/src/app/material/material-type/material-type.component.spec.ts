import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeComponent } from './material-type.component';

describe('MaterialTypeComponent', () => {
  let component: MaterialTypeComponent;
  let fixture: ComponentFixture<MaterialTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
