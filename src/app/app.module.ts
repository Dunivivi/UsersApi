import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { ApiService } from './services/api.service';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Faces } from './services/face';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'AppComponent', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/:name', component: UserComponent },

  // { path: 'users/:id/:name', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ApiComponent,
    UserComponent,
    UsersComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [ApiService, UserComponent, Faces],
  bootstrap: [AppComponent],
})
export class AppModule {}
