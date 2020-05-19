import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InforfriendPageRoutingModule } from './inforfriend-routing.module';

import { InforfriendPage } from './inforfriend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InforfriendPageRoutingModule
  ],
  declarations: [InforfriendPage]
})
export class InforfriendPageModule {}
