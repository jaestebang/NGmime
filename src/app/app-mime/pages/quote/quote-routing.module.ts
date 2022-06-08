import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { BaseComponent } from './components/base/base.component';
import { ManagementComponent } from './components/management/management.component';

const routes: Routes = [
  {
    path: 'emit',
    component: BaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'emit/:id',
    component: BaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }