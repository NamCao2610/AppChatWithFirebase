import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 
  mainUser : AngularFirestoreDocument;
  userPosts;
  sub;
  username : string
  profilePic: string
  
  constructor( private afStrore: AngularFirestore, private user:UserService, private router: Router) {
     
    // this.userPosts = posts.valueChanges()
   }

   goTo(postID: string) {
    this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
   }

  ngOnInit() {
    this.mainUser = this.afStrore.doc(`users/${this.user.getUID()}`)
    this.sub = this.mainUser.valueChanges().subscribe( event  => {
      this.userPosts = event.posts
      this.username = event.username
      this.profilePic = event.profilePic
      console.log("Day la danh sach posts",this.userPosts);
   })
  // this.userPosts = posts.valueChanges()
  }
  RouterProfile(){
    this.router.navigate(['/tabs/edit-profile'])
  }

}
