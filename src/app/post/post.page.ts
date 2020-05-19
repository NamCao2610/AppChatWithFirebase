import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { UserService } from '../user.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  postID: string
  post
  postReferences: AngularFirestoreDocument
  heartType: string = 'heart-outline'
  sub
  effect: string = ''
  constructor(private route: ActivatedRoute, private afStore: AngularFirestore, private user: UserService) {
     
  }

  ngOnInit() {
    this.postID = this.route.snapshot.paramMap.get('id')
    console.log("DAy la id",this.postID)
    this.postReferences = this.afStore.doc(`posts/${this.postID}`)
    this.sub = this.postReferences.valueChanges().subscribe( value => {
     this.post = value,
     this.effect = value.effect
     this.heartType = value.likes.includes(this.user.getUID()) ? 'heart' : 'heart-outline'
   })
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
	}

  Heart() {
    if( this.heartType == 'heart-outline') {
      this.postReferences.update({
        likes: firestore.FieldValue.arrayUnion(this.user.getUID()) 
      })
    }
    else {
      this.postReferences.update({
        likes: firestore.FieldValue.arrayRemove(this.user.getUID())
      })
    }
  }

}
