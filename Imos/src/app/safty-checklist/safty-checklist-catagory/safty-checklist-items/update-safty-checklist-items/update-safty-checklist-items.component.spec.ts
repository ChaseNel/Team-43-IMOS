import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSaftyChecklistItemsComponent } from './update-safty-checklist-items.component';

describe('UpdateSaftyChecklistItemsComponent', () => {
  let component: UpdateSaftyChecklistItemsComponent;
  let fixture: ComponentFixture<UpdateSaftyChecklistItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSaftyChecklistItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSaftyChecklistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
