import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFormsModule } from 'src/app/shared/sharedforms.module';
import { MimeRoutingModule } from '../mime-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from '../user/user.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';


@NgModule({
  declarations: [
    SidenavComponent,
    MenuItemsComponent
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
