import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  router = inject(Router);
  toastCtrl=inject(ToastController);
  loadCtrl=inject(LoadingController);
  modalCtrl=inject(ModalController);
  
  routerlink(url:any){
     this.router.navigateByUrl(url)
  }

  loading(){
    return this.loadCtrl.create({spinner:'crescent'})
  }

  async presentToast(opts?:ToastOptions){
    const toast=await this.toastCtrl.create(opts);
    toast.present()
  }

  saveLocalStorage(key:string,value:any){
    return localStorage.setItem(key,JSON.stringify(value));
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  async getModal (opts:ModalOptions){
    const modal= await this.modalCtrl.create(opts);
    await modal.present();
    const {data} = await modal.onWillDismiss();
    if(data) return data;
  }

  dismissModals(data?:any){
    return this.modalCtrl.dismiss(data);
  }

  async takePicture (promptLabelHeader:string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto:'Selecciona una foto',
      promptLabelPicture:'Toma una foto'
    });
  };
}
