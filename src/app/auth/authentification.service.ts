import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthentificationData {
  email: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  user = new BehaviorSubject<User>(null);
  dockerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

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

  autoLogout() {
    setTimeout(() => {
      this.user.next(null);
      localStorage.removeItem('userData');
      this.router.navigate(['']);
    }, 5 * 60 * 1000);
  }

  private handleAuthentification(token: string) {
    const user = new User(token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
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
