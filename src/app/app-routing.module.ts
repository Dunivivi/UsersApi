import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth-guard';
import { Authentification } from './auth/authentification.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'AppComponent', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/add', component: UsersAddComponent, canActivate: [AuthGuard] },
  { path: 'users/:name/:id', component: UserComponent },
  { path: 'auth', component: Authentification },

  // { path: 'users/:id/:name', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRountingModule {}
