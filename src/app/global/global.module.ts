import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Constants } from './constants';

@NgModule({
  declarations: [
    Constants,
    Crypto
  ],
  imports: [
    CommonModule
  ]
})
export class GlobalModule { }
