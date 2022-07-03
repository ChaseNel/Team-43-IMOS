import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaftyChecklistItemsComponent } from './safty-checklist-items.component';

describe('SaftyChecklistItemsComponent', () => {
  let component: SaftyChecklistItemsComponent;
  let fixture: ComponentFixture<SaftyChecklistItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaftyChecklistItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaftyChecklistItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
