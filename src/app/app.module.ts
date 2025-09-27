import { NgModule } from '@angular/core';

import { RouteReuseStrategy, RouterLink } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import {initializeApp} from 'firebase/app';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';


export const firebaseConfig = {
  apiKey: "AIzaSyDErWgKVdzYubZK19m6KnPgnkJ9Z_4hru4",
  authDomain: "appmovilmercadopago.firebaseapp.com",
  projectId: "appmovilmercadopago",
  storageBucket: "appmovilmercadopago.firebasestorage.app",
  messagingSenderId: "470368144663",
  appId: "1:470368144663:web:c59cdbf2e4dc1463997b52"
};

initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,RouterLink,AngularFirestoreModule,AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
