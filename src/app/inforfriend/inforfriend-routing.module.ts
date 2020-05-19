import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InforfriendPage } from './inforfriend.page';

const routes: Routes = [
  {
    path: '',
    component: InforfriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InforfriendPageRoutingModule {}
