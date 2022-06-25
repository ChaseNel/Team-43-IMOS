import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaftyChecklistItemsComponent } from './add-safty-checklist-items.component';

describe('AddSaftyChecklistItemsComponent', () => {
  let component: AddSaftyChecklistItemsComponent;
  let fixture: ComponentFixture<AddSaftyChecklistItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSaftyChecklistItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSaftyChecklistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
