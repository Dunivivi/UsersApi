import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ApiService } from './shared/services/api.service';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Faces } from './shared/services/face';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Authentification } from './auth/authentification.component';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { AuthentificationService } from './auth/authentification.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireStorage,
  AngularFireStorageModule,
} from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { AppRountingModule } from './app-routing.module';
import { DataStorageService } from './shared/services/datastorage.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NavbarService } from './navbar/navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    NavbarComponent,
    HomeComponent,
    Authentification,
    LoadingSpinner,
    UsersAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRountingModule,
    NgbModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    Ng2SearchPipeModule,

    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    ApiService,
    UserComponent,
    Faces,
    AuthentificationService,
    DataStorageService,
    NavbarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
