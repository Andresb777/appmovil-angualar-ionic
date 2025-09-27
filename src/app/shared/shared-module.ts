import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { UpdateProductsComponent } from './components/update-products/update-products.component';




@NgModule({
  declarations:[
   
  ],

  exports:[
    UpdateProductsComponent,
    LogoComponent,
    HeaderComponent,
    LoginInputComponent
  ],

  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateProductsComponent,
    LogoComponent,HeaderComponent,LoginInputComponent
   
  ]
})
export class SharedModule { }
