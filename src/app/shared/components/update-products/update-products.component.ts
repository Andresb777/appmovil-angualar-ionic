import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/services/utils';
import { Firebase } from 'src/app/services/firebase';
import { LogoComponent } from "../logo/logo.component";
import { LoginInputComponent } from "../login-input/login-input.component";
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, LogoComponent, LoginInputComponent, ReactiveFormsModule]
})
export class UpdateProductsComponent implements OnInit, OnDestroy {

  fireBase = inject(Firebase);
  utils = inject(Utils);
  user: User = null;
  private userSubscription: Subscription;

  form = new FormGroup({
    id: new FormControl(''),
    nameProduct: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    amount: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
    this.getCurrentUser();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getCurrentUser() {
  
    this.user = this.fireBase.getUser();
    
   
    if (!this.user) {
      const auth = this.fireBase.getAuth();
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        this.user = {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName
        } as User;
      }
    }
  }

  async submit() {
    await this.createProduct();
  }

  async createProduct() {
   
    if (!this.user || !this.user.uid) {
      this.utils.presentToast({
        message: 'Usuario no autenticado. Por favor inicie sesión.',
        duration: 3500,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
      return;
    }

  
    if (this.form.invalid) {
      this.utils.presentToast({
        message: 'Por favor complete todos los campos correctamente',
        duration: 3500,
        color: 'warning',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
      return;
    }

    const loading = await this.utils.loading();
    await loading.present();

    try {
      let path = `users/${this.user.uid}/productos`;
      let dataUrl = this.form.value.img;
      
    
      let imgUrl = dataUrl;
      if (dataUrl && dataUrl.startsWith('data:')) {
        let imgPath = `${this.user.uid}/${Date.now()}`;
        imgUrl = await this.fireBase.updateImg(imgPath, dataUrl);
        this.form.controls.img.setValue(imgUrl);
      }

      const formData = { ...this.form.value };
      delete formData.id;


      await this.fireBase.addDocument(path, formData);
      
      this.utils.dismissModals({ success: true });
      this.utils.presentToast({
        message: 'Producto creado exitosamente',
        duration: 3500,
        color: 'success',
        position: 'bottom',
        icon: 'checkmark-circle-outline'
      });

    } catch (error: any) {
      console.error('Error creating product:', error);
      this.utils.presentToast({
        message: error.message || 'Error al crear el producto',
        duration: 3500,
        color: 'danger',
        position: 'bottom',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }

  async takeImage() {
    try {
      const dataUrl = (await this.utils.takePicture('Imagen del Producto')).dataUrl;
      this.form.controls.img.setValue(dataUrl);
    } catch (error) {
      console.error('Error taking image:', error);
    }
  }
}