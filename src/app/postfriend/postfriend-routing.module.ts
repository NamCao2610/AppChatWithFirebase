import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostfriendPage } from './postfriend.page';

const routes: Routes = [
  {
    path: '',
    component: PostfriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostfriendPageRoutingModule {}
