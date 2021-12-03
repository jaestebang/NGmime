import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuModule } from './menu/menu.module';
import { MimeRoutingModule } from './mime-routing.module';
import { UserModule } from './user/user.module';
import { QuoteModule } from './pages/quote/quote.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    MenuModule,
    QuoteModule,
    MimeRoutingModule,
  ],
  exports: [
    UserModule,
    MenuModule,
    QuoteModule,
    MimeRoutingModule
  ]
})
export class MimeModule { }
