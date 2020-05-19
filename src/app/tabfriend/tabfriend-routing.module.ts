import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabfriendPage } from './tabfriend.page';

const routes: Routes = [
  {
    path: '',
    component: TabfriendPage,
    children: [
      { path: 'inforfriend', loadChildren: '../inforfriend/inforfriend.module#InforfriendPageModule'},
      { path: 'postfriend', loadChildren: '../postfriend/postfriend.module#PostfriendPageModule'},
      {
        path: '',
        redirectTo: '/tabs/tabfriend/inforfriend',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabfriend/inforfriend',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabfriendPageRoutingModule {}
