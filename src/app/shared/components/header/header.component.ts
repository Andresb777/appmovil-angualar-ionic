import { Component, inject, Input, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Utils } from 'src/app/services/utils';
import { ReactiveFormsModule } from '@angular/forms';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule,CommonModule],
})


export class HeaderComponent  implements OnInit {


@Input() title!:string;
@Input() showMenu!:boolean;
@Input() backButton!:string;
@Input() isModal!:boolean;

utils=inject(Utils);
  constructor() { }

  ngOnInit() {}

  dismissModal(){
    this.utils.dismissModals();
  }

}
