import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagechat',
  templateUrl: './pagechat.page.html',
  styleUrls: ['./pagechat.page.scss'],
})
export class PagechatPage implements OnInit {

  subFriend: AngularFirestoreDocument;
  listFriends = [];
  searchUser : string ='';
  allFriends = [];
  subChat;
  listChat = [];
  lastChat: string ='';
  profilePic : string = '';
  username : string = '';

  constructor(private afs: AngularFirestore, private user: UserService, private router: Router, private db: AngularFireDatabase) { }


  ngOnInit() {
    //lay friends
    this.subFriend = this.afs.doc(`friends/${this.user.getUID()}`)
    this.subFriend.valueChanges().subscribe( data => {
      this.listFriends = data.friends
    })
    //Lay phan tu cuoi mang chat
    this.afs.doc(`users/${this.user.getUID()}`).valueChanges().subscribe( (data: any) => {
      this.profilePic = data.profilePic
    })
    this.username = this.user.getUsername();
  }

  Chat(nameRoom: string) {
    this.router.navigate(['/tabs/pagechat/'+ nameRoom])
  }

  //Tim kiem ban be
  searchFriend( searchQuery ) {
    // let arrrr = [];
    this.searchUser = searchQuery.target.value;
    if(this.searchUser.trim() == '') {
      this.allFriends = []
      return;
    }
    this.allFriends = Object.assign(this.listFriends.filter( (v) => {
      if( v.friendsName.toLowerCase().indexOf(this.searchUser.toLowerCase()) > -1) {
        console.log('Ket qua dung',this.allFriends)
        return true;
        
      } else {
        console.log('Ket qua sai')
        return;
      }
    }));
    // if(this.allUsername  so sanh giong arrrr); dell cap nhat 
    // else cap nha
 }  

 //Tim dong chat cuoi cung
  async findLastChat( nameRoom ) {
    await this.db.list(`chat/${nameRoom}`).valueChanges().subscribe( data => {
         this.listChat = data
         this.lastChat = Object.assign(this.listChat[this.listChat.length -1].message);
         console.log("Day la lastChat", this.lastChat)
    })
    return this.lastChat;
  }

}
