import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './shared/services/api.service';
import { Faces } from './shared/services/face';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Authentification } from './auth/authentification.component';
import { AuthentificationService } from './auth/authentification.service';
import { HomeComponent } from './home/home.component';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRountingModule } from './app-routing.module';
import { NavbarService } from './navbar/navbar.service';

import { UsersAddComponent } from './users/users-add/users-add.component';

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
    HttpClientModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    ApiService,
    UserComponent,
    Faces,
    AuthentificationService,
    NavbarService,
    Ng2SearchPipeModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
