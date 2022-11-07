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
        tap((res) => {
          this.handleAuthentification(res.email);
        })
      );
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        console.log('logged in');
      })
      .catch((error) => {
        console.log('Error ocurred', error.message);
      });
  }

  private handleAuthentification(email: string) {
    const user = new User(email);
    this.user.next(user);
    console.log(user);
    console.log(this.user);
  }
  check() {
    console.log(this.user);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['']);
  }
}
