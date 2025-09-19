import { Component, inject, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared-module";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firebase } from 'src/app/services/firebase';
import { Utils } from 'src/app/services/utils';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  imports: [IonicModule, SharedModule, CommonModule, ReactiveFormsModule],
})
export class SignUpPage implements OnInit {

  fireBase = inject(Firebase);

  utils = inject(Utils);

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

  async submit() {
  if (this.form.valid) {
    const loading = await this.utils.loading();
    await loading.present();

    this.fireBase.signUp(this.form.value as User)
      .then(async resp => {
        await this.fireBase.updateUser(this.form.value.name);

        let uid = resp.user.uid;
        this.form.controls.uid.setValue(uid);

       
        this.fireBase.saveUser(this.form.value as User);

        this.setUserInfo(uid);

      }).catch(error => {
        console.log(error);
        this.utils.presentToast({
          message: error.message,
          duration: 3500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
  }
}


async setUserInfo(uid: string) {
  if (this.form.valid) {
    const loading = await this.utils.loading();
    await loading.present();
    try {
      let path = `users/${uid}`;
      const userData = { ...this.form.value };
      delete userData.password;
      await this.fireBase.setDocument(path, userData);
      this.utils.routerlink('main/home');
      this.form.reset();
    } catch (error: any) {
      console.log(error);
      this.utils.presentToast({
        message: error.message,
        duration: 3500,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }
}




}
