import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { MimeRoutingModule } from './mime-routing.module';
import { UserModule } from './user/user.module';

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
