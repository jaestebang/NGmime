import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [
  {
        path: '',
        component: BaseComponent,
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