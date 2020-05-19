import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username : string = '';
  password : string = '';
  cpassword : string = '';
  mainFriend: AngularFirestoreDocument;
  mainRequest : AngularFirestoreDocument;
  mainPosts: AngularFirestoreDocument;

  constructor(
      public afauth: AngularFireAuth,
      public alert: AlertController ,
      public router: Router,
      public afStore: AngularFirestore,

      public user : UserService
      ) { }

  ngOnInit() {
  }

  //Thong bao
  async showAlert( header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })

    await alert.present();
  }


  //Dang ki thanh vien moi
  async Register() {
    const { username, password, cpassword} = this;
    if( password !== cpassword){
      this.showAlert("Error!","Nhap lai mat khau khong dung");
      return console.error("Password don't match");
    }

    try {
       const res = await this.afauth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password);
       console.log(res);
      //Set collection user/userId
       this.afStore.doc(`users/${res.user.uid}`).set({
         username,
         id: res.user.uid,
         profilePic: 'f8914b0e-dbdb-4782-bdbf-de6ed1d7eac5'
       })

       //set collection friends
       this.mainFriend = this.afStore.doc(`friends/${res.user.uid}`)

       this.mainFriend.set({
       author: username,
     })

      //set collection request 
      this.mainRequest = this.afStore.doc(`request/${res.user.uid}`)
      this.mainRequest.set({
        receiver: username
      })
      //set collection posts
     
     //Set user minh dang dung
       this.user.setUser({
         username,
         uid: res.user.uid
       })

       this.showAlert("Success!","Chao mung ban den trang ca nhan cua minh");
       this.router.navigate(['/tabs']);

    } catch(err) {
      
       console.dir( err );
       this.showAlert("Error!",err.message);
    }
  }

}
