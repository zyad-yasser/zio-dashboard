import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDashbaordComponent } from './dashboard.component';

describe('LayoutDashbaordComponent', () => {
  let component: LayoutDashbaordComponent;
  let fixture: ComponentFixture<LayoutDashbaordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutDashbaordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
