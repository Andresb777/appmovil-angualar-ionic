import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared-module";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  imports: [IonicModule, SharedModule,ReactiveFormsModule],
})
export class ForgotPasswordPage implements OnInit {

    form=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
    
  })

  constructor() { }

  ngOnInit() {
  }

    submit(){
    if(this.form.valid){
      console.log(this.form.value)
    }
   
  }

}
