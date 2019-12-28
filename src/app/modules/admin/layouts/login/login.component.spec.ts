import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutLoginComponent } from './login.component';

describe('LayoutDashbaordComponent', () => {
  let component: LayoutLoginComponent;
  let fixture: ComponentFixture<LayoutLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
