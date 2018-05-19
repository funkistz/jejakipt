import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

import 'rxjs/add/operator/do';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;
  pages: Array<{title: string, component: any}>;
  user:any;
  private userCollection: AngularFirestoreCollection<any>;
  users: Observable<any[]>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public aDB: AngularFireDatabase,
    public authData: AuthProvider,
    private afs: AngularFirestore
  ) {

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAUXnAuREx78bZaIDtOCNOkhwf0ddFXh4Y",
        authDomain: "jejakipt-60b1b.firebaseapp.com",
        databaseURL: "https://jejakipt-60b1b.firebaseio.com",
        projectId: "jejakipt-60b1b",
        storageBucket: "jejakipt-60b1b.appspot.com",
        messagingSenderId: "413400825899"
      });
    }

    this.rootPage = TabsPage;
    const unsubscribe = firebase.auth().onAuthStateChanged( userAuth => {

      if (!userAuth) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {

        this.user = userAuth;

        this.userCollection = this.afs.collection('users', ref => ref.where('email', '==', userAuth.email).limit(1) );

        this.users = this.userCollection.snapshotChanges().map( v => {
            return v.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        this.users.subscribe(docs => {
          authData.setUserData(docs[0]);
          this.rootPage = TabsPage;
        })

        unsubscribe();
      }
    });

    this.pages = [
      { title: 'Home', component: TabsPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    firebase.auth().signOut();
    this.nav.setRoot(LoginPage);
  }
}
