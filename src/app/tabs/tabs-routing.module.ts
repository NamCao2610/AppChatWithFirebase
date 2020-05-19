import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'feed', loadChildren: '../feed/feed.module#FeedPageModule'},
      { path: 'uploader', loadChildren: '../uploader/uploader.module#UploaderPageModule'},
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule'},
      { path: 'post/:id', loadChildren: '../post/post.module#PostPageModule'},
      { path: 'edit', loadChildren: '../edit/edit.module#EditPageModule'},
      { path: 'friends', loadChildren: '../friends/friends.module#FriendsPageModule'},
      { path: 'pagechat', loadChildren: '../pagechat/pagechat.module#PagechatPageModule'},
      { path: 'pagechat/:id', loadChildren: '../chat/chat.module#ChatPageModule'},
      { path: 'tabfriend:/id', loadChildren: '../tabfriend/tabfriend.module#TabfriendPageModule'},
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
