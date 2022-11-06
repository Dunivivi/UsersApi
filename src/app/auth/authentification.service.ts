import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface AuthentificationData {
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthentificationData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7SSc1eA0iR8c71aEh27aY74CP_L_UQKA',
      { email: email, password: password, returnSecureToken: true }
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthentificationData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7SSc1eA0iR8c71aEh27aY74CP_L_UQKA',
      { email: email, password: password, returnSecureToken: true }
    );
  }
}
