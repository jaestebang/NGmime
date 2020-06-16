import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/components/sidenav.component';
import { SharedFormsModule } from 'src/app/shared/sharedforms.module';
import { MimeRoutingModule } from '../mime-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    MimeRoutingModule,
    HttpClientModule,
    UserModule
  ],
  exports: [
    CommonModule,
    SidenavComponent
  ]
})
export class MenuModule { }
