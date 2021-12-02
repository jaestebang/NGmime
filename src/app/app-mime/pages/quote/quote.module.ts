import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteComponent } from './quote.component';
import { ManagementComponent } from './management/management.component';
import { CuestionsComponent } from './cuestions/cuestions.component';



@NgModule({
  declarations: [QuoteComponent, ManagementComponent, CuestionsComponent],
  imports: [
    CommonModule
  ]
})
export class QuoteModule { }
