import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedFormsModule } from 'src/app/shared/sharedforms.module';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from '../pages/config/components/profile/profile.component';
import { UnlockComponent } from './components/unlock/unlock.component';


@NgModule({
  declarations: [
    AuthComponent,
    ProfileComponent,
    UnlockComponent
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  exports: [
    CommonModule,
    AuthComponent,
    UnlockComponent
  ]
})
export class UserModule { }
