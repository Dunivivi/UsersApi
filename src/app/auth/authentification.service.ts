import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { stringLength } from '@firebase/util';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IUser } from '../shared/interfaces/user';
import { User } from './user.model';

export interface AuthentificationData {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    public angularFireAuth: AngularFireAuth,
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

  private handleAuthentification(email: string) {
    const user = new User(email);
    this.user.next(user);
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
    this.router.navigate(['']);
  }
}
