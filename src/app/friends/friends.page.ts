import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { I18NHtmlParser } from '@angular/compiler';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  mainuser: AngularFirestoreDocument
  username: string ='';
  profilePic: string ='';
  usercollection: AngularFirestoreCollection
  sub
  subFriend
  allUsers= []
  searchQuery : string ='';
  allUsername = [];
  searchUser : string =''
  showFriend : boolean = false;
  mainFriend : AngularFirestoreDocument;
  receiveFriend : AngularFirestoreDocument;
  receiveUser: AngularFirestoreDocument;
  friends;
  listFriend;
  sendKB : boolean = false
  friendsName = '';
  friendsNameRequest :string ='';
  mainRequest : AngularFirestoreDocument
  listRequest= [];
  nameRequest : string= '';

  constructor(public afStore: AngularFirestore, public user: UserService, public alertController: AlertController, public db: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
    //Lay ra user chinh
    this.mainuser = this.afStore.doc(`users/${this.user.getUID()}`);
    this.sub = this.mainuser.valueChanges().subscribe( event => {
      this.username = event.username
      this.profilePic = event.profilePic
    })
    //Lay tat ca user
   this.usercollection = this.afStore.collection('users');
   this.usercollection.get().subscribe( snapshot => {
     snapshot.docs.forEach( doc => {
       this.allUsers.push(doc.data())
     })
     console.log(snapshot)
     console.log("Day la ds all user",this.allUsers)
   })
   
   //Lay tat ca friend
   this.mainFriend = this.afStore.doc(`friends/${this.user.getUID()}`)
   this.subFriend = this.mainFriend.valueChanges().subscribe( data => {
      this.listFriend = data.friends
   })
  
  //Lay tat ca request
  this.mainRequest = this.afStore.doc(`request/${this.user.getUID()}`)
  this.mainRequest.valueChanges().subscribe( data => {
     this.listRequest = data.userRequest
  })
}

//Tim kiem 
 searchFriend( searchQuery ) {
    // let arrrr = [];
    this.searchUser = searchQuery.target.value;
    if(this.searchUser.trim() == '') {
      this.allUsername = []
      return;
    }
    this.allUsername = Object.assign(this.allUsers.filter( (v) => {
      if( v.username.toLowerCase().indexOf(this.searchUser.toLowerCase()) > -1) {
        // this.listFriend.forEach( (e) => {
        //   this.friendsName.push(e.friendsName);
        //   console.log(e.friendsName)
        //   if( this.friendsName.includes(v.username)) {
        //     this.showFriend = false
        //   }
        // })
        console.log('Ket qua dung',this.allUsername)
        return this.allUsername;
        
      } else {
        console.log('Ket qua sai')
        return;
      }
    }));

    // if(this.allUsername  so sanh giong arrrr); dell cap nhat 
    // else cap nhat

 }  

 //Them ban be
 async addFriend( idUser) {
  //Them friend ben friends
   //Them friend ben users
   //update request
   this.afStore.doc(`request/${idUser}`).update({
    userRequest: firestore.FieldValue.arrayUnion( {
      id: this.user.getUID(),
      username: this.username,
      profilePic: this.profilePic
    })
   })

  
   const alert = await this.alertController.create({
    header: 'Done',
    message: 'Your added into friends are waiting',
    buttons: ['Cool!']
   })

      await alert.present()

 }

 //Gui request cho ban be xac nhan
