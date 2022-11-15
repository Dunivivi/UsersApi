import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { IUser } from '../shared/interfaces/user';
import { User } from './user.model';

export interface AuthentificationData {
  email: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  user = new BehaviorSubject<User>(null);
  dockerUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    public angularFireAuth: AngularFireAuth,
    public angluarFirestore: AngularFirestore,
    private router: Router
  ) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthentificationData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7SSc1eA0iR8c71aEh27aY74CP_L_UQKA',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentification(res.email);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthentificationData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7SSc1eA0iR8c71aEh27aY74CP_L_UQKA',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentification(res.email);
        })
      );
  }

  loginDocker(username: string, password: string) {
    return this.http
      .post<AuthentificationData>(this.dockerUrl + '/auth/login', {
        username,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentification(res.token);
        })
      );
  }

  // .subscribe((response) => {
  //   console.log(response);
  // });

  // getUsers(header) {
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${header}` });
  //   return this.http
  //     .get(this.dockerUrl + '/api/users', { headers })
  //     .subscribe((response) => {
  //       console.log(response);
  //     });
  // }

  autoLogin() {
    const userData: {
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.token);
    this.user.next(loadedUser);
  }

  private handleAuthentification(token: string) {
    const user = new User(token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    // console.log(user);
    // console.log(this.user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An error occured';

    if (!errorResponse.error || !errorResponse.error.error) {
      throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password user is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['']);
  }
}
