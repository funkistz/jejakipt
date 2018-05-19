import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, JsonpModule } from '@angular/http';

//plugin
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { IonPullupModule } from 'ionic-pullup';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthProvider } from '../providers/auth/auth';
import { GlobalProvider } from '../providers/global/global';
import { ConnectionProvider } from '../providers/connection/connection';
import { DataSource } from '../providers/data-source/data-source';
import { Institute } from '../providers/api/institute';
import { Program } from '../providers/api/program';
import { Faculty } from '../providers/api/faculty';
import { News } from '../providers/api/news';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalFilterPage } from '../pages/modal-filter/modal-filter';
import { InfoPage } from '../pages/info/info';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { NewsPage } from '../pages/news/news';
import { StateProvider } from '../providers/state/state';
import { LatLang } from '../pipes/latlang';
import { MarkerIcon } from '../pipes/markericon';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAUXnAuREx78bZaIDtOCNOkhwf0ddFXh4Y",
  authDomain: "jejakipt-60b1b.firebaseapp.com",
  databaseURL: "https://jejakipt-60b1b.firebaseio.com",
  projectId: "jejakipt-60b1b",
  storageBucket: "jejakipt-60b1b.appspot.com",
  messagingSenderId: "413400825899"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    TabsPage,
    ModalFilterPage,
    InfoPage,
    LoginPage,
    RegisterPage,
    NewsPage,
    LatLang,
    MarkerIcon
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiet6yD_-R97AteFhX_j5s9V_VBL_Qdg0'
    }),
    AgmJsMarkerClustererModule,
    IonPullupModule,
    FilterPipeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    TabsPage,
    ModalFilterPage,
    InfoPage,
    LoginPage,
    RegisterPage,
    NewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeStorage,
    AuthProvider,
    HttpModule,
    JsonpModule,
    DataSource,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    StateProvider,
    Institute,
    Program,
    Faculty,
    News,
    ConnectionProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
