import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerDataComponent } from './partner-data.component';

describe('UserDataComponent', () => {
  let component: PartnerDataComponent;
  let fixture: ComponentFixture<PartnerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerDataComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
