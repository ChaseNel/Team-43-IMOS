import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCheckListComponent } from './update-check-list.component';

describe('UpdateCheckListComponent', () => {
  let component: UpdateCheckListComponent;
  let fixture: ComponentFixture<UpdateCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCheckListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
