import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL : string ='';
  desc: string ='';
  feed: string ='';
  data: any;
  busy: boolean = false;
  scaleCrop: string = '-/scale_crop/200x200';
  username: string;
  profilePic: string;
  mainuser: AngularFirestoreDocument;
  mainpost: AngularFirestoreDocument;
  sub;
  myposts;
  likes = [];
  heartType : string = 'heart-outline'

  effects = {
		effect1: '',
    effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
		effect3: '-/filter/vevera/150/',
		effect4: '-/filter/carris/150/',
		effect5: '-/filter/misiara/150/'
  }
  activeEffect: string = this.effects.effect1
  
  @ViewChild('fileButton',{static:false}) fileButton;
  
  constructor(private http: HttpClient, public afStore: AngularFirestore, public user: UserService, public alertController: AlertController,public router: Router) { }

  ngOnInit() {
    //Lay ra cot user/id
    this.mainuser = this.afStore.doc(`users/${this.user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe( event => {
      this.username = event.username
      this.profilePic = event.profilePic
      this.myposts = event.myPost
      // this.heartType = event.myPost.likes.includes(this.user.getUID()) ? 'heart' : 'heart-outline'
    })
    //Lay ra cot post
  }

  //Upload anh len database
   async uploadImage() {

    this.busy = true
     const image = this.imageURL;
     const activeEffect = this.activeEffect;
     const desc = this.desc;
     const likes = this.likes

     this.afStore.doc(`users/${this.user.getUID()}`).update({
       posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`),
       myPost: firestore.FieldValue.arrayUnion(
         {
           image,
           activeEffect,
           desc,
           likes
         }
       )
     })

     this.afStore.doc(`posts/${image}`).set({
       desc,
       author: this.user.getUsername(),
       likes,
       effect: activeEffect,
       image: image,
       profilePic: this.profilePic
     })

     this.busy = false
     this.imageURL = '',
     this.desc = ''
     
     const alert = await this.alertController.create({
        header: 'Done',
        message: 'Your post was created!',
        buttons: ['Cool!']
     })

     await alert.present()

     this.router.navigate(['/tabs/feed'])
     
  }

  //UploadFile voi viewChild
  uploadFile(){
     this.fileButton.nativeElement.click()
  }
 //Lua chon hieu ung anh
  setSelected(effect: string) {
    this.activeEffect = this.effects[effect]
    console.log(this.activeEffect);
  }

  //Chon hinh anh lay duong link
   fileChanged(event) {
    this.busy = true;
    
    const files = event.target.files
    
    this.data = new FormData()
    
    this.data.append('file',files[0]);
    this.data.append('UPLOADCARE_STORE', '1');
    this.data.append('UPLOADCARE_PUB_KEY', '91b8c870b3213b3cf337');
    
		this.http.post('https://upload.uploadcare.com/base/',this.data)
		.subscribe((event: any)  => {
			console.log(event)
      this.imageURL = event.file
      this.busy = false;
    })
    
  }

  //Upload ko file 
  async UpFeed() {
     this.busy = true
     const feed = this.feed
     const likes = this.likes
     
     if( feed == ''){
      const alert = await this.alertController.create({
        header: 'Done',
        message: 'Hay dang 1 cam xuc gi ay',
        buttons: ['Cool!']
     })
  
       await alert.present()
       this.busy = false;
     }
     else{
       //Them post ben user
     this.afStore.doc(`users/${this.user.getUID()}`).update({
       myPost: firestore.FieldValue.arrayUnion({
         feed: feed,
         likes,
       })
     })
     
     //Them post ben posts
     this.afStore.doc(`posts/${feed}`).set({
        feed: feed,
        likes,
        author: this.user.getUsername(),
        profilePic: this.profilePic
       })
     

     this.busy = false;
     this.feed ='';

     const alert = await this.alertController.create({
      header: 'Done',
      message: 'Your post was created!',
      buttons: ['Cool!']
   })

     await alert.present()

   this.router.navigate(['/tabs/feed'])
  }
  }
  //trai tim 
  Heart(likes= []) {

   this.heartType = likes.includes(this.user.getUsername()) ? 'heart' : 'heart-outline';
   if( this.heartType == 'heart-outline') {
      likes.push(this.user.getUsername())
   }
   else {
     likes.splice(likes.indexOf(this.user.getUsername), 1)
   }
  }


}
