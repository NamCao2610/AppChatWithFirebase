import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase , AngularFireObject} from 'angularfire2/database'
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

username: string = '';
message : string ='';
_chatSubscription;
messages: any;
nameRoom : any;
subUser: AngularFirestoreDocument;
profilePic: string ='';

  constructor(public db: AngularFireDatabase , public route: ActivatedRoute, public user: UserService, public afs: AngularFirestore) { 
    
    this.nameRoom = this.route.snapshot.paramMap.get('id');
    this.username = this.user.getUsername();
    console.log('Day la user',this.username)
     this._chatSubscription = this.db.list(`/chat/${this.nameRoom}`).valueChanges().subscribe( data =>{
      console.log( "Day la object chat",data);
      this.messages = data;
    })
    //Lay anh user
    this.afs.doc(`users/${this.user.getUID()}`).valueChanges().subscribe( (data : any) => {
       this.profilePic = data.profilePic
    })
    
  }
   
  ngOnInit() {
   
  }

  sendMessage(){
    this.db.list(`/chat/${this.nameRoom}`).push({
      username: this.username,
      message: this.message,
      profilePic: this.profilePic
    }).then( () => {

    }).catch( () => {

    });
    this.message = '';
  }


  ionViewDidLoad() {
    this.db.list(`/chat/${this.nameRoom}`).push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    });
  }

  ionViewWillLeave(){
    this._chatSubscription.unsubscribe();
    this.db.list(`/chat/${this.nameRoom}`).push({
      specialMessage: true,
      profilePic: this.profilePic,
      message: `${this.username} has left the room`
    });
  }
 
}
