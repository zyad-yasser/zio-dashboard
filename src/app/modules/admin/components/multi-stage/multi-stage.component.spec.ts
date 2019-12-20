import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStageComponent } from './multi-stage.component';

describe('MultiStageComponent', () => {
  let component: MultiStageComponent;
  let fixture: ComponentFixture<MultiStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
