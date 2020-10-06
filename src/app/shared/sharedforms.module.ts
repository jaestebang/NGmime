import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MimebaseComponent } from './components/mimebase/mimebase.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    NotfoundComponent,
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
    NotfoundComponent,
    MimebaseComponent,
    NgxSpinnerModule
  ]
})
  
export class SharedFormsModule {
}
