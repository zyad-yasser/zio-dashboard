import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentDataComponent } from './agent-data.component';

describe('UserDataComponent', () => {
  let component: AgentDataComponent;
  let fixture: ComponentFixture<AgentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgentDataComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
