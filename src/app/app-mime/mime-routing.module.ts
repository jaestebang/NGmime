import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from '../guards/auth.guard';
import { SidenavComponent } from './menu/components/sidenav/sidenav.component';
import { ProfileComponent } from './pages/config/components/profile/profile.component';
import { AuthComponent } from './user/components/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mime',
    pathMatch: 'full'
  },
  {
    path: 'mime',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        outlet: 'snavoutlet'
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })
  ],
  exports: [RouterModule]
})
export class MimeRoutingModule { }