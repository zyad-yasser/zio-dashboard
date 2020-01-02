import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaChooseComponent } from './media-choose.component';

describe('UserDataComponent', () => {
  let component: MediaChooseComponent;
  let fixture: ComponentFixture<MediaChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaChooseComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
