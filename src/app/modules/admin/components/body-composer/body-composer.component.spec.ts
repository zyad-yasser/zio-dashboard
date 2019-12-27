import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComposerComponent } from './body-composer.component';

describe('BodyComposerComponent', () => {
  let component: BodyComposerComponent;
  let fixture: ComponentFixture<BodyComposerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
