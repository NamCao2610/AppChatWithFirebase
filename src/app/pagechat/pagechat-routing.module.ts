import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagechatPage } from './pagechat.page';

const routes: Routes = [
  {
    path: '',
    component: PagechatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagechatPageRoutingModule {}
