import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaftyChecklistComponent } from './update-safty-checklist.component';

describe('UpdateSaftyChecklistComponent', () => {
  let component: UpdateSaftyChecklistComponent;
  let fixture: ComponentFixture<UpdateSaftyChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSaftyChecklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSaftyChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
