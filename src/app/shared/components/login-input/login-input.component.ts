import { Component, Input, OnInit } from '@angular/core';
import { IonItem } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss'],
  imports: [IonicModule,ReactiveFormsModule],
})
export class LoginInputComponent  implements OnInit {

  @Input()control!:FormControl;
  @Input()type!:string;
  @Input()label!:string;
  @Input()autocomplete!:string;
  @Input()icon!:string;
  
  isPassword!:boolean;
  hide:boolean=true;

  constructor() { }

  ngOnInit() {
    if(this.type=='password') this.isPassword=true

  }

  mostrarOcultarPass(){
    this.hide=!this.hide;
    if(this.hide) this.type='password';
    else this.type='text'
  }

}
