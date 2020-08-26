import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadComponent } from './components/load/load.component';
import { MaterialModule } from './material.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MimebaseComponent } from './components/mimebase/mimebase.component';

@NgModule({
  declarations: [
    LoadComponent,
    NotfoundComponent,
    MimebaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    LoadComponent,
    NotfoundComponent,
    MimebaseComponent
  ]
})
export class SharedFormsModule {
}
