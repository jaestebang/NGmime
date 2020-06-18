import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadComponent } from './components/load/load.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    LoadComponent
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
    LoadComponent
  ]
})
export class SharedFormsModule {
}
