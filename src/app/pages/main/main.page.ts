import { Component, inject, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from "src/app/shared/shared-module";
import { Firebase } from 'src/app/services/firebase';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SharedModule],
})
export class MainPage implements OnInit {

router=inject(Router);
currentPath:string='';
  fireBase = inject(Firebase);

pages=[
  {title:'Inicio',url:'/main/home',icon:'home-outline'},
  {title:'Perfil',url:'/main/profile',icon:'person-outline'}
]



  constructor() { }

  ngOnInit() {
    this.router.events.subscribe((event:any)=>{
      if(event?.url)this.currentPath=event.url;
    })
    console.log(this.pages)
  }

  LogOut(){
    this.fireBase.signOut();
  }

}
