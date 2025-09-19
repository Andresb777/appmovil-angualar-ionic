import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { SharedModule } from "src/app/shared/shared-module";
import { Products } from 'src/app/models/product';
import { Utils } from 'src/app/services/utils';
import { UpdateProductsComponent } from 'src/app/shared/components/update-products/update-products.component';
import { Firebase } from 'src/app/services/firebase';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, SharedModule],
})
export class HomePage implements OnInit {
  utils = inject(Utils);
  loading: boolean = false;
  products: Products[] = [];
  firebase = inject(Firebase);
  user: User = null;

  constructor() { }

  ngOnInit() {
    this.loadUserAndProducts();
  }

  ionViewWillEnter() {
    this.loadUserAndProducts();
  }

 
  loadUserAndProducts() {
   
    this.user = this.firebase.getUser();
    
   
    if (!this.user && this.firebase.getAuth().currentUser) {
      const firebaseUser = this.firebase.getAuth().currentUser;
      this.user = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || ''
      } as User;
      
    
      this.firebase.saveUser(this.user);
      console.log('Usuario recuperado de Firebase Auth y guardado en localStorage');
    }

    if (this.user && this.user.uid) {
      console.log(' Usuario autenticado:', this.user.uid);
      this.getProducts();
    } else {
      console.log(' No hay usuario autenticado');
      this.utils.presentToast({
        message: 'Debes iniciar sesión primero',
        duration: 3000,
        color: 'warning',
        icon: 'alert-circle-outline'
      });
    }
  }

  async addUpdateProducto(products?: Products) {
    if (!this.user?.uid) {
      this.utils.presentToast({
        message: 'Debes iniciar sesión primero',
        color: 'warning',
        duration: 3000
      });
      return;
    }

    const data = await this.utils.getModal({
      component: UpdateProductsComponent,
      cssClass: 'add-update-modal',
      componentProps: { products }
    });

    if (data?.success) {
      this.getProducts();
    }
  }

  getProducts() {
    if (!this.user?.uid) return;

    const path = `users/${this.user.uid}/productos`;
    this.loading = true;

    this.firebase.getCollectionData(path)
      .valueChanges({ idField: 'id' })
      .subscribe({
        next: (data: any[]) => {
          this.loading = false;
          this.products = data || [];
          console.log(`${this.products.length} productos cargados`);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error:', error);
        }
      });
  }
}