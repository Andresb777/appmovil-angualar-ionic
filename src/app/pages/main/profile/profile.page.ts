import { Component, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared-module";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonicModule, SharedModule,CommonModule],
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
