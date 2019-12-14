import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { VersionComponent } from './components/version/version.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorComponent } from './components/validator/validator.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    ConfirmationComponent,
    ChangePasswordComponent,
    VersionComponent,
    ValidatorComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    MaterialModule,
  ],
  exports: [
    VersionComponent,
    MaterialModule,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  entryComponents: [
    ChangePasswordComponent,
    ConfirmationComponent,
  ]
})
export class SharedModule { }
