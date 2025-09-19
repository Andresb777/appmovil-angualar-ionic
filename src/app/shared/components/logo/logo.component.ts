import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  imports: [IonicModule],
})
export class LogoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
