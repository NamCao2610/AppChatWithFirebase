import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabfriendPageRoutingModule } from './tabfriend-routing.module';

import { TabfriendPage } from './tabfriend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabfriendPageRoutingModule
  ],
  declarations: [TabfriendPage]
})
export class TabfriendPageModule {}
