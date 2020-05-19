import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagechatPageRoutingModule } from './pagechat-routing.module';

import { PagechatPage } from './pagechat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagechatPageRoutingModule
  ],
  declarations: [PagechatPage]
})
export class PagechatPageModule {}
