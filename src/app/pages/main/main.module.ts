import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    MainPageRoutingModule
  ],
 
})
export class MainPageModule {}
