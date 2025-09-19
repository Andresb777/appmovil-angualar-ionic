import { Component, Inject, inject, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared-module";
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase } from 'src/app/services/firebase';
import { User } from 'src/app/models/user.model';
import { Utils } from 'src/app/services/utils';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  imports: [IonicModule, SharedModule,RouterModule,RouterLink,ReactiveFormsModule],
})
export class AuthPage implements OnInit {

fireBase=inject(Firebase);

utils=inject(Utils);
/* router = inject(Router); */

  form=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })


  constructor() { }

  ngOnInit() {
  }

 async submit(){
    if(this.form.valid){
      const loading =await this.utils.loading();
      await loading.present()
      this.fireBase.signIn(this.form.value as User)
      .then(resp=>{
        this.utils.routerlink('/main/home')
        this.utils.presentToast({
          message:'Bienvenido',
          duration:3500,
          color:'primary',
          position:'bottom',
          icon:'person-circle-outline'

        })
        
      }).catch(error=>{
        console.log(error);
        this.utils.presentToast({
          message:error.message,
          duration:3500,
          color:'danger',
          position:'bottom',
          icon:'alert-circle-outline'

        })
      }).finally(()=>{
        loading.dismiss();
      })
    }
   
  }

}
