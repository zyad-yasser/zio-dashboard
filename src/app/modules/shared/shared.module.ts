import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionComponent } from './components/version/version.component';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VersionComponent
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
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class SharedModule { }
