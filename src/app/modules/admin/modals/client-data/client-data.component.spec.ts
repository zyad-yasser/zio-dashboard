import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsDataComponent } from './client-data.component';

describe('UserDataComponent', () => {
  let component: ClientsDataComponent;
  let fixture: ComponentFixture<ClientsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsDataComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
