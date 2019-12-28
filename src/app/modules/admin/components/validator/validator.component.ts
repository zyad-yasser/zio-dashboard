import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Validation } from 'src/app/models/validation';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.sass']
})
export class ValidatorComponent implements DoCheck {
  public validationTouched = false;
  @Input() validation: Validation;

  constructor() { }

  public passwordCheck() {
    this.validationTouched = Object.keys(this.validation).length > 0;
  }

  ngDoCheck(): void {
    this.passwordCheck();
  }
}
