import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/firestore';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  subPost: AngularFirestoreCollection
  allPosts = []
  busy : boolean = false;
  constructor(private aff: AngularFireFunctions, private afs: AngularFirestore) { }

  ngOnInit() {
    
    this.subPost = this.afs.collection('posts')
    this.subPost.get().subscribe( snapshot => {
      snapshot.docs.forEach( doc => {
        this.allPosts.push(doc.data())
      })
      console.log("Day la danh sach allposts", this.allPosts)
    })
    
  }

}
