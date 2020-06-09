import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedFormsModule } from 'src/app/shared/sharedforms.module';
import { AuthComponent } from './auth/components/auth.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AuthComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  exports: [
    CommonModule,
    AuthComponent
  ]
})
export class UserModule { }
