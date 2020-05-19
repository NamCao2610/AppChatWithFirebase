import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostfriendPageRoutingModule } from './postfriend-routing.module';

import { PostfriendPage } from './postfriend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostfriendPageRoutingModule
  ],
  declarations: [PostfriendPage]
})
export class PostfriendPageModule {}