async requestFriend(friendsName,friendsPic,idUser) {
    
    //Them friend o ben trang ca nhan cua minh
    this.mainFriend.update({
      friends: firestore.FieldValue.arrayUnion( {
      friendsid: idUser,
      friendsName: friendsName,
      friendsPic: friendsPic,
      nameRoom : `${this.user.getUID()}`+`${idUser}`,
      isVertify: true,
      sendKB: true
    })
   }) 
   //Them friend o ben trang ca nhan cua ban
   this.receiveFriend = this.afStore.doc(`friends/${idUser}`)
   this.receiveFriend.update({
     friends: firestore.FieldValue.arrayUnion( {
       friendsid: this.user.getUID(),
       friendsName: this.username,
       friendsPic: this.profilePic,
       nameRoom : `${this.user.getUID()}`+`${idUser}`,
       isVertify: true,
       sendKB: true
     })
   })
   //Them friends ben user
   this.mainuser.update( {
    friends: firestore.FieldValue.arrayUnion( {
      friendsid: idUser,
      friendsName: friendsName,
      friendsPic: friendsPic,
      nameRoom : `${this.user.getUID()}`+`${idUser}`,
      isVertify: true,
      sendKB: true
   })
  })
   //Them user ben receive
   this.receiveUser = this.afStore.doc(`users/${idUser}`)
   this.receiveUser.update({
    friends: firestore.FieldValue.arrayUnion( {
      friendsid: this.user.getUID(),
      friendsName: this.username,
      friendsPic: this.profilePic,
      nameRoom : `${idUser}`+`${this.user.getUID()}`,
      isVertify: true,
      sendKB: true
   })
   })

  //Xoa request
  this.mainRequest.update({
    userRequest: firestore.FieldValue.arrayRemove( {
      id: idUser,
      username: friendsName,
      profilePic: friendsPic
   })
  })
 
   const alert = await this.alertController.create({
    header: 'Done',
    message: 'Your was added friend sucessfully',
    buttons: ['Cool!']
   })

      await alert.present()

 }
 //Tu choi ban be 
 async deniedFriend(friendsName,friendsPic,idUser) {
   //Xoa request
  this.mainRequest.update({
    userRequest: firestore.FieldValue.arrayRemove( {
      id: idUser,
      username: friendsName,
      profilePic: friendsPic
   })
  })

  const alert = await this.alertController.create({
    header: 'Done',
    message: 'Your denied sucessfully',
    buttons: ['Cool!']
   })

      await alert.present()
 }
 
 //TIm ten phu hop vo ban be
 checkFriend( name : string ) {
   console.log('da vao function',name);
     if( !this.listFriend) {
       console.log('da vao trong listFrined')
       this.friendsName = '';
       return;
     }
     else {
       console.log("Day la firend",this.listFriend);
       this.listFriend.forEach( (e) => {
         if( name === e.friendsName) {
           this.friendsName = e.friendsName
         }
       })
     }
    return this.friendsName
}

//Check ten friend da dc request chua
checkRequest( name,idUser) {
  this.afStore.doc(`request/${idUser}`).valueChanges().subscribe( (data : any) => {
    this.nameRequest = data.receiver
  })
  if(name != this.nameRequest) {
    this.friendsNameRequest = '';
  }
  else {
     this.friendsNameRequest = this.nameRequest
  }
  return this.friendsNameRequest;
}
//Xoa ban be va chat 
 async removeFriend(friendsName,friendsPic,idUser) {
   
   const alert = await this.alertController.create({
    header: 'Done',
    message: 'Do you want remove friend',
    buttons: [
      {
        text : 'Remove',
        handler: () => {
          //Xoa friend o ben trang ca nhan cua minh
             console.log("da xoa")
             this.mainFriend.update({
              friends: firestore.FieldValue.arrayRemove( {
              friendsid: idUser,
              friendsName: friendsName,
              friendsPic: friendsPic,
              nameRoom : `${this.user.getUID()}`+`${idUser}`,
              isVertify: true,
              sendKB: true
            })
            }) 
          //Xoa friend o ben trang ca nhan cua ban
            this.receiveFriend = this.afStore.doc(`friends/${idUser}`)
             this.receiveFriend.update({
              friends: firestore.FieldValue.arrayRemove( {
                friendsid: this.user.getUID(),
                friendsName: this.username,
                friendsPic: this.profilePic,
                nameRoom : `${this.user.getUID()}`+`${idUser}`,
                isVertify: true,
                sendKB: true
              })
            })
            //Xoa friends ben user
            this.mainuser.update( {
              friends: firestore.FieldValue.arrayRemove( {
                friendsid: idUser,
                friendsName: friendsName,
                friendsPic: friendsPic,
                nameRoom : `${this.user.getUID()}`+`${idUser}`,
                isVertify: true,
                sendKB: true
              })
            })
            //Xoa user ben receive
            this.receiveUser = this.afStore.doc(`users/${idUser}`)
             this.receiveUser.update({
              friends: firestore.FieldValue.arrayRemove( {
                friendsid: this.user.getUID(),
                friendsName: this.username,
                friendsPic: this.profilePic,
                nameRoom : `${this.user.getUID()}`+`${idUser}`,
                isVertify: true,
                sendKB: true
              })
            })
            //Xoa chat list 
             this.db.list('/chat/'+`${this.user.getUID()}`+`${idUser}`).remove()
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler : () => {
          console.log("da huy")
        }
      }
    ]
   })

      await alert.present()
 
 }
 //Link den trang ca nhan cua ban be
 routerInforFriend( id : string) {
   this.router.navigate(['/tabs/tabfriend/' + id]);
 }

}
