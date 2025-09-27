import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile,sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import{doc, setDoc} from '@angular/fire/firestore';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Utils } from './utils';
import {getDownloadURL, getStorage, ref, uploadString} from 'firebase/storage'
import { Products } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class Firebase {

  auth=inject(AngularFireAuth)
  firestore=inject(AngularFirestore)
  utils=inject(Utils);
  dataRef:AngularFirestoreCollection<Products>

  getAuth(){
    return getAuth();
  }

  signIn(user:User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password)
  }

  signUp(user:User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);
  }

  updateUser(displayName:any){
    return updateProfile(getAuth().currentUser,{displayName})
  }

  setDocument(path:any,data:any){
   return this.firestore.doc(path).set(data);
  }


  saveUser(user: User) {
    this.utils.setLocalStorage('user', user);
  }

  getUser(): User | null {
    return this.utils.getLocalStorage<User>('user');
  }


  clearUser() {
    this.utils.removeLocalStorage('user');
  }

  async signOut(){
   await getAuth().signOut();             
  this.utils.routerlink('/auth');
  }


addDocument(path:any,data:any){
  return addDoc(collection(getFirestore(),path),data)
}

async updateImg(path:any,data_url:any){
  return uploadString(ref(getStorage(),path),data_url,'data_url').then(()=>{
    return getDownloadURL(ref(getStorage(),path))
  })
}

getCollectionData(path:any):AngularFirestoreCollection<Products>{
  this.dataRef=this.firestore.collection(path,ref=>ref.orderBy('nameProduct','asc'));
  return this.dataRef;
}





  
}


