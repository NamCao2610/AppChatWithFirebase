import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import  firebaseConfig  from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ShareModule } from './share.module';
import { AngularFireFunctionsModule , FunctionsRegionToken} from '@angular/fire/functions';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule,
    ShareModule,
    AngularFireFunctionsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    AuthService,
    { provide: FunctionsRegionToken, useValue: 'us-central1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
