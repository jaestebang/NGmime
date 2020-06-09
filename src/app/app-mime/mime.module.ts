import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { MimeRoutingModule } from './mime-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    MenuModule,
    MimeRoutingModule,
  ],
  exports: [
    UserModule,
    MenuModule,
    MimeRoutingModule
  ]
})
export class MimeModule { }
