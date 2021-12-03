import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedFormsModule } from './../../../shared/sharedforms.module';
import { BaseComponent } from './components/base/base.component';
import { ManagementComponent } from './components/management/management.component';
import { QuestionsComponent } from './components/questions/questions.component';



@NgModule({
  declarations: [QuestionsComponent, BaseComponent, ManagementComponent],
  imports: [
    CommonModule,
    SharedFormsModule,
  ],
  exports: []
})
export class QuoteModule { }
