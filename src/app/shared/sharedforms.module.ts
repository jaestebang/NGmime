import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { MimebaseComponent } from './components/mimebase/mimebase.component';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    ErrorComponent,
    MimebaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ErrorComponent,
    MimebaseComponent,
    NgxSpinnerModule
  ]
})
  
export class SharedFormsModule {
}
