import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccessfulComponent } from './unsuccessful.component';

describe('UnsuccessfulComponent', () => {
  let component: UnsuccessfulComponent;
  let fixture: ComponentFixture<UnsuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
