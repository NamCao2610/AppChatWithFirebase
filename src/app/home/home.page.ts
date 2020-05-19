import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ChatPage} from '../chat/chat.page'
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 username: string ='';
  constructor(public navCtrl:NavController, public alertController: AlertController, public router: Router) {}

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: message,
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  
  LoginUser(){
     if(/^[a-zA-Z0-9]+$/.test(this.username)){
       this.router.navigateByUrl('/chat');
       localStorage.setItem('username', this.username);
     }
     else{
       this.presentAlert('Error','Invalid Username');
     }
  }
}

